/**
 * 用来输出可检测到的用户配置错误
 */
let print_log = (idx) => {
    let LOG = {
        noData:'没有可以渲染的数据',
        noCol:'没有指定需要渲染的轴'
    }
    console.warn(LOG[idx])
}

export default print_log