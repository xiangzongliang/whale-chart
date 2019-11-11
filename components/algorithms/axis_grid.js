
const axis_grid = ({ _CORE, ROW_CONFIG}) => {
    let _axis = [],
        formatter = ROW_CONFIG.axis.left.formatter,
        all_line = _CORE.zero_top + _CORE.zero_bottom + 1,
        max_val = _CORE.zero_top * _CORE.item_val

    
    for(let xi=0;xi<all_line;xi++){
        let text = max_val - _CORE.item_val * xi
        text = formatter(text) || text

        _axis.push({
            x:'',
            y:'',
            val: text,
            style:''
        })
    }

    
    return {
        text:_axis
    }
}
export {
    axis_grid
}