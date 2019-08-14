/**
 * 渲染轴线
 * @param {*} zrender 
 * @param {*} RAW_OBJ 
 * @param {*} opction 
 */
let render_axis = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let axis_group = new zrender.Group(),
        _diff = ShowConfig._diff,
        canvas_width = _diff.width,
        canvas_height = _diff.height;

    
    //渲染底部的轴和文字
    let RD_bottom_G = render_bottom(zrender,RAW_OBJ,opction,{
        canvas_width,
        canvas_height
    },ShowConfig)

    //渲染左侧的轴和文字
    let RD_left_G = render_left(zrender,RAW_OBJ,opction,{
        canvas_width,
        canvas_height
    },ShowConfig)

    axis_group.add(RD_left_G)
    axis_group.add(RD_bottom_G)
    return axis_group
}




/**
 * 渲染底部
 */
let render_bottom = (zrender,RAW_OBJ,opction,config,ShowConfig) =>{
    let bottom_group = new zrender.Group(),
        box = ShowConfig.box,
        x_buttom = ShowConfig.axis.bottom,
        _diff = ShowConfig._diff,
        zero_axis = _diff.zero_axis,
        formatter_bottom = ShowConfig.axis.bottom.formatter

        //X 轴
    let btm_line = new zrender.Line({
        shape:{
            x1:box.left,
            y1:config.canvas_height - box.bottom + 1,
            x2:config.canvas_width - box.right,
            y2:config.canvas_height - box.bottom + 1
        },
        style:x_buttom.lineStyle
    })
    bottom_group.add(btm_line)




    //渲染 X 轴底部的文字
    let bottom_text_arr = [],
        data_list = opction.chartData,
        key = ShowConfig.dimension.bottom.key,
        type = ShowConfig.axis.bottom.interval.type,
        render_text = (shape,style) =>{

            let bottom_text = new zrender.Rect({
                shape:Object.assign({
                    y:config.canvas_height
                },shape),
                style: Object.assign(ShowConfig.axis.bottom.textStyle,style)
            })
            bottom_group.add(bottom_text)
        }
    
    if(key){
        for(let di in data_list){
            bottom_text_arr.push(data_list[di][key])
        }
    }


    if(type == 'all'){ //全部显示
        let textAlign = 'center';
        for(let rbx=0; rbx < bottom_text_arr.length; rbx++){
            
            if(rbx == 0){
                textAlign = 'left'
            }else if(rbx == bottom_text_arr.length-1){
                textAlign = 'right'
            }else{
                textAlign = 'center'
            }
            render_text({
                x: rbx * (config.canvas_width - box.left - box.right) / (bottom_text_arr.length - 1) + box.left
            },{
                text: formatter_bottom(bottom_text_arr[rbx],data_list[rbx]),
                textAlign : textAlign
            })           
        }
    }else if(type == 'between'){ //只显示两端
        for(let rbx=0; rbx < 2; rbx++){
            if(rbx == 0){
                render_text({
                    x: rbx * (config.canvas_width - box.left - box.right) / (bottom_text_arr.length - 1) + box.left
                },{
                    text:formatter_bottom(bottom_text_arr[0],data_list[rbx]),
                    textAlign : 'left'
                })
            }else if(rbx == 1){
                render_text({
                    x: config.canvas_width - box.right
                },{
                    text: formatter_bottom(bottom_text_arr[bottom_text_arr.length-1],data_list[rbx]),
                    textAlign : 'right'
                })
            }

                       
        }
    }


    return bottom_group
}

/**
 * 渲染左侧
 */
let render_left = (zrender,RAW_OBJ,opction,config,ShowConfig) =>{
    let left_group = new zrender.Group(),
        box = ShowConfig.box;
    let left_line = new zrender.Line({
        shape:{
            x1:box.left,
            y1:box.top,
            x2:box.left,
            y2:config.canvas_height - box.bottom
        },
        style : ShowConfig.axis.left.lineStyle
    })


    




    // left_group.add(left_line)

    return left_group

}



export {
    render_axis
}