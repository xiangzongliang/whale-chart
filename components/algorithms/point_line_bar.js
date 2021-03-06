const point_line_bar = ({all, arr, _CORE, ROW_CONFIG, _DIFF, X_left=0, X_right=0, total_width=0, total_interval=0}) => {
    let N_max = _CORE.zero_top * _CORE.item_val,
        N_min = _CORE.zero_bottom * _CORE.item_val * -1,
        _box_ = ROW_CONFIG._box_,
        zero_axis = _CORE.zero_axis,
        diff = _CORE.diff,
        dpr = ROW_CONFIG.dpr,
        isN = diff.isN,
        points = [],
        chart_interval = dpr(ROW_CONFIG.chart.interval), //特殊值
        deviation = ((total_width + total_interval) / 2) || 0  //偏移量 ⚠️ 带有柱状图时才会有偏移量

        for(let ai in arr){
            let x = (_DIFF.width - chart_interval - X_left - (X_right ? X_right : _box_.right) - total_width - total_interval) / (arr.length-1) * parseInt(ai) + X_left + deviation + (chart_interval/2),
                y,
                val = parseFloat(arr[ai]),
                isBreak = false;    //是否有断点,折线图断点计算多段线展示
            

            //如果值异常,则标记为断线
            if(isNaN(val)){
                isBreak = true
            }


            if(isN === true){
                if(val > 0){
                    
                    y = zero_axis - val / N_max * (_CORE.zero_top * _CORE.item_height)
                }else if(val == 0){
                    y = zero_axis
                }else{
                    y = zero_axis - (val / N_min * (_CORE.zero_bottom * _CORE.item_height) * -1 )
                }
            }else{
                y = (_DIFF.height - _box_.top - _box_.bottom) - (val / N_max * (_DIFF.height - _box_.top - _box_.bottom)) + _box_.top
            } 
             
            points.push([x,y,isBreak,arr[ai]])  

        }
    return points

}


export {
    point_line_bar
}
