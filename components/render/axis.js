import { arr_zoom } from '../algorithms/arr_zoom'
import { abnormal_float } from '../algorithms/abnormal_float'
/**
 * 渲染左侧的轴
 * @param {*} param0 
 */
let RD_left_axis = ({ zrender, _CORE, ROW_CONFIG }) => {
    let RENDER_left_axis = new zrender.Group(),
        dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_,
        text_max_length = 0,
        formatter = ROW_CONFIG.axis.left.formatter,
        x = _box_.left,
        render_left_arr = [],
        chart_interval = dpr(ROW_CONFIG.chart.interval), //特殊值
        inward = ROW_CONFIG.axis.inward   //Boolean 是否要把轴的文字放在内侧 默认true




        if(ROW_CONFIG.axis.left.text.show === true){
            //内侧轴显示的相关配置
            let inward_style = {},
                inward_x = 0

            let render_text = ({text,y}) => {
                if(inward === true){
                    inward_style = {
                        textAlign: "left",
                        textVerticalAlign:"bottom",
                        textPosition:[0,-5]
                    }
                    inward_x = chart_interval / 2
                }
                let left_axis = new zrender.Rect({
                    shape:{
                        x: x + inward_x,
                        y: y,
                        width:0,
                        height:0,
                    },
                    style: Object.assign({},ROW_CONFIG.axis.left.text.style,{
                        text:text,
                        fontSize: dpr(ROW_CONFIG.axis.left.text.style.fontSize)
                    },inward_style),
                    zlevel:0
                })
                RENDER_left_axis.add(left_axis)
            }


            //0轴以上的文字 包含0 轴
            for(let ti=0; ti <= _CORE.zero_top; ti++){
                let text = _CORE.item_val * (_CORE.zero_top - ti),
                    y = ti * _CORE.item_height + _box_.top
                    text = abnormal_float(text)

                    text = formatter(text) || text


                    let text_length = `${text}`.length //记录文字的长度

                    if(text_length > text_max_length){
                        text_max_length = text_length
                    }



                    render_left_arr.push({
                        text,
                        y  
                    })

            }

            //0轴以下的文字
            for(let bi = 0; bi < _CORE.zero_bottom; bi++){
                let text = _CORE.item_val * (bi+1) * -1,
                    y = (bi + _CORE.zero_top + 1)* _CORE.item_height + _box_.top
                    text = abnormal_float(text)
                    text = formatter(text) || text

                    let text_length = `${text}`.length //记录文字的长度

                    if(text_length > text_max_length){
                        text_max_length = text_length
                    }


                    render_left_arr.push({
                        text,
                        y  
                    })
            }

            //通过文字的长度计算向右偏移的位置
            x = inward === true ? _box_.left : text_max_length * dpr(ROW_CONFIG.axis.left.text.style.fontSize) / 2 + ROW_CONFIG.axis.left.paddingLeft + _box_.left
            for(let lai in render_left_arr){
                render_text(render_left_arr[lai])
            }
        } 


    return {
        RENDER_left_axis,  //可以被zrender渲染的组
        text_max_length,        //在未处理的情况下,最大文字长度
        X_left:x,               //向左偏移的距离
    }
}





/**
 * 渲染右侧的轴
 * @param {*} param0 
 */

let RD_right_axis = ({ zrender, _CORE, ROW_CONFIG, _DIFF }) => {
    let RENDER_right_axis = new zrender.Group(),
        dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_,
        text_max_length = 0,
        formatter = ROW_CONFIG.axis.right.formatter,
        x = _DIFF.width - _box_.right,
        render_left_arr = [],
        chart_interval = dpr(ROW_CONFIG.chart.interval), //特殊值
        inward = ROW_CONFIG.axis.inward   //Boolean 是否要把轴的文字放在内侧 默认true


        if(ROW_CONFIG.axis.right.text.show === true){
            //内侧轴显示的相关配置
            let inward_style = {},
                inward_x = 0

            if(inward === true){
                inward_style = {
                    textAlign: "right",
                    textVerticalAlign:"bottom",
                    textPosition:[0,-5]
                }
                inward_x = chart_interval / 2
            }

            let render_text = ({text,y}) => {
                let left_axis = new zrender.Rect({
                    shape:{
                        x: x - inward_x,
                        y: y,
                        width:0,
                        height:0,
                    },
                    style: Object.assign({},ROW_CONFIG.axis.right.text.style,{
                        text:text,
                        fontSize: dpr(ROW_CONFIG.axis.right.text.style.fontSize)
                    },inward_style),
                    zlevel:0
                })
                RENDER_right_axis.add(left_axis)
            }


            //0轴以上 包含0 轴
            for(let ti=0; ti <= _CORE.zero_top; ti++){
                let text = _CORE.item_val * (_CORE.zero_top - ti),
                    y = ti * _CORE.item_height + _box_.top
                    text = abnormal_float(text)
                    text = formatter(text) || text

                    let text_length = `${text}`.length //记录文字的长度
                    if(text_length > text_max_length){
                        text_max_length = text_length
                    }

                    render_left_arr.push({
                        text,
                        y  
                    })
            }

            //0轴以下
            for(let bi = 0; bi < _CORE.zero_bottom; bi++){
                let text = _CORE.item_val * (_CORE.zero_bottom - bi) * -1,
                    y = (bi + _CORE.zero_top + 1)* _CORE.item_height + _box_.top
                    text = abnormal_float(text)
                    text = formatter(text) || text


                    let text_length = `${text}`.length //记录文字的长度
                    if(text_length > text_max_length){
                        text_max_length = text_length
                    }

                    render_left_arr.push({
                        text,
                        y  
                    })
            }

            //通过文字的长度计算向右偏移的位置
            x = inward === true ? _DIFF.width - _box_.right : _DIFF.width - (text_max_length * dpr(ROW_CONFIG.axis.right.text.style.fontSize) / 2 + ROW_CONFIG.axis.right.paddingRight ) - _box_.right
            for(let lai in render_left_arr){
                render_text(render_left_arr[lai])
            }
        }

    return {
        RENDER_right_axis,  //可以被zrender渲染的组
        // text_max_length,        //在未处理的情况下,最大文字长度
        X_right: _DIFF.width - x,               //向左偏移的距离
    }
}




