
import { calc_point } from '../algorithms'
let chart_lines = (zrender,RAW_OBJ,opction,ShowConfig) =>{
    let line_group = new zrender.Group(),
        rows = opction.chartData.rows,
        box = ShowConfig.box,
        columns = opction.chartData.columns,
        all_arr = [], //所有的数据形成一个数组 求最大最小值
        all_points = [],
        _diff = {
            height : RAW_OBJ.getHeight(),
            width : RAW_OBJ.getWidth()
        } 
        /**
         * 所有线的点集合 格式 [
         *                      [[x坐标,y坐标],[0,1]], //第一条线
         *                      [[0,0.5],[0,2]]   //第二条线
         *                  ]
         *  */
    
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

        let points = calc_point({
            RAW_OBJ,
            ShowConfig,
            allarr : all_arr,
            arr : line_arr,
            total:line_arr.length,
            all_points,
            _diff
        })

        let render_line = new zrender.Polyline({
            shape:{
                points: points,
                smooth:0
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

        line_group.add(render_line)



    }


    return line_group;   
}
export {
    chart_lines
}