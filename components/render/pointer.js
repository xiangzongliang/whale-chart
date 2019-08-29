import { arr_zoom ,adjacent } from '../algorithms'
import { isMouse , touchHandler , mouseHandler} from './event'
/**
 * 折线图的提示
 */
let line_pointer = ({ zrender ,LGR ,all_points, index ,ROW_CONFIG ,_DIFF , get_color}) => {
    LGR.removeAll()
    let dpr = ROW_CONFIG.dpr,
        point = ROW_CONFIG.pointer.point || {},
        DEF_ITEM = point.item || [],
        HOVER_ARR = point.hover.item || [],

        render_default_pointer = (position,pi,api) =>{
            if(point.show === true){
                for(let im in DEF_ITEM){
                    let turning_point = new zrender.Circle({
                        shape : Object.assign({},{
                            cx:position[0],
                            cy:position[1]
                        },DEF_ITEM[im].shape,{
                            r:dpr(DEF_ITEM[im].shape.r || 0)
                        }),
                        style : Object.assign({},{
                            fill    : get_color(api) || '#000',
                            stroke  : get_color(api) || '#000',
                            lineWidth: dpr(DEF_ITEM[im].style ? DEF_ITEM[im].style.lineWidth : 0)
                        },DEF_ITEM[im].style),
                        zlevel:800,
                        z:100
                    })
                    LGR.add(turning_point)
                }
            }
        },
        render_hover_pointer = (position,pi,api) => {
            if(point.hover && point.hover.show === true){
                for(let hi in HOVER_ARR){
                    let hover_point = new zrender.Circle({
                        shape : {
                            cx:position[0],
                            cy:position[1],
                            r:0,
                        },
                        style : Object.assign({},{
                            fill    : get_color(api) || '#000',
                            stroke  : get_color(api) || '#000',
                            lineWidth:0
                        },HOVER_ARR[hi].style),
                        zlevel:800,
                        z:200
                    })
        
                    //执行一个逐渐放大的动画
                    hover_point.animate('shape', false)
                    .when(100,{
                        r: dpr(HOVER_ARR[hi].shape.r || 0)
                    })
                    .start()
                    LGR.add(hover_point)
                }
            }  
        }
    
        for(let api in all_points){
            let type = all_points[api].type,
                points = all_points[api].points
            if(type == 'line'){
                for(let pi in points){
                    if(index == pi){
                        render_hover_pointer(points[pi],pi,api)
                    }else{
                        render_default_pointer(points[pi],pi,api)
                    }
                }
            }
        }
}
/**
 * 柱状图提示
 */
let bar_pointer = () => {}

/**
 * 纵向指示器 | 即竖线
 */
