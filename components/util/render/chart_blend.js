
import { calc_point } from '../algorithms'
let chart_blend = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let chart_group = new zrender.Group(),
        bar_group = new zrender.Group(),
        line_group = new zrender.Group(),
        rows = opction.chartData,
        box = ShowConfig.box,
        columns = opction.columns,
        all_arr_left = [], //所有靠左侧轴的数据形成一个数组 求最大最小值
        all_arr_right = [], //所有右侧轴的数据集合
        all_points = [],
        colors = ShowConfig.colors,
        dpr = ShowConfig.dpr,
        _diff = {
            height : RAW_OBJ.getHeight(),
            width : RAW_OBJ.getWidth()
        },
        bar_default_style = {
            width:dpr(13), //默认宽度
            interval:dpr(2), //默认间隔
            textShow:true,  //是否显示柱状图的文字
            textStyle:{     //柱状图文字样式
                textFill:'#333',
                fontSize:dpr(12)
            }
        },
        total_width = 0,    //当有多个柱形图时,计算出每一组柱形图的占用宽度,从而计算柱形图位移的距离
        forward = 0         //中心点的偏移 
    
    //得到所有数据要显示的集合
    for(let ci in columns){
        let key = columns[ci].key,              //对应的Key
            bar = columns[ci].bar || {},        //柱形图配置
            type = columns[ci].type == 'bar' ? 'bar' : 'line',  //类型 line | bar
            axis = columns[ci].axis == 'right' ? 'right' : 'left', //多轴 默认为 left  右侧轴的属性为 right
            bar_style = Object.assign({},bar_default_style,bar)

        //     console.log(axis)
        // if(axis == 'right'){
        //     for(let ri in rows){
        //         all_arr_right.push(rows[ri][key])
        //     }
        // }else{
            
        // }

        for(let ri in rows){
            all_arr_left.push(rows[ri][key])
        }
        

        if(ci == 0){
            forward = (bar_style.width + bar_style.interval) / 2
        }
        if(type == 'bar'){
            total_width = total_width + bar_style.width + bar_style.interval
        }
    }



    //开始渲染柱状图
    let before_seat = 0, //上一个柱形图的位移坐标 //这两个声明变量的执行是有顺序的,不可随意调动
        current_seat = 0 //当前需要的位移坐标
    for(let r_ci in columns){
        let cur_arr = [],
            key = columns[r_ci].key,
            type = columns[r_ci].type == 'bar' ? 'bar' : 'line',
            axis = columns[r_ci].axis == 'right' ? 'right' : 'left', 
            bar = columns[r_ci].bar || {},
            line = columns[r_ci].line || {},
            smooth = (line.smooth || line.smooth === 0) ? line.smooth : 0.3,
            rd_style = Object.assign({
                style:{
                    fill:colors[r_ci] || '',
                },
            },bar_default_style,bar)


        current_seat = rd_style.width / 2
        

        for(let r_li in rows){
            cur_arr.push(rows[r_li][key])
        }
        let points = calc_point({
            RAW_OBJ,
            ShowConfig,
            allarr : all_arr_left,
            arr : cur_arr,
            total:cur_arr.length,
            all_points,
            _diff,
            deviation:total_width
        })


        if(type == 'bar'){
            for(let r_bi in points){
                //绘制柱状图
                let render_bar = new zrender.Rect({
                    shape:{
                        r:0,
                        x:points[r_bi][0] - current_seat + before_seat - total_width / 2 + forward,
                        y:points[r_bi][1],
                        width:rd_style.width,
                        height: ShowConfig._diff.zero_axis - points[r_bi][1]// + 
                    },
                    style:rd_style.style
                })
                bar_group.add(render_bar)


                if(rd_style.textShow === true){
                    //绘制柱状图上的文字
                    let render_bar_text = new zrender.Rect({
                        shape:{
                            //这里的X计算需要优化
                            x:points[r_bi][0] - current_seat + before_seat - total_width / 2 + forward + rd_style.width / 2,
                            y:points[r_bi][1]
                        },
                        style:Object.assign(rd_style.textStyle,{
                            text:rows[r_bi][key],
                            textAlign:'center',
                            textPosition:[0,dpr(-15)]
                        })
                    })
                    bar_group.add(render_bar_text)
                }
                
            }
            before_seat = before_seat + rd_style.width + rd_style.interval
        }else{
            let render_line = new zrender.Polyline({
                shape:{
                    points : points,
                    smooth : smooth
                },
                style:{
                    stroke:ShowConfig.colors[r_ci] || '#000',
                    lineWidth:dpr(1)
                },
                smoothConstraint:[
                    [box.left,box.top],
                    [_diff.width - box.right,box.top],
                    [_diff.height - box.bottom,box.left],
                    [_diff.width - box.right, _diff.height - box.bottom]
                ]//将计算出来的控制点约束在一个包围盒内
            })
            line_group.add(render_line)
        }
        


       

        
        
    }
    chart_group.add(bar_group)
    chart_group.add(line_group)

    return chart_group;   
}
export {
    chart_blend
}