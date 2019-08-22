import { adjacent } from '../algorithms'

/**
 * 绘制折线的转折点
 */

let render_tips_point = ({zrender,point_group,ShowConfig,index}) => {
    let _diff = ShowConfig._diff,
        all_points = _diff.all_points,
        colors = ShowConfig.colors,
        point = ShowConfig.pointer.point,
        columns = ShowConfig.columns,
        render_points = (points,pi) => {
            for(let pti in points){
                let type = (columns[pi] && columns[pi].type) ? columns[pi].type : 'line'


                //如果是柱形图则不绘制转折点
                if(type == 'bar'){
                    continue
                }

                if(pti == index){ //鼠标经过的转折点
                    if(point.hover.show === false){ 
                        //需要吧默认的点渲染出来
                        for(let iti in point.item){
                            points_default_render(point.item[iti],points[pti],pi)   
                        }
                        continue;
                    }
                    let hover_item = point.hover.item || []
                    for(let iti in hover_item){
                        points_hover_render(hover_item[iti],points[pti],pi)
                    }

                }else{//正常的转折点
                    if(point.show === false){
                        continue;
                    }
                    for(let iti in point.item){
                        points_default_render(point.item[iti],points[pti],pi)   
                    }
                }
                
            }
        },
        points_default_render = (item,position,pi) => {
            let turning_point = new zrender.Circle({
                shape : Object.assign({
                    cx:position[0],
                    cy:position[1]
                },item.shape),
                style : Object.assign({
                    fill    : colors[pi] || '#000',
                    stroke  : colors[pi] || '#000',
                },item.style)
            })
            point_group.add(turning_point)
        },
        points_hover_render = (item,position,pi) => {
            let turning_point = new zrender.Circle({
                shape : {
                    cx:position[0],
                    cy:position[1],
                    r:0,
                },
                style : Object.assign({
                    fill    : colors[pi] || '#000',
                    stroke  : colors[pi] || '#000',
                    lineWidth:0
                },item.style)
            })

            //执行一个逐渐放大的动画
            turning_point.animate('shape', false)
            .when(100, item.shape)
            .start()
            point_group.add(turning_point)
        }

    point_group.removeAll()
    for(let pi in all_points){
        let points = all_points[pi]
        render_points(points,pi)    
    }

}

//绘制指针
let pointer = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let pointer_group = new zrender.Group().dirty(),  //指针组
        point_group = new zrender.Group().dirty(),  //转折点组
        box = ShowConfig.box,
        _diff = ShowConfig._diff,
        X_Pointer,
        Y_Pointer,
        tip_box,
        before_x,
        vertical = ShowConfig.pointer.vertical,
        tip = ShowConfig.pointer.tip;

        pointer_group.dirty() //可以更新


        render_tips_point({
            pointer_group,
            ShowConfig,
            zrender,
            point_group,
            index:-1 //第几列渲染成选中
        })


        //渲染横竖线
        X_Pointer = new zrender.Line({
            shape: {
                x1 : box.left,
                y1 : box.top,
                x2 : box.left,
                y2 : _diff.height - box.bottom
            },
            style: ShowConfig.pointer.vertical.style,
            zlevel:100,
        });
        


        //渲染提示框
        tip_box = new zrender.Text({
            position:[_diff.width,_diff.height],
            style:tip.style
        })
        


        pointer_group.add(X_Pointer)
        pointer_group.add(tip_box)
        //默认隐藏
        X_Pointer.hide()
        tip_box.hide()




        //移动的时候更新线
        let up_line = (before_x) =>{
            if(vertical.show !== true){
                return
            }
            X_Pointer.animateTo({
                shape: {
                    x1 : before_x,
                    x2 : before_x,
                },
            },260,0,'quarticOut',()=>{
                console.log('动画结束')
            })
        }

        //移动的时候更新提示框
        let up_tips = (before_x,e,pp_obj) => {
            let opt_data = opction.chartData[pp_obj.index],
                text_arr = [],
                fmt_arr = [],
                columns = opction.columns;
            
            for(let ci in columns){
                text_arr.push(`{_key|${columns[ci].key} }{_val|${opt_data[columns[ci].key]}}`)
                fmt_arr.push([`${columns[ci].key}`,`${opt_data[columns[ci].key]}`])
            }


            let GET_text_arr = tip.formatter(fmt_arr)

            if(!GET_text_arr){
                GET_text_arr = text_arr
            }

            
            
            tip_box.attr({
                style:{
                    text:GET_text_arr.join('\n'),
                    textAlign:'left',
                }
            });

            //去计算位置
            let tips_BD = tip_box.getBoundingRect(),
                position_X,
                position_Y = e.offsetY


            //让提示框不要跑出折线范围以外
            if(before_x > _diff.width / 2){
                position_X = before_x - tips_BD.width - 10
            }else{
                position_X = before_x + 10
            }
            if(e.offsetY > (_diff.height - box.bottom - tips_BD.height)){
                position_Y = _diff.height - box.bottom - tips_BD.height - 10
            }else if(e.offsetY < box.top){
                position_Y = box.top + 10
            }

            tip_box.animateTo({
                position:[position_X,position_Y],
            },260,0,()=>{},true)
            
        }

    
    RAW_OBJ.on('mousemove', (e)=>{
        let x_p_x = e.offsetX
        if(x_p_x <= box.left){
            x_p_x = box.left
        }
        if(x_p_x >= (_diff.width - box.right)){
            x_p_x = _diff.width - box.right
        }


        // console.log(_diff)
        let sub_len = (_diff.width - box.left - box.right) / (opction.chartData.length - 1),
            pp_obj = adjacent(x_p_x - box.left,sub_len,_diff.all_points[0])// 当前鼠标相对画布的 X 坐标 , 横轴分段的每一段长度 , 点集合
        //何时去触发重新绘制
        if(pp_obj.position && before_x != pp_obj.position[0]){
            render_tips_point({
                pointer_group,
                ShowConfig,
                zrender,
                point_group,
                index:pp_obj.index //第几列渲染成选中
            })
            before_x = pp_obj.position[0]
            up_line(before_x)
            up_tips(before_x,e,pp_obj)
        }

        //移动的时候显示出来
        if(vertical.show === true){
            X_Pointer.show()
        }
        if(tip.show === true){
            tip_box.show()
        }
    })


    //移动端松开之后移除提示
    RAW_OBJ.on('mouseup', (e)=>{
        X_Pointer.hide()
        tip_box.hide()
        before_x = -1 //避免在下次滑动鼠标的时候只出现竖线,不出现选中的转折点
        render_tips_point({
            pointer_group,
            ShowConfig,
            zrender,
            point_group,
            index:-1 //第几列渲染成选中
        })
    })


    pointer_group.add(point_group) 
    return pointer_group
}
export {
    pointer
}