//核心渲染函数


//折线图
import { render_axis } from './render/axis' //渲染轴
import { render_grid } from './render/grid' //渲染背景网格
import { chart_lines } from './render/chart_lines' //渲染折线图
import { chart_blend } from './render/chart_blend' //渲染条形图
import { pointer } from './render/pointer' //轴线指针


//饼图
import { cake } from './render/cake'

export {
    render_grid,
    render_axis,
    chart_lines,
    chart_blend,
    pointer,
    cake
}
