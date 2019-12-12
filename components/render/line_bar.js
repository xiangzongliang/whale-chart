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
let RD_line_bar = ({ zrender, ROW_CONFIG, _DIFF, total_width, total_interval, forward  }) => {
    let RENDER_line = new zrender.Group(),
        dpr = ROW_CONFIG.dpr,
        all_points = _DIFF.all_points || [],

        //这事两个特殊值
        before_seat = 0 //上一个柱形图的位移坐标 //这两个声明变量的执行是有顺序的,不可随意调动
        

        for(let li in all_points){
            /**
             * 绘制折线图
             */
            let _CORE = all_points[li]._CORE

            if(all_points[li].type == 'line'){
                let line_opction = all_points[li].line || {},
                    // line_text = line_opction.text || {},
                    // line_text_style = line_text.style || {},
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
                let bar_opction = all_points[li].bar || {},
                    bar_text = bar_opction.text || {}, //柱状图上面的文字效果
                    bar_text_style = bar_text.style || {},
                    points = all_points[li].points,
                    deviation = (total_width + total_interval) / 2,
                    setStyle = {}

                for(let bir in points){
                    let value = points[bir][3] //当前柱状图对应的(真实)值
                    //针对单个柱状图的样式控制
                    if(bar_opction.setStyle && zrender.util.isFunction(bar_opction.setStyle)){
                        setStyle = bar_opction.setStyle({
                            fill : bar_opction.style.fill,
                            index : bir * 1,
                            value,
                            zrender
                        }) || {}
                    }

                    if(points[bir][2] === false){ //数据正常才渲染
                        /**
                         * 渲染柱状
                         */
                        let chart_bar = new zrender.Rect({
                            shape:{
                                r:  bar_opction.r || 0,
                                x:  points[bir][0] - deviation + before_seat,
                                y:  points[bir][1],
                                width:  bar_opction.width,
                                height: _CORE.zero_axis - points[bir][1]// + 
                            },
                            style: Object.assign({},bar_opction.style,setStyle),
                            zlevel:100
                        })
                        RENDER_line.add(chart_bar)

                        /**
                         * 渲染柱状上面的文字
                         */
                        if(bar_text.show === true){
                            let textVerticalAlign = value > 0 ? "bottom" : "top",
                                _text = zrender.util.isFunction(bar_text.formatter) ? bar_text.formatter(value) : value,
                                rd_bar_text = new zrender.Rect({
                                    shape:{
                                        x:  points[bir][0] - deviation + before_seat + bar_opction.width / 2,
                                        y:  points[bir][1],
                                        width:0,
                                        height:0,
                                    },
                                    style: Object.assign({
                                        textFill: ROW_CONFIG.axis.bottom.text.style.textFill,
                                        text : _text,
                                        textAlign: "center",
                                        textVerticalAlign: textVerticalAlign,
                                        fontSize:dpr(12),
                                    },bar_text_style),
                                    zlevel:800,
                                    z:200
                                })
                            RENDER_line.add(rd_bar_text)
                        }                        
                    }
                }
                before_seat = before_seat + bar_opction.width + bar_opction.interval
            }
        }

    return RENDER_line
}
export {
    RD_line_bar
}