import { core_line_bar } from '../algorithms/core'
import { arr_zoom } from '../algorithms/arr_zoom'
import { point_line_bar } from '../algorithms/point_line_bar'
import { axis_grid } from '../algorithms/axis_grid'



//RENDER 
import { RD_left_axis, RD_right_axis, RD_bottom_axis } from '../render/axis'
import { RD_grid } from '../render/grid'
import { RD_line_bar } from './line_bar.render'
import { RD_pointer } from './pointer'
let line_bar_render = ({ zrender, CHART, ROW_CONFIG, REFS }) =>{
    //判断是否渲染
    if(ROW_CONFIG.chartData && ROW_CONFIG.chartData.length<=0){
        console.error('no data')
        return;
    }

    if(ROW_CONFIG.columns && ROW_CONFIG.columns.length<=0){
        console.error('no columns')
        return;
    }



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
                    textFill:'#666',
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
        _DIFF = {
            width:  CHART.getWidth(),
            height: CHART.getHeight(),
            all_points: [],      //所有点的集合   包括折线图和柱状图
            left_axis_points: [],   //基于左侧轴的所有点的集合
            right_axis_points:[],    //基于右侧点的所有点的集合
        },
        _box_ = arr_zoom({
            arr:ROW_CONFIG.box,
            dpr:ROW_CONFIG.dpr
        }),
        bar_total_width = 30,    //用于记录带有柱状图的混合图中,单列柱状图占用的总宽度
        bar_total_interval = 0  //同上//---记录总间隔宽度
        // _RENDER = {} //输出到渲染层的对象  废弃



        /**
         * 重新赋值 box 这将对不同机型兼容计算有好处
         */
        ROW_CONFIG._box_ = _box_

        


        let last_interval = 0, //用于记录最后一个间隙值 
            forward = 0         //需要基于第一个绘制的柱状图偏移的中心距离  //这是个很重要的值

        // 统计出左、右两侧的点集合,整体数据统计
        for(let ci in columns){
            let key = columns[ci].key || '',
                axis = columns[ci].axis == 'right' ? 'right' : 'left',
                type = columns[ci].type == 'bar' ? 'bar' : 'line',
                bar = get_bar(ci)


            /**
             * 用于记录如果有柱状图,则需要在绘制的时候进行左右两端收缩绘制,
             * 不能将图表绘制到区域外面
             */
            if(type == 'bar'){
                bar_total_width += bar.width
                bar_total_interval += bar.interval
                //注意⚠️最后一列柱状图的间隔不用处理
                last_interval = bar.interval //重新负值 定义为最后一个间隙值

                forward = forward == 0 ? bar.width / 2 : forward
            }
            



            
            /**
             * 得到所有数据,进行数据分析
             * 计算坐标点
             */
            for(let di in chartData){
                if(axis == 'right'){
                    all_data_right.push(chartData[di][key])
                }else{
                    all_data_left.push(chartData[di][key])
                }
                all_data.push(chartData[di][key])
            }
        }



        bar_total_interval = bar_total_interval - last_interval

        //进入核心算法
        let _CORE_left,_CORE_right
        if(all_data_left.length > 0){
            _CORE_left = core_line_bar({
                ROW_CONFIG,
                _DIFF,
                arr:all_data_left
            })
        }
        if(all_data_right.length > 0){
            _CORE_right = core_line_bar({
                ROW_CONFIG,
                _DIFF,
                arr:all_data_right
            })
        }
        





        //渲染左侧的轴 得到左侧的偏移
        let { 
            RENDER_left_axis,
            X_left
        } = RD_left_axis({
            zrender,
            _CORE:_CORE_left,
            ROW_CONFIG
        })

        //渲染右侧的轴 得到右侧的偏移
        let { 
            RENDER_right_axis,
            X_right
        } = _CORE_right ? RD_right_axis({
            zrender,
            _CORE:_CORE_right,
            ROW_CONFIG,
            _DIFF
        }) : {
            RENDER_right_axis:new zrender.Group(),
            X_right:0
        }



        //渲染背景网格
        let {
            RENDER_grid
        } = RD_grid({
            zrender,
            _CORE:_CORE_left,
            ROW_CONFIG,
            X_left,
            X_right,
            _DIFF
        })







        for(let d_ci in columns){
            let cur_arr = [],
                key = columns[d_ci].key,
                type = columns[d_ci].type == 'bar' ? 'bar' : 'line',
                axis = columns[d_ci].axis == 'right' ? 'right' : 'left',
                bar = get_bar(d_ci),
                line = get_line(d_ci),
                left_point = {},
                right_point = {},

                //计算折线图点的基本配置
                calc_line_opction = {
                    ROW_CONFIG,
                    _DIFF,
                    X_left,
                    X_right
                }


                for(let r_li in chartData){
                    // console.log(chartData[r_li])
                    cur_arr.push(chartData[r_li][key])
                }

                /**
                 * 依赖左侧轴线的图
                 */
                if(axis == 'left'){

                    left_point = point_line_bar(Object.assign({},calc_line_opction,{
                        all :           all_data_left,
                        arr :           cur_arr,
                        _CORE :         _CORE_left,
                        total_width :   bar_total_width,
                        total_interval :bar_total_interval
                    }))

                    _DIFF.all_points.push({
                        points:left_point,
                        type,
                        axis,
                        bar,
                        line
                    })
                /**
                 * 依赖右侧轴线的图
                 */
                }else{
                    right_point = point_line_bar(Object.assign({},calc_line_opction,{
                        all :           all_data_right,
                        arr :           cur_arr,
                        _CORE :         _CORE_right,
                        total_width :   bar_total_width,
                        total_interval :bar_total_interval
                    }))

                    _DIFF.all_points.push({
                        points:right_point,
                        type,
                        axis,
                        bar,
                        line
                    })
                }


                
        }

        let RENDER_line_bar = RD_line_bar({
            _DIFF,
            zrender,
            ROW_CONFIG,
            total_width :   bar_total_width,
            total_interval :bar_total_interval,
            forward
        })



        //渲染折线图的指示器
        let RENDER_pointer = RD_pointer({
            zrender,
            _DIFF,
            ROW_CONFIG,
            get_color,
            REFS
        })


        //渲染折线图的底部轴
        let RENDER_bottom_axis = RD_bottom_axis({
            zrender,
            _DIFF,
            ROW_CONFIG,
            X_left,
            X_right,
        })



        CHART.add(RENDER_left_axis)     //渲染左侧轴
        CHART.add(RENDER_right_axis)    //渲染右侧轴
        CHART.add(RENDER_bottom_axis)    //渲染右侧轴
        CHART.add(RENDER_grid)          //渲染背景网格
        CHART.add(RENDER_line_bar)      //渲染折线图 和 柱状图  集合
        CHART.add(RENDER_pointer)       //渲染折线图的点集合、指示器、部分响应事件
}
export {
    line_bar_render
}