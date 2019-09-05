import { break_line } from '../algorithms'
let render_line = ({ zrender, ROW_CONFIG, _DIFF }) =>{
    let line_group = new zrender.Group(),
        all_points = _DIFF.all_points,
        dpr = ROW_CONFIG.dpr
    

    for(let pi in all_points){
        if(all_points[pi].type == 'line'){
            let line = all_points[pi].line,
                points = all_points[pi].points,
                line_arr = break_line(points) //防止断线渲染

            for(let li in line_arr){
                let render_line = new zrender.Polyline({
                    shape:{
                        points : line_arr[li],
                        smooth : line.smooth
                    },
                    style: Object.assign({},line.style,{
                        lineWidth: dpr(line.style.lineWidth),
                    }),
                    zlevel:200
                })
                line_group.add(render_line)
            }
        }
    }

    return line_group
}
export {
    render_line
}