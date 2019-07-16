//核心渲染函数

import { render_axis } from './render/axis' //渲染轴
import { render_grid } from './render/grid' //渲染背景网格
import { chart_lines } from './render/chart_lines' //渲染折线图
import { pointer } from './render/pointer' //轴线指针

export {
    render_grid,
    render_axis,
    chart_lines,
    pointer
}

