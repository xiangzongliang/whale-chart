import { arr_zoom } from '../algorithms/arr_zoom'
import { adjacent } from '../algorithms/adjacent'
import { isMouse } from './event'

const RD_spot = ({ zrender, SL, _DIFF, ROW_CONFIG, get_color,index }) => { 
    SL.removeAll()
    let dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_,
        all_points = _DIFF.all_points || [],
        point = ROW_CONFIG.pointer.point,  //点配置
        point_item = point.item || [],      //点数量 、 样式
        point_hover = point.hover || [],      //鼠标经过的转折点
        point_hover_item = point_hover.item || [],

        //⚠️高频调用函数
        render_spot = ({ RP, item_arr, col_index, animate }) =>{
            //异常数据不渲染点
            if(RP[2] === false){
                for(let iem in item_arr){
                    let canvas_point = new zrender.Circle({
                        shape : Object.assign({},{
                            cx : RP[0],
                            cy : RP[1],
                        },{
                            r : animate ? 0 :dpr(item_arr[iem].shape.r)
                        }),
                        style : Object.assign({},{
                            fill    :  get_color(col_index) || '#000',
                            stroke  : get_color(col_index) || '#000',
                            lineWidth : dpr(item_arr[iem].style ? item_arr[iem].style.lineWidth : 0)
                        },item_arr[iem].style),
                        zlevel:800,
                        z:100
                    })

                    if(animate){
                        //执行一个逐渐放大的动画
                        canvas_point.animate('shape', false)
                        .when(100,{
                            r: dpr(item_arr[iem].shape.r || 0)
                        })
                        .start()
                    }

                    SL.add(canvas_point)
                }
            }
        }


        if( point.show === true ){
            for(let pi in all_points){
                if(all_points[pi].type == 'line'){
                    let points = all_points[pi].points || []
                    for(let oi in points){
                        if(oi != index){
                            render_spot({
                                RP : points[oi],  //当前点的坐标等信息
                                index : parseInt(oi),   //index
                                col_index :  parseInt(pi), //渲染到第几组数据 / 用于获取颜色
                                item_arr : point_item,  //渲染的点的样式集合
                                animate : false     //点显示是否有动画 / 在鼠标经过的点才会有动画
                            })
                        }else{
                            render_spot({
                                RP : points[oi],
                                index : parseInt(oi),
                                col_index :  parseInt(pi),
                                item_arr:point_hover_item,
                                animate:true
                            })
                        }
                    }
                }
            }
        }
}

const RD_pointer = ({ zrender, _DIFF, ROW_CONFIG, get_color, REFS }) => {
    let RENDER_pointer = new zrender.Group(),  //承载所有指示器的组合
        spot_line = new zrender.Group(),        //承载转折点、指示器的线、提示框的组合   不包含柱状图的提示标示文字
        dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_,
        chartData = ROW_CONFIG.chartData,
        all_points = _DIFF.all_points || [],
        tip = ROW_CONFIG.pointer.tip,   //提示配置
        vertical = ROW_CONFIG.pointer.vertical, //指示器竖线配置
        before_x //竖线移动的 X 位置

        

    RENDER_pointer.dirty()
    


    /**
     * 渲染所有的转折点
     */
    RD_spot({
        zrender,
        _DIFF,
        ROW_CONFIG,
        get_color,
        SL:spot_line,
        index:-1
    })


    /**
     * 渲染指示器竖线
     */
    let vertical_line = new zrender.Line({
        shape: {
            x1 : _box_.left,
            y1 : _box_.top,
            x2 : _box_.left,
            y2 : _DIFF.height - _box_.bottom
        },
        style: Object.assign({},vertical.style,{
            lineWidth : dpr(vertical.style.lineWidth),
            lineDash : arr_zoom({
                arr : vertical.style.lineDash,
                dpr
            })
        }),
        zlevel:800,
    });
    vertical_line.hide()


    //更新指示器竖线的位置
    let up_line = (before_x) =>{
        vertical_line.animateTo({
            shape: {
                x1 : before_x,
                x2 : before_x,
            },
        },260,0,'quarticOut',()=>{
            //动画结束
        })
    }



    let move_point = (e) => {
        let X = e.X
        if(X <= _box_.left){
            X = _box_.left
        }
        if(X >= (_DIFF.width - _box_.right)){
            X = _DIFF.width - _box_.right
        }

        let sub_len = (_DIFF.width - _box_.left - _box_.right) / (chartData.length - 1),
            pp_obj = adjacent(X - _box_.left, sub_len, _DIFF.all_points[0].points)// 当前鼠标相对画布的 X 坐标 , 横轴分段的每一段长度 , 点集合
        //何时去触发重新绘制
        if(pp_obj.position && before_x != pp_obj.position[0]){
            console.log('gengxin',pp_obj)
            RD_spot({
                zrender,
                _DIFF,
                ROW_CONFIG,
                get_color,
                SL:spot_line,
                index:pp_obj.index
            })
            before_x = pp_obj.position[0]
            up_line(before_x)
            // up_tips(before_x,e,pp_obj)


            // //回调用户
            // if(event.pointer && event.pointer.update && zrender.util.isFunction(event.pointer.update)){
            //     event.pointer.update(chartData[pp_obj.index])
            // }
        }
        

        //移动的时候显示出来
        
        if(vertical.show === true){
            vertical_line.show()
        }
        // if(pointer.tip.show === true){
        //     render_tip.show()
        // }
    }

    let end_point = () =>{
        vertical_line.hide()
        RD_spot({
            zrender,
            _DIFF,
            ROW_CONFIG,
            get_color,
            SL:spot_line,
            index:-1
        })
    }


    if(isMouse() == true){ //优先使用touch事件
        // REFS.addEventListener('touchstart',(e)=>{
        //     touch_Y = e.zrY
        //     ROW_CONFIG.event.touchstart()
        // })
        REFS.addEventListener('touchmove',(e)=>{
            // e.stopPropagation()
            move_point({
                X:e.zrX,
                Y:e.zrY,
            })
            // if(Math.abs(e.zrY - touch_Y) < _DIFF.height*0.3){
            //     e.preventDefault(); //手机上阻止默认事件会防止滚动条也开始滚动
                e.stopPropagation()
            // }
           
        },{ passive: false })
        REFS.addEventListener('touchend',end_point)
    }else{
        //PC 端
        CHART.on('mousemove', (e)=>{
            // e.preventDefault()
            // e.stopPropagation()
            move_point({
                X:e.offsetX,
                Y:e.offsetY,
            })
        }) 
        //PC 端松开之后移除提示
        CHART.on('mouseup', end_point)
    }






    RENDER_pointer.add(vertical_line)
    RENDER_pointer.add(spot_line)

    






    return RENDER_pointer
}
export {
    RD_pointer
}