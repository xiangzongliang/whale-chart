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

}
let axis_right = ({zrender, ROW_CONFIG, _DIFF}) => {

}

export{
    axis_bottom,
    axis_left,
    axis_right
}