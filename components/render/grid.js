import { arr_zoom } from '../algorithms'
let render_grid = ({ zrender ,ROW_CONFIG={}, _DIFF = {} }) => {
    let bg_grid = new zrender.Group(),
        all_points = _DIFF.all_points,
        grid = ROW_CONFIG.grid,
        _box_ = ROW_CONFIG._box_,
        dpr = ROW_CONFIG.dpr,



        zero_line,
        zero_text

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

        let diff = bg_config.diff
        
        //渲染0轴
        zero_line = new zrender.Line({
            shape:{
                x1 : _box_.left,
                y1 : diff.zero_axis,
                x2 : _DIFF.width - _box_.right,
                y2 : diff.zero_axis,
            },
            style: Object.assign({},ROW_CONFIG.axis.zero.lineStyle,{
                lineWidth:dpr(ROW_CONFIG.axis.zero.lineStyle.lineWidth),
                lineDash: arr_zoom({arr:ROW_CONFIG.axis.zero.lineStyle.lineDash,dpr}),
            }),
            zlevel:0
        })
        zero_text = new zrender.Rect({
            shape:{
                x:  dpr(ROW_CONFIG.axis.left.paddingLeft),
                y:  diff.zero_axis,
                width:0,
                height:0,
            },
            style:Object.assign({},ROW_CONFIG.axis.left.textStyle,{
                text:ROW_CONFIG.axis.left.formatter(0),
                fontSize:dpr(ROW_CONFIG.axis.left.textStyle.fontSize)
            }),
            zlevel:0
        })
        bg_grid.add(zero_line)
        bg_grid.add(zero_text)



        //渲染0轴以上的背景线
        for(let zu = 0; zu < diff.zero_top; zu ++){

            let y_coor = diff.zero_axis - diff.item_H * (zu + 1)// + _box_.top //计算 Y 坐标
            if(y_coor < _box_.top){
                y_coor = _box_.top
            }
        
            let top_line = new zrender.Line({
                shape:{
                    x1: _box_.left,
                    y1: y_coor,
                    x2: _DIFF.width - _box_.right,
                    y2: y_coor
                },
                style: Object.assign({},grid.horizontal.lineStyle,{
                    lineWidth: dpr(grid.horizontal.lineStyle.lineWidth),
                    lineDash: arr_zoom({arr:grid.horizontal.lineStyle.lineDash,dpr})
                }),
                zlevel:0
            })
            bg_grid.add(top_line)

            // //左侧的文字渲染
            // let text = (para / zero_axis) * _diff.max * (zu + 1)
            let text = diff.cut * (zu + 1)
            let left_text = new zrender.Rect({
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
            bg_grid.add(left_text)
        }


        //渲染 0 轴以下的背景线
        for(let zb = 0; zb < diff.zero_bottom; zb ++){
            let y_d_coor = diff.zero_axis + diff.item_H * (zb + 1)
            //贴近X轴的背景线不要渲染
            if(zb !== diff.zero_bottom - 1){
                let btm_line = new zrender.Line({
                    shape:{
                        x1: _box_.left,
                        y1: y_d_coor,
                        x2: _DIFF.width - _box_.right,
                        y2: y_d_coor
                    },
                    style: Object.assign({},grid.horizontal.lineStyle,{
                        lineWidth: dpr(grid.horizontal.lineStyle.lineWidth),
                        lineDash: arr_zoom({arr:grid.horizontal.lineStyle.lineDash,dpr})
                    }),
                    zlevel:0
                })
                bg_grid.add(btm_line)
            }
        

            //左侧的文字
            let text = diff.cut * (zb + 1) * -1
            let left_text = new zrender.Rect({
                shape : {
                    x:  dpr(ROW_CONFIG.axis.left.paddingLeft),
                    y:  y_d_coor,
                    width:0,
                    height:0,
                },
                style: Object.assign({},ROW_CONFIG.axis.left.textStyle,{
                    text:       ROW_CONFIG.axis.left.formatter(text),
                    fontSize:   dpr(ROW_CONFIG.axis.left.textStyle.fontSize)
                }),
                zlevel:0
            })
            bg_grid.add(left_text)
        } 

    }
    return bg_grid
}

export {
    render_grid
}