import { calc_point } from '../algorithms'
import { render_grid } from './grid'
import { axis_bottom } from './axis'
import { render_line } from './line'
import { render_bar } from './bar'
/**
 * 折线图和条形图的渲染统一入口 (包括混合图)
 */
let line_bar_render = ({ zrender, CHART={} ,ROW_CONFIG={} }) =>{
    let dpr = ROW_CONFIG.dpr,
        columns = ROW_CONFIG.columns || [],         //需要显示的数据 
        get_color = (index) => {
            let colors = ROW_CONFIG.colors
            return colors[(index*1) % colors.length]
        },
        get_bar = (index) => {
            return zrender.util.merge({
                //柱状图默认配置
                width:dpr(13), //默认宽度
                interval:dpr(2), //默认间隔
                textShow:true,  //是否显示柱状图的文字
                textStyle:{     //柱状图文字样式
                    textFill:'#333',
                    fontSize:dpr(12)
                },
                style:{
                    fill:get_color(index)
                },
                formatter(text){
                    return text;
                }
            },columns[index].bar || {},true)
        },
        get_line = (index) => {
            return zrender.util.merge({
                smooth:0.3,
                style:{
                    stroke:get_color(index),
                    lineWidth:1
                }
            },columns[index].line || {},true)
        },
        chartData = ROW_CONFIG.chartData || [],     //数据集合
        all_data = [],                              //所有的数据
        all_data_left = [],                         //以左侧 Y 轴为基准的数据集合 
        all_data_right = [],                        //以右侧 Y 轴为基准的数据集合
        //差异化的超级集合,禁止被修改
        _DIFF = {
            width:  CHART.getWidth(),
            height: CHART.getHeight(),
            all_points: []      //所有点的集合   包括折线图和柱状图
        },


        /**
         * 下面两个是特殊值
         */
        deviation = 0,    //当有多个柱形图时,计算出每一组柱形图的占用宽度,从而计算柱形图位移的距离
        forward = 0         //需要基于第一个绘制的柱状图偏移的中心距离


    /**
     * 分开处理所有的数据
     */
    for(let ci in columns){
        let key = columns[ci].key || '',
            type = columns[ci].type == 'bar' ? 'bar' : 'line',
            axis = columns[ci].axis == 'right' ? 'right' : 'left', //多轴使用  默认 left
            bar = get_bar(ci)

        if(axis == 'right'){
            for(let rg in chartData){
                all_data_right.push(chartData[rg][key])
            }
        }else{
            for(let lf in chartData){
                all_data_left.push(chartData[lf][key])
            }
        }
        for(let al in chartData){
            all_data.push(chartData[al][key])
        }

        //有柱状图的时候特殊处理
        if(type == 'bar'){
            deviation = deviation + bar.width + bar.interval
            forward = forward == 0 ? (bar.width + bar.interval) / 2 : forward
        }
    }


    /**
     * 开始处理需要绘制的所有点
     */
    for(let r_ci in columns){
        let cur_arr = [],
            key = columns[r_ci].key,
            type = columns[r_ci].type == 'bar' ? 'bar' : 'line',
            axis = columns[r_ci].axis == 'right' ? 'right' : 'left',
            bar = get_bar(r_ci),
            line = get_line(r_ci),
            get_point = {}


            for(let r_li in chartData){
                cur_arr.push(chartData[r_li][key])
            }


            if(axis == 'left'){
                get_point = calc_point({
                    ROW_CONFIG,
                    _DIFF,
                    allarr: all_data_left,
                    arr:    cur_arr,
                    total:  cur_arr.length,
                    deviation:deviation
                })
            }else{
                get_point = calc_point({
                    ROW_CONFIG,
                    _DIFF,
                    allarr: all_data_right,
                    arr:    cur_arr,
                    total:  cur_arr.length,
                    deviation:deviation
                })
            }

            /**
             * deviation | forward 只有在存在柱状图的时候才会有这个参数  / deviation == 历史版本的 total_width
             */
            _DIFF.all_points.push({
                type,
                axis,
                key,
                bar,
                line,
                deviation,
                forward,
                diff :          get_point.diff,
                points :        get_point.points
            })
    }


    let RD_bg = render_grid({
        zrender,
        ROW_CONFIG,
        _DIFF
    }),
    RD_axis = axis_bottom({
        zrender,
        ROW_CONFIG,
        _DIFF
    }),
    RD_line = render_line({
        zrender,
        ROW_CONFIG,
        _DIFF
    }),
    RD_bar = render_bar({
        zrender,
        ROW_CONFIG,
        _DIFF
    })





    CHART.add(RD_bg)
    CHART.add(RD_axis)
    CHART.add(RD_line)
    CHART.add(RD_bar)


}

export {
    line_bar_render
}