
import { calc_point } from '../algorithms'
let chart_bar = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let bar_group = new zrender.Group(),
        rows = opction.chartData,
        box = ShowConfig.box,
        columns = opction.columns,
        all_arr = [], //所有的数据形成一个数组 求最大最小值
        all_points = [],
        colors = ShowConfig.colors,
        _diff = {
            height : RAW_OBJ.getHeight(),
            width : RAW_OBJ.getWidth()
        },
        bar_default_style = {
            width:20, //默认宽度
            interval:10, //默认间隔
            style:{

            }
        }
    
    //得到所有数据要显示的集合
    for(let ci in columns){
        let key = columns[ci].key
        for(let ri in rows){
            all_arr.push(rows[ri][key])
        }
    }


    //开始渲染柱状图
    for(let r_ci in columns){
        let bar_arr = [],
            key = columns[r_ci].key,
            bar = columns[r_ci].bar || {}

        Object.assign(bar_default_style,bar)


        for(let r_li in rows){
            bar_arr.push(rows[r_li][key])
        }
        let points = calc_point({
            RAW_OBJ,
            ShowConfig,
            allarr : all_arr,
            arr : bar_arr,
            total:bar_arr.length,
            all_points,
            _diff
        })

        console.log(points)

        for(let r_bi in points){
            let render_bar = new zrender.Rect({
                shape:{
                    r:0,
                    x:points[r_bi][0] - bar_default_style.width / 2,
                    y:points[r_bi][1],
                    width:bar_default_style.width,
                    height: ShowConfig._diff.zero_axis - points[r_bi][1]// + 
                },
                style:bar_default_style.style
            })

            bar_group.add(render_bar)
        }

        
        
    }


    return bar_group;   
}
export {
    chart_bar
}
    