let vertical_pointer = ({ zrender, ROW_CONFIG, _DIFF, CHART, REFS, get_color }) => {
    let pointer_group = new zrender.Group(),
        LINE_pointer_group = new zrender.Group(),
        _box_ = ROW_CONFIG._box_,
        dpr = ROW_CONFIG.dpr,
        pointer = ROW_CONFIG.pointer,
        columns = ROW_CONFIG.columns,
        event = ROW_CONFIG.event,
        all_points = _DIFF.all_points,
        chartData = ROW_CONFIG.chartData,
        before_x //竖线移动的 X 位置
        

        // console.log(all_points)



    /**
     * 渲染所有的点
     */
    line_pointer({
        zrender,
        all_points,
        LGR:LINE_pointer_group,
        ROW_CONFIG,
        _DIFF,
        get_color,
        index:-1
    })


        pointer_group.dirty()

    /**
     * 渲染竖线
     */
    let vertical_Pointer = new zrender.Line({
        shape: {
            x1 : _box_.left,
            y1 : _box_.top,
            x2 : _box_.left,
            y2 : _DIFF.height - _box_.bottom
        },
        style: Object.assign({},pointer.vertical.style,{
            lineWidth: dpr(pointer.vertical.style.lineWidth),
            lineDash: arr_zoom({
                arr:pointer.vertical.style.lineDash,
                dpr
            })
        }),
        zlevel:800,
    });
    /**
     * 提示器
     */
    let rich = pointer.tip.style.rich
        if(zrender.util.isFunction(rich)){
            rich = rich({ dpr ,arr_zoom })
        }
    let render_tip = new zrender.Text({
        position:[_box_.left,_box_.top],
        style:Object.assign({},pointer.tip.style,{
            textBorderWidth:dpr(pointer.tip.style.textBorderWidth),
            textBoxShadowBlur:dpr(pointer.tip.style.textBoxShadowBlur),
            textBorderRadius:dpr(pointer.tip.style.textBorderRadius),
            textPadding:arr_zoom({
                arr:pointer.tip.style.textPadding,
                dpr
            }),
            rich:rich
        }),
        zlevel:800,
    })
    vertical_Pointer.dirty()
    vertical_Pointer.hide()
    render_tip.dirty()
    render_tip.hide()



    //移动的时候更新线
    let up_line = (before_x) =>{
        vertical_Pointer.animateTo({
            shape: {
                x1 : before_x,
                x2 : before_x,
            },
        },260,0,'quarticOut',()=>{
            //动画结束
        })
    }

    //移动的时候更新提示框
    let up_tips = (before_x,e,pp_obj) => {
        let opt_data = chartData[pp_obj.index],
            text_arr = [],
            fmt_arr = []
        
        for(let ci in columns){
            text_arr.push(`{_key|${columns[ci].key} }{_val|${opt_data[columns[ci].key]}}`)
            fmt_arr.push([`${columns[ci].key}`,`${opt_data[columns[ci].key]}`])
        }


        let GET_text_arr = pointer.tip.formatter ? pointer.tip.formatter(fmt_arr) : null

        if(!GET_text_arr){
            GET_text_arr = text_arr
        }

        
        
        render_tip.attr({
            style:{
                text:GET_text_arr.join('\n'),
                textAlign:'left',
            }
        });

        //去计算位置
        let tips_BD = render_tip.getBoundingRect(),
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

        render_tip.animateTo({
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
            pp_obj = adjacent(X - _box_.left,sub_len,_DIFF.all_points[0].points)// 当前鼠标相对画布的 X 坐标 , 横轴分段的每一段长度 , 点集合
        //何时去触发重新绘制
        if(pp_obj.position && before_x != pp_obj.position[0]){
            line_pointer({
                zrender,
                all_points,
                LGR:LINE_pointer_group,
                ROW_CONFIG,
                _DIFF,
                get_color,
                index:pp_obj.index
            })
            before_x = pp_obj.position[0]
            up_line(before_x)
            up_tips(before_x,e,pp_obj)


            //回调用户
            if(event.pointer && event.pointer.update && zrender.util.isFunction(event.pointer.update)){
                event.pointer.update(chartData[pp_obj.index])
            }
        }
        

        //移动的时候显示出来
        
        if(pointer.vertical.show === true){
            vertical_Pointer.show()
        }
        if(pointer.tip.show === true){
            render_tip.show()
        }
    },
    end_point = e => {
        vertical_Pointer.hide()
        render_tip.hide()
        before_x = -1 //避免在下次滑动鼠标的时候只出现竖线,不出现选中的转折点
        line_pointer({
            zrender,
            all_points,
            LGR:LINE_pointer_group,
            ROW_CONFIG,
            _DIFF,
            get_color,
            index:-1
        })
    }



    if(isMouse() === true){ //优先使用鼠标事件
        //PC 端
        CHART.on('mousemove', (e)=>{
            move_point({
                X:e.offsetX,
                Y:e.offsetY,
            })
        }) 
        //PC 端松开之后移除提示
        CHART.on('mouseup', end_point)
    }else{
        REFS.addEventListener('touchmove',(e)=>{
            e.preventDefault();
            e.stopPropagation()
            move_point({
                X:e.zrX,
                Y:e.zrY,
            })
        })
        REFS.addEventListener('touchend',end_point)
        
    }




    pointer_group.add(vertical_Pointer)
    pointer_group.add(render_tip)
    pointer_group.add(LINE_pointer_group)
    return pointer_group
}
export {
    line_pointer,
    bar_pointer,
    vertical_pointer
}