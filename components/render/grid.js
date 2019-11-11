import { arr_zoom } from '../algorithms/arr_zoom'
let RD_grid = ({ zrender, _CORE, ROW_CONFIG, X_left, X_right,_DIFF  }) => {
    let RENDER_grid = new zrender.Group(),
        dpr = ROW_CONFIG.dpr,
        all_gb_line = _CORE.zero_top + _CORE.zero_bottom + 1,
        _box_ = ROW_CONFIG._box_,
        axis_bottom = ROW_CONFIG.axis.bottom,
        chart_interval = dpr(ROW_CONFIG.chart.interval) //特殊值
    
    for(let gi=0; gi<all_gb_line;gi++){

        if(axis_bottom.line.show == true && gi == (all_gb_line-1)){
            break;
        }
        let y = _CORE.item_height * gi + _box_.top
        let grid_line = new zrender.Line({
            shape:{
                x1 : X_left + chart_interval / 2,
                y1 : y,
                x2 : _DIFF.width - (X_right ? X_right : _box_.right) - chart_interval / 2,
                y2 : y,
            },
            style: Object.assign({},ROW_CONFIG.grid.horizontal.style,{
                lineWidth: dpr(ROW_CONFIG.grid.horizontal.style.lineWidth),
                lineDash: arr_zoom({arr:ROW_CONFIG.grid.horizontal.style.lineDash,dpr})
            }),
            zlevel:0
        })
        RENDER_grid.add(grid_line)

    }




    return {
        RENDER_grid
    }
}
export {
    RD_grid
}