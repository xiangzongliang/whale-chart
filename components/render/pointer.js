import { arr_zoom } from '../algorithms/arr_zoom'
import { adjacent } from '../algorithms/adjacent'
import { isMouse } from './event'


/**
 * 渲染转折点
 * @param {*} param0 
 */
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


/**
 * 渲染指示器
 * @param {*} param0 
 */
const RD_pointer = ({ zrender, _DIFF, ROW_CONFIG, get_color, REFS }) => {
    let RENDER_pointer = new zrender.Group(),  //承载所有指示器的组合
        spot_line = new zrender.Group(),        //承载转折点、指示器的线、提示框的组合   不包含柱状图的提示标示文字
        dpr = ROW_CONFIG.dpr,
        event = ROW_CONFIG.event,
        _box_ = ROW_CONFIG._box_,
        chartData = ROW_CONFIG.chartData,
        columns = ROW_CONFIG.columns,
        
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

    /**
     * 渲染提示框
     */
    let rich = tip.style.rich
    if(zrender.util.isFunction(rich)){
        rich = rich({ dpr ,arr_zoom })
    }
    let tips_box =  new zrender.Text({
        position:[_box_.left,_box_.top],
        style:Object.assign({},tip.style,{
            textBorderWidth:dpr(tip.style.textBorderWidth),
            textBoxShadowBlur:dpr(tip.style.textBoxShadowBlur),
            textBorderRadius:dpr(tip.style.textBorderRadius),
            textPadding:arr_zoom({
                arr:tip.style.textPadding,
                dpr
            }),
            rich:rich,
        }),
        zlevel:800,
    })

    vertical_line.dirty()
    vertical_line.hide()
    tips_box.dirty()
    tips_box.hide()


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

    //移动的时候更新提示框
    let up_tips = (before_x,pp_obj) => {
        let opt_data = chartData[pp_obj.index],
            text_arr = [],
            fmt_arr = []
        
        for(let ci in columns){
            text_arr.push(`{_key|${columns[ci].key} }{_val|${opt_data[columns[ci].key]}}`)
            fmt_arr.push([`${columns[ci].key}`,`${opt_data[columns[ci].key]}`])
        }


        let GET_text_arr = tip.formatter ? tip.formatter(fmt_arr) : null

        if(!GET_text_arr){
            GET_text_arr = text_arr
        }

        
        
        tips_box.attr({
            style:{
                text:GET_text_arr.join('\n'),
                textAlign:'left',
            }
        });

        //去计算位置
        let tips_BD = tips_box.getBoundingRect(),
            position_X,
            position_Y = _box_.top


        //让提示框不要跑出折线范围以外
        if(before_x > _DIFF.width / 2){
            position_X = before_x - tips_BD.width - 10
        }else{
            position_X = before_x + 10
        }
        // if(e.offsetY > (_DIFF.height - _box_.bottom - tips_BD.height)){
        //     position_Y = _DIFF.height - _box_.bottom - tips_BD.height - 10
        // }else if(e.offsetY < _box_.top){
        //     position_Y = _box_.top + 10
        // }

        tips_box.animateTo({
            position:[position_X,position_Y],
        },260,0,()=>{},true)
        
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
            up_tips(before_x,pp_obj)


            //回调用户
            if(event.pointer && event.pointer.update && zrender.util.isFunction(event.pointer.update)){
                event.pointer.update(chartData[pp_obj.index])
            }
        }
        

        //移动的时候显示出来
        
        if(vertical.show === true){
            vertical_line.show()
        }
        if(tip.show === true){
            tips_box.show()
        }
    }

    let end_point = () =>{
        vertical_line.hide()
        tips_box.hide()
        RD_spot({
            zrender,
            _DIFF,
            ROW_CONFIG,
            get_color,
            SL:spot_line,
            index:-1
        })
        ROW_CONFIG.event.touchend()
    }


    if(isMouse() == true){ //优先使用touch事件
        REFS.addEventListener('touchstart',(e)=>{
            // touch_Y = e.zrY
            ROW_CONFIG.event.touchstart()
        })
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
    RENDER_pointer.add(tips_box)
    RENDER_pointer.add(spot_line)

    






    return RENDER_pointer
}
export {
    RD_pointer
}