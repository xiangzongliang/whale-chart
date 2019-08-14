import { sign_num } from '../algorithms'
/**
 * //渲染背景网格
 * @param {*} zrender   //渲染器
 * @param {*} RAW_OBJ   //最终渲染实例
 * @param {*} opction   //配置
 * @param {*} ShowConfig   //最终显示的配置
 */
let render_grid = (zrender,RAW_OBJ,opction,ShowConfig) => {
    let bg_group = new zrender.Group(),
        line_group = new zrender.Group(),
        axis_group = new zrender.Group(),
        grid_config = ShowConfig.grid,
        box = ShowConfig.box,
        next,
        _diff = ShowConfig._diff,
        zero_axis = _diff.zero_axis, //0 轴
        horizontal_num = grid_config.horizontal.num; //横线背景分段

    //如果不用渲染
    if(opction.grid && opction.grid.show === false){
        return bg_group;
    }

    let para = _diff.para,
        top_line =  _diff.zero_top, //parseInt(zero_axis / para), //0 轴以上线条数
        bottom_line = _diff.all_line - top_line // parseInt((_diff.height - box.bottom - zero_axis) / para)//0 轴以下线条数

    next = () =>{
        let line,   //背景网格线
            left_text, //左侧的轴文字
            zero_line,  // 0 轴
            zero_text,  // 0轴文字
            Y_left_formatter = ShowConfig.axis.left.formatter

            // if(ShowConfig.axis.left.formatter && zrender.util.isFunction(ShowConfig.axis.left.formatter)){
            //     Y_left_formatter = 
            // }

        


        //渲染横轴线 
        if(grid_config.horizontal.show === true){
            //渲染 0 轴以上的背景线 和文字
            for(let zu = 0; zu < top_line; zu ++){

                let y_coor = zero_axis - para * (zu + 1)// + box.top //计算 Y 坐标
                if(y_coor < box.top){
                    y_coor = box.top
                }
                
                line = new zrender.Line({
                    shape:{
                        x1: box.left,
                        y1: y_coor,
                        x2: _diff.width - box.right,
                        y2: y_coor
                    },
                    style:grid_config.horizontal.lineStyle
                })
                line_group.add(line)

                //左侧的文字渲染
                // 计算左侧的文字
                // let text = (para / zero_axis) * _diff.max * (zu + 1)
                let text = _diff.cut * (zu + 1)
                left_text = new zrender.Rect({
                    shape:{
                        x:ShowConfig.axis.left.paddingLeft,
                        y:y_coor,
                        width:0,
                        height:0,
                    },
                    style: Object.assign(ShowConfig.axis.left.textStyle,{
                        text:Y_left_formatter(text),
                    })
                })
                line_group.add(left_text)
            }


            //渲染 0 轴
            zero_line = new zrender.Line({
                shape:{
                    x1 : box.left,
                    y1 : zero_axis,
                    x2 : _diff.width - box.right,
                    y2 : zero_axis,
                },
                style:ShowConfig.axis.zero.lineStyle
            })
            zero_text = new zrender.Rect({
                shape:{
                    x:ShowConfig.axis.left.paddingLeft,
                    y:zero_axis,
                    width:0,
                    height:0,
                },
                style:Object.assign(ShowConfig.axis.left.textStyle,{
                    text:Y_left_formatter(sign_num(0)),
                })
            })
            axis_group.add(zero_line)
            axis_group.add(zero_text)



            //渲染 0 轴以下的背景线
            for(let zb = 0; zb < bottom_line; zb ++){


                //贴近X轴的背景线不要渲染
                if(zb !== bottom_line-1){
                    let y_d_coor = zero_axis + para * (zb + 1)
                    line = new zrender.Line({
                        shape:{
                            x1: box.left,
                            y1: y_d_coor,
                            x2: _diff.width - box.right,
                            y2: y_d_coor
                        },
                        style:grid_config.horizontal.lineStyle
                    })
                    line_group.add(line)
                }
                

                //左侧的文字
                let text = _diff.cut * (zb + 1) * -1
                left_text = new zrender.Rect({
                    shape : {
                        x:ShowConfig.axis.left.paddingLeft,
                        y:zero_axis + para * (zb + 1),
                        width:0,
                        height:0,
                    },
                    style : Object.assign(ShowConfig.axis.left.textStyle,{
                        text:Y_left_formatter(text),
                    })
                })
                line_group.add(left_text)
            } 

        }
        


    
        //渲染纵轴线
        if(grid_config.vertical.show === true){
            let VER_style = {
                stroke: grid_config.vertical.lineStyle.stroke,
                lineWidth: grid_config.vertical.lineStyle.lineWidth,
                lineDash: grid_config.vertical.lineStyle.lineDash
            }
            for(let vyi=0; vyi<grid_config.vertical.num; vyi++){
                if(vyi == 0){
                    continue;
                }
                line = new zrender.Line({
                    shape:{
                        x1:(_diff.width-box.left-box.right) / grid_config.vertical.num * vyi + box.left,
                        y1:box.top,
                        x2:(_diff.width-box.left-box.right) / grid_config.vertical.num * vyi + box.left,
                        y2:canvas_height - box.bottom,
                    },
                    style:VER_style
                })
                line_group.add(line)
            }
        }
    }



    //自定义渲染
    if(opction.grid && zrender.util.isFunction(opction.grid.render)){
        opction.grid.render({
            group : bg_group,       //渲染组
            canvas : RAW_OBJ,       //画布
            config : ShowConfig,    //生成的全部配置
            next : next
        },zrender)
    }else{ //默认渲染
        next() 
    }

    
    bg_group.add(line_group)
    bg_group.add(axis_group)

    return bg_group
}

export {
    render_grid
}



