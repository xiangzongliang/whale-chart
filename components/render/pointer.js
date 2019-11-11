import { arr_zoom } from '../algorithms/arr_zoom'
import { adjacent } from '../algorithms/adjacent'
import { isMouse } from './event'


/**
 * 渲染转折点
 * @param {*} param0 
 */


const RD_spot = ({ zrender, SL, SHL, _DIFF, ROW_CONFIG, get_color,index }) => { 
    let dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_,
        all_points = _DIFF.all_points || [],
        point = ROW_CONFIG.pointer.point,  //点配置
        point_item = point.item || [],      //点数量 、 样式
        point_hover = point.hover || [],      //鼠标经过的转折点
        point_hover_item = point_hover.item || []




        if( point.show === true ){
            for(let pi in all_points){
                if(all_points[pi].type == 'line'){
                    let points = all_points[pi].points || [],
                        line_group = new zrender.Group(), //每一条线上的点为一个集合
                        line_hover_group = new zrender.Group() 

                    for(let pie in points){
                        let merge_point = new zrender.Group({
                            origin:[points[pie][0],points[pie][1]]
                        }), //每一个点上的圆形为一个集合
                            merge_hover_point = new zrender.Group({
                                scale:[0,0], //缩放
                                origin:[points[pie][0],points[pie][1]] //中心点
                            })
                        for(let dp in point_item){
                            let canvas_point = new zrender.Circle({
                                shape : Object.assign({},{
                                    cx : points[pie][0],
                                    cy : points[pie][1],
                                },{
                                    r : dpr(point_item[dp].shape.r)
                                }),
                                style : Object.assign({},{
                                    fill    :  get_color(pi) || '#000',
                                    stroke  : get_color(pi) || '#000',
                                },point_item[dp].style,{
                                    lineWidth : dpr(point_item[dp].style ? point_item[dp].style.lineWidth : 0)
                                }),
                                zlevel:800,
                                z:100
                            })
                            merge_point.add(canvas_point)
                        }


                        for(let hi in point_hover_item){
                            let canvas_hover_point = new zrender.Circle({
                                shape : Object.assign({},{
                                    cx : points[pie][0],
                                    cy : points[pie][1],
                                },{
                                    r : dpr(point_hover_item[hi].shape.r)
                                }),
                                style : Object.assign({},{
                                    fill    :  get_color(pi) || '#000',
                                    stroke  : get_color(pi) || '#000',
                                    lineWidth : dpr(point_hover_item[hi].style ? point_hover_item[hi].style.lineWidth : 0)
                                },point_hover_item[hi].style),
                                zlevel:800,
                                z:100
                            })
                            merge_hover_point.add(canvas_hover_point)
                        }


                        line_group.add(merge_point)
                        line_hover_group.add(merge_hover_point)
                    }
                    SL.add(line_group)
                    SHL.add(line_hover_group)
                }
            }
        }

        


}


/**
 * 渲染指示器
 * @param {*} param0 
 */
const RD_pointer = ({ zrender, _DIFF, ROW_CONFIG, get_color, REFS, CHART }) => {
    let RENDER_pointer = new zrender.Group(),  //承载所有指示器的组合
        spot_line = new zrender.Group(),        //承载转折点、指示器的线、提示框的组合   不包含柱状图的提示标示文字
        spot_hover_line = new zrender.Group(),        //转折点的鼠标经过
        dpr = ROW_CONFIG.dpr,
        event = ROW_CONFIG.event,
        _box_ = ROW_CONFIG._box_,
        chartData = ROW_CONFIG.chartData || [],
        chartData_len = chartData.length,
        animate_len = 10,   //超过十条数据的图表 不使用动画效果   直接切换
        columns = ROW_CONFIG.columns,


        point = ROW_CONFIG.pointer.point,  //点配置
        point_item = point.item || [],      //点数量 、 样式

        point_hover = point.hover || [],      //鼠标经过的转折点
        point_hover_item = point_hover.item || [],
        
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
        SHL:spot_hover_line,
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




    //更新点
    /**
     * 这里的寻找方式很复杂
     * 建议完整理解在修改
     * !!!! 我太难了
     * 不要重新绘制   要用更新 
     * 重新绘制性能很低
     */
    let up_point = ({index=0}) => {
        let S_L_num = spot_line.childCount()  //有多少条线的组
        for(let si = 0;si < S_L_num;si ++){
            let _G_L = spot_line.childAt(si), //每条线的组
                G_H_L = spot_hover_line.childAt(si),
                _G_L_num = _G_L.childCount() //每一条线上有多少个点
            for(let gi = 0; gi<_G_L_num; gi++){
                let PO_G = _G_L.childAt(gi),//每个点集合的组
                    PO_H_G = G_H_L.childAt(gi);

                    if(gi == index){
                        PO_G.attr({
                            scale:[0,0]
                        })
                        PO_H_G.attr({
                            scale:[1,1]
                        })
                    }else{
                        PO_G.attr({
                            scale:[1,1]
                        })
                        PO_H_G.attr({
                            scale:[0,0]
                        })
                    }
            }
        }
    }

    //更新指示器竖线的位置
    let up_line = (before_x) =>{
        if(chartData_len > animate_len){
            vertical_line.attr({
                shape: {
                    x1 : before_x,
                    x2 : before_x,
                },
            })
        } else {
            vertical_line.animateTo({
                shape: {
                    x1 : before_x,
                    x2 : before_x,
                },
            },200,0,'quarticOut')
        }
        
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


        tips_box.animateTo({
            position:[position_X,position_Y],
        },100,0,()=>{},true)
        
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
            before_x = pp_obj.position[0]

            if(vertical.show == true){
                up_line(before_x)
                vertical_line.show()
            }

            if(tip.show === true){
                up_tips(before_x,pp_obj)
                tips_box.show()
            }


            //更新转折点
            up_point({
                index : pp_obj.index
            })
            

            
            
            

            //回调用户
            if(event.pointer && event.pointer.update && zrender.util.isFunction(event.pointer.update)){
                event.pointer.update(chartData[pp_obj.index])
            }
        }
    }



    let end_point = () =>{
        vertical_line.hide()
        tips_box.hide()
        up_point({
            index : -1
        })
        ROW_CONFIG.event.touchend()
    }




    if(isMouse() == true){ //优先使用touch事件
        REFS.addEventListener('touchstart',(e)=>{
            // touch_Y = e.zrY
            ROW_CONFIG.event.touchstart()
        })
        REFS.addEventListener('touchmove',(e)=>{
            move_point({
                X:e.zrX,
                Y:e.zrY,
            })
            
            e.preventDefault(); //手机上阻止默认事件会防止滚动条也开始滚动
            e.stopPropagation()
           
        })
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
    RENDER_pointer.add(spot_hover_line)

    return RENDER_pointer
}
export {
    RD_pointer
}