import { adjacent } from '../algorithms'

//绘制指针
let pointer = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let pointer_group = new zrender.Group().dirty(),
        box = ShowConfig.box,
        _diff = ShowConfig._diff,
        X_Pointer,
        Y_Pointer,
        tip_box,
        before_x;

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

        tip_box = new zrender.Text({
            position:[_diff.width,_diff.height],
            style:{
                fill:'#ff8800'
            }
        })
        pointer_group.add(X_Pointer)
        pointer_group.add(tip_box)
        //默认隐藏
        X_Pointer.hide()
        tip_box.hide()

    
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
        
        
        if(pp_obj.position && before_x != pp_obj.position[0]){
            before_x = pp_obj.position[0]
            X_Pointer.animateTo({
                shape: {
                    x1 : before_x,
                    x2 : before_x,
                },
            },300,0,'quarticOut',()=>{
                console.log('动画结束')
            })


            // console.log(tip_box.getBoundingRect())
            
            tip_box.animateTo({
                position:[before_x + 10,e.offsetY],
                style:{
                    text:['{name|何穗安堵死啊}','{hr|dhasuihd}'].join('\n'),
                    textAlign:'left',
                    textBackgroundColor:'#fff',
                    textBoxShadowColor:'#ff8800',
                    textBoxShadowBlur:3,
                    textBorderRadius:4,
                    textPadding:[10,10],
                    rich:{
                        name: {
                            fontSize: 12,
                            textFill: '#ff8800'
                        },
                        hr: {
                            width: '100%',
                            fontSize: 60,
                            borderColor: 'rgba(255,255,255,0.2)',
                            borderWidth: 0.5,
                            height: 0,
                            lineHeight: 10
                        }
                    }
                }
            },300,0,'quarticOut',()=>{
                console.log('动画结束')
            })
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

/**
 * 绘制提示框
 * @param {*} opction 
 * @param {*} opction.position [x,y] //位置信息
 * @param {*} opction.index {} //Object 对象 由 chartData.rows[index] 提供的数据
 */
let tips = (zrender,opction,RAW_OBJ)=>{
    console.log(opction)
    let tips_group = new zrender.Group().dirty(),
        tip_box = 

        tips_group.add(tip_box)
        RAW_OBJ.add(tips_group)
}




export {
    pointer
}