/**
 * 渲染底部的轴
 * @param {*} param0 
 */

let RD_bottom_axis = ({ zrender, _DIFF, ROW_CONFIG, X_left, X_right, }) => {
    let RENDER_bottom_axis = new zrender.Group(),
        axis_bottom = ROW_CONFIG.axis.bottom,
        _box_ = ROW_CONFIG._box_,
        dpr = ROW_CONFIG.dpr,
        chartData = ROW_CONFIG.chartData,
        render_key = ROW_CONFIG.dimension.bottom.key,
        type =  axis_bottom.interval.type,
        formatter = axis_bottom.formatter,
        chart_interval = dpr(ROW_CONFIG.chart.interval), //特殊值
        points = _DIFF.all_points[0].points //拿到第一组点集合  通过 X 坐标渲染全部 X 轴文字



        /**
         * 渲染底部的线
         */
        if(axis_bottom.line.show === true){
            let bottom_line = new zrender.Line({
                shape:{
                    x1 : X_left + chart_interval/2,
                    x2 : _DIFF.width - (X_right ? X_right : _box_.right) - chart_interval/2,
                    y1 : _DIFF.height - _box_.bottom,
                    y2 : _DIFF.height - _box_.bottom
                },
                style:Object.assign({},axis_bottom.line.style,{
                    lineWidth:dpr(axis_bottom.line.style.lineWidth),
                    lineDash:arr_zoom({arr:axis_bottom.line.style.lineDash,dpr})
                })
            })

            RENDER_bottom_axis.add(bottom_line)
        }



        /**
         * 渲染底部的文字
         */
        if(axis_bottom.text.show === true){
            for(let bi in points){

                let _text = chartData[bi][render_key],
                    textAlign = 'center',
                    RD_text = ({X,T,TA}) =>{
                        let render_bottom_text = new zrender.Rect({
                            shape:{
                                r : 0,
                                x : X || points[bi][0] - chart_interval / 2,
                                y : _DIFF.height
                            },
                            style:Object.assign({},axis_bottom.text.style,{
                                text : T,
                                textAlign : TA,
                                fontSize : dpr(axis_bottom.text.style.fontSize),
                                // fontWeight : dpr(axis_bottom.text.style.fontWeight)
                            }) 
                        })
                        RENDER_bottom_axis.add(render_bottom_text)
                    }
                //执行用户自定义
                if(formatter && zrender.util.isFunction(formatter)){
                    let n_text = formatter(_text,chartData[bi])
                    if(n_text){
                        _text = n_text
                    }
                }


                if(type == 'between'){
                    if(bi == 0){
                        RD_text({
                            // X:points[bi][0] - chart_interval / 2,
                            X:points[bi][0],
                            T:_text,
                            TA:'left'
                        }) 
                    }else if(bi == (chartData.length - 1)){
                        RD_text({
                            // X:points[bi][0] + chart_interval / 2,
                            X:points[bi][0],
                            T:_text,
                            TA:'right'
                        }) 
                    } 
                }else{
        
                    //渲染底部文字
                    RD_text({
                        X:points[bi][0],
                        T:_text,
                        TA:textAlign
                    })
                }
            }
        }
        


    return RENDER_bottom_axis
}


export {
    RD_left_axis,
    RD_right_axis,
    RD_bottom_axis
}