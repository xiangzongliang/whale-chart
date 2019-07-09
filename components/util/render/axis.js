import { default_config } from '../default_config'
/**
 * 渲染轴线
 * @param {*} zrender 
 * @param {*} RAW_OBJ 
 * @param {*} opction 
 */
let render_axis = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let axis_group = new zrender.Group(),
        canvas_width = RAW_OBJ.getWidth(),
        canvas_height = RAW_OBJ.getHeight();

    
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
        box = ShowConfig.box;

    let btm_line = new zrender.Line({
        shape:{
            x1:box.left,
            y1:config.canvas_height - box.bottom,
            x2:config.canvas_width,
            y2:config.canvas_height - box.bottom
        },
        style:{
            stroke: "#cccccc",
            lineWidth: 1,
            lineDash: null
        }
    })
    bottom_group.add(btm_line)

    //渲染文字
    for(let rbx=0; rbx<3; rbx++){
        let textAlign = "center"
        if(rbx == 0){
            textAlign = "left"
        }
        if(rbx == 2){
            textAlign = "right"
        }

        let bottom_text = new zrender.Rect({
            shape:{
                x:rbx * config.canvas_width / 2,
                y:config.canvas_height
            },
            style:{
                text:'2019-07-08',
                fontWeight:400,
                fontSize:18,
                textFill:"#666666",
                textAlign: textAlign,
                textVerticalAlign:"bottom"

            }
        })
        bottom_group.add(bottom_text)
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
        style:{
            stroke: "#cccccc",
            lineWidth: 1,
            lineDash: null
        }
    })


    //渲染左侧文字
    let h_num = ShowConfig.grid.horizontal.num;
    for(let hi=0; hi<h_num; hi++){
        let left_text = new zrender.Rect({
            shape:{
                x:0,
                y:(config.canvas_height-box.top-box.bottom) / h_num * hi + box.top
            },
            style:{
                text:'200%',
                fontWeight:400,
                fontSize:18,
                textFill:"#666666",
                textAlign: "left",
                textVerticalAlign:"middle"

            }
        })

        left_group.add(left_text)
    }






    // left_group.add(left_line)

    return left_group

}



export {
    render_axis
}