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
        x


        if(min_length > max_length){
            text_max_length = min_length
        }

        //通过文字的长度计算向右偏移的位置
        x = text_max_length * ROW_CONFIG.axis.left.textStyle.fontSize / 2 + ROW_CONFIG.axis.left.paddingLeft + _box_.left

    let render_text = ({text,y}) => {
        let left_axis = new zrender.Rect({
            shape:{
                x: x,
                y: y,
                width:0,
                height:0,
            },
            style: Object.assign({},ROW_CONFIG.axis.left.textStyle,{
                text:text
            },{
                fontSize: dpr(ROW_CONFIG.axis.left.textStyle.fontSize)
            }),
            zlevel:0
        })
        RENDER_left_axis.add(left_axis)
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


    return {
        RENDER_left_axis,  //可以被zrender渲染的组
        text_max_length,        //在未处理的情况下,最大文字长度
        X_left:x,               //向左偏移的距离
    }
}







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
        x


        if(min_length > max_length){
            text_max_length = min_length
        }

        //通过文字的长度计算向右偏移的位置
        x = _DIFF.width - (text_max_length * ROW_CONFIG.axis.right.textStyle.fontSize / 2 + ROW_CONFIG.axis.right.paddingRight ) - _box_.right

    let render_text = ({text,y}) => {
        let left_axis = new zrender.Rect({
            shape:{
                x: x,
                y: y,
                width:0,
                height:0,
            },
            style: Object.assign({},ROW_CONFIG.axis.right.textStyle,{
                text:text
            },{
                fontSize: dpr(ROW_CONFIG.axis.right.textStyle.fontSize)
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

    return {
        RENDER_right_axis,  //可以被zrender渲染的组
        // text_max_length,        //在未处理的情况下,最大文字长度
        X_right: _DIFF.width - x,               //向左偏移的距离
    }
}






let RD_bottom_axis = () => {

}

let RD_top_axis = () => {

}

export {
    RD_left_axis,
    RD_right_axis,
    RD_bottom_axis,
    RD_top_axis
}