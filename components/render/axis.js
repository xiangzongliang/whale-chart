import { arr_zoom } from '../algorithms/arr_zoom'
/**
 * 渲染左侧的轴
 * @param {*} param0 
 */
let RD_left_axis = ({ zrender, _CORE, ROW_CONFIG }) => {
    let RENDER_left_axis = new zrender.Group(),
        dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_,
        max_V = _CORE.zero_top * _CORE.item_val,
        min_V = _CORE.zero_bottom * _CORE.item_val,
        max_length = `${max_V}`.length,
        min_length = `${min_V}`.length,
        text_max_length = max_length,
        formatter = ROW_CONFIG.axis.left.formatter,
        x = dpr(10)



        if(ROW_CONFIG.axis.left.text.show === true){

        
            if(min_length > max_length){
                text_max_length = min_length
            }

            //通过文字的长度计算向右偏移的位置
            x = text_max_length * ROW_CONFIG.axis.left.text.style.fontSize / 2 + ROW_CONFIG.axis.left.paddingLeft + _box_.left

            let render_text = ({text,y}) => {
                let left_axis = new zrender.Rect({
                    shape:{
                        x: x,
                        y: y,
                        width:0,
                        height:0,
                    },
                    style: Object.assign({},ROW_CONFIG.axis.left.text.style,{
                        text:text
                    },{
                        fontSize: dpr(ROW_CONFIG.axis.left.text.style.fontSize)
                    }),
                    zlevel:0
                })
                RENDER_left_axis.add(left_axis)
            }


            //0轴以上的文字 包含0 轴
            for(let ti=0; ti <= _CORE.zero_top; ti++){
                let text = _CORE.item_val * (_CORE.zero_top - ti),
                    y = ti * _CORE.item_height + _box_.top
                    text = formatter(text) || text
                    render_text({
                        text,
                        y
                    })
            }

            //0轴以下的文字
            for(let bi = 0; bi < _CORE.zero_bottom; bi++){
                let text = _CORE.item_val * (bi+1) * -1,
                    y = (bi + _CORE.zero_top + 1)* _CORE.item_height + _box_.top
                    text = formatter(text) || text
                    render_text({
                        text,
                        y
                    })
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
        max_V = _CORE.zero_top * _CORE.item_val,
        min_V = _CORE.zero_bottom * _CORE.item_val,
        max_length = `${max_V}`.length,
        min_length = `${min_V}`.length,
        text_max_length = max_length,
        formatter = ROW_CONFIG.axis.right.formatter,
        x = dpr(10)


        if(ROW_CONFIG.axis.right.text.show === true){

            if(min_length > max_length){
                text_max_length = min_length
            }

            //通过文字的长度计算向右偏移的位置
            x = _DIFF.width - (text_max_length * ROW_CONFIG.axis.right.text.style.fontSize / 2 + ROW_CONFIG.axis.right.paddingRight ) - _box_.right

            let render_text = ({text,y}) => {
                let left_axis = new zrender.Rect({
                    shape:{
                        x: x,
                        y: y,
                        width:0,
                        height:0,
                    },
                    style: Object.assign({},ROW_CONFIG.axis.right.text.style,{
                        text:text
                    },{
                        fontSize: dpr(ROW_CONFIG.axis.right.text.style.fontSize)
                    }),
                    zlevel:0
                })
                RENDER_right_axis.add(left_axis)
            }


            //0轴以上 包含0 轴
            for(let ti=0; ti <= _CORE.zero_top; ti++){
                let text = _CORE.item_val * (_CORE.zero_top - ti),
                    y = ti * _CORE.item_height + _box_.top
                    text = formatter(text) || text
                    render_text({
                        text,
                        y
                    })
            }

            //0轴以下
            for(let bi = 0; bi < _CORE.zero_bottom; bi++){
                let text = _CORE.item_val * (_CORE.zero_bottom - bi) * -1,
                    y = (bi + _CORE.zero_top + 1)* _CORE.item_height + _box_.top
                    text = formatter(text) || text
                    render_text({
                        text,
                        y
                    })
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
        points = _DIFF.all_points[0].points //拿到第一组点集合  通过 X 坐标渲染全部 X 轴文字



        /**
         * 渲染底部的线
         */
        if(axis_bottom.line.show === true){
            let bottom_line = new zrender.Line({
                shape:{
                    x1 : X_left,
                    x2 : _DIFF.width - (X_right ? X_right : _box_.right),
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
                let _text = chartData[bi][render_key]
                //执行用户自定义
                if(formatter && zrender.util.isFunction(formatter)){
                    let n_text = formatter(_text,chartData[bi])
                    if(n_text){
                        _text = n_text
                    }
                }
    
    
    
                //渲染底部文字
                let render_bottom_text = new zrender.Rect({
                    shape:{
                        r : 0,
                        x : points[bi][0],
                        y : _DIFF.height
                    },
                    style:Object.assign({},axis_bottom.text.style,{
                        text : _text,
                        fontSize : dpr(axis_bottom.text.style.fontSize),
                        fontWeight : dpr(axis_bottom.text.style.fontWeight)
                    }) 
                })
                RENDER_bottom_axis.add(render_bottom_text)
            }
        }
        


    return RENDER_bottom_axis
}


export {
    RD_left_axis,
    RD_right_axis,
    RD_bottom_axis
}