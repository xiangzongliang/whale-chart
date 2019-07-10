/**
 * //渲染背景网格
 * @param {*} zrender   //渲染器
 * @param {*} RAW_OBJ   //最终渲染实例
 * @param {*} opction   //配置
 * @param {*} ShowConfig   //最终显示的配置
 */

let render_grid = (zrender,RAW_OBJ,opction,ShowConfig) => {
    let bg_group = new zrender.Group(),
        grid_config = ShowConfig.grid,
        box = ShowConfig.box,
        next;

    //如果不用渲染
    if(opction.grid && opction.grid.show === false){
        return bg_group;
    }

    next = () =>{
        let canvas_width = RAW_OBJ.getWidth(),
            canvas_height = RAW_OBJ.getHeight(),
            line;
        


        //渲染横轴线 
        if(grid_config.horizontal.show === true){
            let HOR_style = {
                stroke: grid_config.horizontal.lineStyle.stroke,
                lineWidth: grid_config.horizontal.lineStyle.lineWidth,
                lineDash: grid_config.horizontal.lineStyle.lineDash,
            }
            for(let rxi=0; rxi<grid_config.horizontal.num; rxi++){
                line = new zrender.Line({
                    shape:{
                        x1:0 + box.left,
                        y1:(canvas_height-box.top-box.bottom) / grid_config.horizontal.num * rxi + box.top,
                        x2:canvas_width,
                        y2:(canvas_height-box.top-box.bottom) / grid_config.horizontal.num * rxi + box.top
                    },
                    style:HOR_style
                })
                bg_group.add(line)
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
                        x1:(canvas_width-box.left-box.right) / grid_config.vertical.num * vyi + box.left,
                        y1:box.top,
                        x2:(canvas_width-box.left-box.right) / grid_config.vertical.num * vyi + box.left,
                        y2:canvas_height - box.bottom,
                    },
                    style:VER_style
                })
                bg_group.add(line)
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

    

    return bg_group
}

export {
    render_grid
}



