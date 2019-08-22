let render_line = ({ zrender, ROW_CONFIG, _DIFF }) =>{
    let line_group = new zrender.Group(),
        all_points = _DIFF.all_points,
        dpr = ROW_CONFIG.dpr
    

    for(let pi in all_points){
        if(all_points[pi].type == 'line'){
            let line = all_points[pi].line,
                render_line = new zrender.Polyline({
                shape:{
                    points : all_points[pi].points,
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

    return line_group
}
export {
    render_line
}