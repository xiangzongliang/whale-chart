import { arr_zoom } from '../algorithms'
let render_grid = ({ zrender ,ROW_CONFIG={}, _DIFF = {} }) => {
    let bg_grid = new zrender.Group(),
        all_points = _DIFF.all_points,
        grid = ROW_CONFIG.grid,
        _box_ = ROW_CONFIG._box_,
        dpr = ROW_CONFIG.dpr

    //不渲染网格背景层的所有内容
    if(grid.show === false){
        return bg_grid
    }

        //是否渲染背景网格
    if(grid && grid.horizontal && grid.horizontal.show === true){
        let bg_config = {}
        for(let ai in all_points){
            if(all_points[ai].axis == 'left'){
                bg_config = all_points[ai]
                break;
            }
        }


        //渲染网格背景线

        let diff = bg_config.diff,
            all_line = diff.all_line

        for(let bi=0; bi < all_line; bi++){
            let y_coor = diff.item_H * bi + _box_.top
            let zero_line = new zrender.Line({
                shape:{
                    x1 : _box_.left + _DIFF._cache.leftTextMaxWidth,
                    y1 : y_coor,
                    x2 : _DIFF.width - _box_.right,
                    y2 : y_coor,
                },
                style: Object.assign({},grid.horizontal.lineStyle,{
                    lineWidth: dpr(grid.horizontal.lineStyle.lineWidth),
                    lineDash: arr_zoom({arr:grid.horizontal.lineStyle.lineDash,dpr})
                }),
                zlevel:0
            })

            bg_grid.add(zero_line)
        }
    }
    return bg_grid
}

export {
    render_grid
}