import { arr_zoom } from '../algorithms'

/**
 * 渲染 X 轴
 */
let axis_bottom = ({zrender, ROW_CONFIG, _DIFF}) =>{
    let btm_axis_grid = new zrender.Group(),
        axis_bottom = ROW_CONFIG.axis.bottom,
        _box_ = ROW_CONFIG._box_,
        dpr = ROW_CONFIG.dpr


    /**
     * 渲染 X 轴
     */
    let X_axis = new zrender.Line({
        shape:{
            x1:_box_.left,
            y1:_DIFF.height - _box_.bottom,
            x2:_DIFF.width - _box_.right,
            y2:_DIFF.height - _box_.bottom + 1
        },
        style: Object.assign({},axis_bottom.lineStyle,{
            lineWidth:  dpr(axis_bottom.lineStyle.lineWidth),
            lineDash: arr_zoom({arr:axis_bottom.lineStyle.lineDash,dpr}),
        }),
        zlevel:0
    })
    btm_axis_grid.add(X_axis)



    /**
     * 渲染 X 轴对应的文字
     */


    let render_key = ROW_CONFIG.dimension.bottom.key,
        type =  axis_bottom.interval.type,
        chartData = ROW_CONFIG.chartData,
        points = _DIFF.all_points[0].points, //拿到第一组点集合  通过 X 坐标渲染全部 X 轴文字
        render_bottom_text = ({shape,style}) => {
            let bottom_text = new zrender.Rect({
                shape:Object.assign({},{
                    y:  _DIFF.height
                },shape),
                style: Object.assign({},axis_bottom.textStyle,{
                    fontSize: dpr(axis_bottom.textStyle.fontSize),
                },style),
                zlevel:0
            })
            btm_axis_grid.add(bottom_text)
        }

    
    for(let ai in points){
        let bottom_text = chartData[ai] ? chartData[ai][render_key] : '',
            textAlign = 'center'


        bottom_text = axis_bottom.formatter(bottom_text) || '' //用户自定义处理文字大小


        //处理第一个最后一个的对齐方式
        if(ai == 0){
            textAlign = 'left'
        }else if(ai == points.length - 1){
            textAlign = 'right'
        }
        

        if(type == 'between'){
            if(ai == 0 || ai == points.length - 1){
                render_bottom_text({
                    shape:{
                        x: points[ai][0]
                    },
                    style:{
                        text: bottom_text,
                        textAlign : textAlign
                    }
                })
            }
        }else{
            render_bottom_text({
                shape:{
                    x: points[ai][0]
                },
                style:{
                    text: bottom_text,
                    textAlign : textAlign
                }
            })
        }
        
    }
    return btm_axis_grid
}



let axis_left = ({zrender, ROW_CONFIG, _DIFF}) => {
    let left_axis_grid = new zrender.Group(),
        left_axis_points = _DIFF.left_axis_points || [],
        dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_
    
    if(left_axis_points.length > 0){
        let diff = left_axis_points[0].diff,
            all_line = diff.all_line,
            zero_top = diff.zero_top,
            cut = diff.cut
        for(let li=0; li <= all_line; li++){
            let y_coor = diff.item_H * li + _box_.top,
                text = cut * (zero_top - li)

            let left_zero_text = new zrender.Rect({
                    shape:{
                        x:  dpr(ROW_CONFIG.axis.left.paddingLeft),
                        y:  y_coor,
                        width:0,
                        height:0,
                    },
                    style: Object.assign({},ROW_CONFIG.axis.left.textStyle,{
                        text:       ROW_CONFIG.axis.left.formatter(text),
                        fontSize:   dpr(ROW_CONFIG.axis.left.textStyle.fontSize)
                    }),
                    zlevel:0
                })

            left_axis_grid.add(left_zero_text)
        }

    }
    return left_axis_grid
}
let axis_right = ({zrender, ROW_CONFIG, _DIFF}) => {
    let right_axis_grid = new zrender.Group(),
        right_axis_points = _DIFF.right_axis_points || [],
        dpr = ROW_CONFIG.dpr,
        _box_ = ROW_CONFIG._box_
    
    if(right_axis_points.length > 0){
        let diff = right_axis_points[0].diff,
            zero_top = diff.zero_top,
            all_line = diff.all_line,
            cut = diff.cut

        

        //渲染 0 轴以上
        for(let ti=0; ti <= all_line; ti++){
            let y_coor = diff.item_H * ti + _box_.top,
                text = cut * (zero_top - ti)

            let right_zero_text = new zrender.Rect({
                shape:{
                    x:  _DIFF.width - _box_.right + dpr(ROW_CONFIG.axis.right.paddingRight),
                    y:  y_coor,
                    width:0,
                    height:0,
                },
                style: Object.assign({},ROW_CONFIG.axis.right.textStyle,{
                    text:       ROW_CONFIG.axis.right.formatter(text),
                    fontSize:   dpr(ROW_CONFIG.axis.right.textStyle.fontSize)
                }),
                zlevel:0
            })
            right_axis_grid.add(right_zero_text)
        }


    }



    // console.log(_DIFF)



    return right_axis_grid
}

export{
    axis_bottom,
    axis_left,
    axis_right
}