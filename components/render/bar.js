let render_bar = ({ zrender, ROW_CONFIG, _DIFF }) =>{
    let bar_group = new zrender.Group(),
        all_points = _DIFF.all_points,
        dpr = ROW_CONFIG.dpr,
        chartData = ROW_CONFIG.chartData,

        //这事两个特殊值
        before_seat = 0, //上一个柱形图的位移坐标 //这两个声明变量的执行是有顺序的,不可随意调动
        current_seat = 0 //当前需要的位移坐标

    for(let pi in all_points){
        if(all_points[pi].type == 'bar'){
            let bar = all_points[pi].bar,
                key = all_points[pi].key,
                points = all_points[pi].points,
                deviation = all_points[pi].deviation,
                forward = all_points[pi].forward,
                diff = all_points[pi].diff
            
                
            current_seat = bar.width / 2

            for(let bi in points){
                //绘制柱状图
                let render_bar = new zrender.Rect({
                    shape:{
                        r:0,
                        x:  points[bi][0] - current_seat + before_seat - deviation / 2 + forward,
                        y:  points[bi][1],
                        width:  bar.width,
                        height: diff.zero_axis - points[bi][1]// + 
                    },
                    style: bar.style,
                    zlevel:100
                })
                bar_group.add(render_bar)
                

                if(bar.textShow === true){
                    //绘制柱状图上的文字
                    let bar_text = chartData[bi][key],
                        text_X = points[bi][0] - current_seat + before_seat - deviation / 2 + forward + bar.width / 2,
                        text_Y = points[bi][1]

                        //对小于 0 的值显示位置发生变化
                        if(bar_text < 0){
                            text_Y = points[bi][1] + dpr(15)
                        }
                    let render_bar_text = new zrender.Rect({
                        shape:{
                            //这里的X计算需要优化
                            x: text_X,
                            y: text_Y
                        },
                        style:Object.assign({},bar.textStyle,{
                            text: bar_text,
                            textAlign:'center',
                            textPosition:[0,dpr(-15)]
                        }),
                        zlevel:500
                    })
                    bar_group.add(render_bar_text)
                }
                
            }
            before_seat = before_seat + bar.width + bar.interval
        }
    }

    return bar_group
}
export {
    render_bar
}