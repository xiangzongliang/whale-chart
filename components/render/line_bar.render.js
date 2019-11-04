import { break_line } from '../algorithms/break_line'
/**
 * 渲染折线图的文字
 */
let RD_chart_text = () =>{

}

/**
 * 渲染折线图的线
 * @param {*} param0 
 * 
 */
let RD_line_bar = ({ zrender, ROW_CONFIG, _DIFF, total_width, total_interval  }) => {
    let RENDER_line = new zrender.Group(),
        dpr = ROW_CONFIG.dpr,
        all_points = _DIFF.all_points || [],
        befor_deviation = 0

        for(let li in all_points){


            /**
             * 绘制折线图
             */


            if(all_points[li].type == 'line'){
                let line_opction = all_points[li].line,
                    points = all_points[li].points,
                    line_arr = break_line(points) //防止断线渲染
                for(let lir in line_arr){
                    let chart_line = new zrender.Polyline({
                        shape:{
                            points : line_arr[lir],
                            smooth : line_opction.smooth || 0
                        },
                        style: Object.assign({},line_opction.style,{
                            lineWidth: dpr(line_opction.style.lineWidth),
                        }),
                        zlevel:200
                    })
                    RENDER_line.add(chart_line)
                }
                
            }else{


            /**
             * 绘制柱状图
             */
                let bar_opction = all_points[li].bar,
                    points = all_points[li].points,
                    deviation = (total_width + total_interval) / 2

                    console.log(bar_opction,total_width)
                    befor_deviation += bar_opction.width + bar_opction.interval

                for(let bir in points){
                    if(points[bir][2] === false){ //数据正常才渲染
                        let bar_info = points[bir][3]


                        

                        let chart_bar = new zrender.Rect({
                            shape:{
                                r:0,
                                x:  points[bir][0] + (deviation - befor_deviation),
                                y:  points[bir][1],
                                width:  bar_opction.width,
                                height: bar_info._CORE.zero_axis - points[bir][1]// + 
                            },
                            style: bar_opction.style,
                            zlevel:100
                        })
                        RENDER_line.add(chart_bar)
                    }
                }

            }
        }

    return RENDER_line
}
export {
    RD_line_bar
}