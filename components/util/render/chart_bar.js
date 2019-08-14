
import { calc_point } from '../algorithms'
let chart_bar = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let bar_group = new zrender.Group(),
        rows = opction.chartData,
        box = ShowConfig.box,
        columns = opction.columns,
        all_arr = [], //所有的数据形成一个数组 求最大最小值
        all_points = [],
        _diff = {
            height : RAW_OBJ.getHeight(),
            width : RAW_OBJ.getWidth()
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
            line = columns[r_ci].line,
            smooth = (line && line.smooth) ? line.smooth : 0.3


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


        
        let render_bar = new zrender.Polyline({
            shape:{
                points : points,
                smooth : smooth
            },
            style:{
                stroke:ShowConfig.colors[r_ci],
                lineWidth:1,
                z:100
            },
            smoothConstraint:[
                [box.left,box.top],
                [_diff.width - box.right,box.top],
                [_diff.height - box.bottom,box.left],
                [_diff.width - box.right, _diff.height - box.bottom]
            ]//将计算出来的控制点约束在一个包围盒内
        })
        bar_group.add(render_bar)
    }


    return bar_group;   
}
export {
    chart_bar
}