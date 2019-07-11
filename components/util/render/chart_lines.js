
import { calc_point } from '../algorithms'
let chart_lines = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let line_group = new zrender.Group(),
        rows = opction.chartData.rows,
        columns = opction.chartData.columns,
        all_arr = []; //所有的数据形成一个数组 求最大最小值
    
    //得到所有数据要显示的集合
    for(let ci in columns){
        let key = columns[ci].key
        for(let ri in rows){
            all_arr.push(rows[ri][key])
        }
    }


    //开始渲染每一条线
    for(let r_ci in columns){
        let line_arr = [],
            key = columns[r_ci].key
        for(let r_li in rows){
            line_arr.push(rows[r_li][key])
        }

        let points = calc_point(RAW_OBJ,ShowConfig,all_arr,line_arr,line_arr.length)
        console.log(points)

        let render_line = new zrender.Polyline({
            shape:{
                points: points,
                smooth:0
            },
            style:{
                stroke:ShowConfig.colors[r_ci],
                lineWidth:1,
                z:100
            }
        })

        line_group.add(render_line)



    }


    return line_group;   
}
export {
    chart_lines
}