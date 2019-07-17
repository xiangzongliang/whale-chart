import { adjacent } from '../algorithms'

/**
 * 提示的文字
 */
let tips_text = () => {

}

//绘制指针
let pointer = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let pointer_group = new zrender.Group().dirty(),
        box = ShowConfig.box,
        _diff = ShowConfig._diff,
        X_Pointer,
        Y_Pointer,
        tip_box,
        before_x;



        //渲染横竖线
        X_Pointer = new zrender.Line({
            shape: {
                x1 : box.left,
                y1 : box.top,
                x2 : box.left,
                y2 : _diff.height - box.bottom
            },
            style: ShowConfig.pointer.vertical.lineStyle,
            zlevel:100,
        });


        //渲染提示框
        tip_box = new zrender.Text({
            position:[_diff.width,_diff.height],
            style:{
                textBackgroundColor:'rgba(255,255,255,0.94)',
                textBorderColor:'rgba(153, 153, 153, 0.25)',
                textBorderWidth:1,
                textBoxShadowBlur:3,
                textBorderRadius:4,
                textPadding:[10,10],
                rich:{
                    _title:{

                    },
                    _key:{
                        fontSize:14,
                        textFill:'#666',
                        fontWeight:400
                    },
                    _val:{
                        textPadding:[0,0,0,10],
                        textFill:'#333',
                        fontSize:14,
                        fontWeight:400
                    }
                }
            }
        })
        pointer_group.add(X_Pointer)
        pointer_group.add(tip_box)
        //默认隐藏
        X_Pointer.hide()
        tip_box.hide()



        //移动的时候更新线
        let up_line = (before_x) =>{
            X_Pointer.animateTo({
                shape: {
                    x1 : before_x,
                    x2 : before_x,
                },
            },300,0,'quarticOut',()=>{
                console.log('动画结束')
            })
        }

        //移动的时候更新提示框
        let up_tips = (before_x,e,pp_obj) => {
            let opt_data = opction.chartData.rows[pp_obj.index],
                text_arr = [],
                columns = opction.chartData.columns;
            
            for(let ci in columns){
                text_arr.push(`{_key|${columns[ci].key} }{_val|${opt_data[columns[ci].key]}}`)
            }
            
            
            tip_box.attr({
                style:{
                    text:text_arr.join('\n'),
                    textAlign:'left',
                }
            });
            tip_box.animateTo({
                position:[before_x + 10,e.offsetY],
            },300,0,()=>{},true)
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
        let sub_len = (_diff.width - box.left - box.right) / (opction.chartData.rows.length - 1),
            pp_obj = adjacent(x_p_x - box.left,sub_len,_diff.points)
        
        //何时去触发重新绘制
        if(pp_obj.position && before_x != pp_obj.position[0]){
            before_x = pp_obj.position[0]
            up_line(before_x)
            up_tips(before_x,e,pp_obj)
        }

        //移动的时候显示出来
        X_Pointer.show()
        tip_box.show()
    })


    //移动端松开之后移除提示
    RAW_OBJ.on('mouseup', (e)=>{
        X_Pointer.hide()
        tip_box.hide()
    })



    return pointer_group
}





export {
    pointer
}