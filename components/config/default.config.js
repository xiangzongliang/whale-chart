/**
 * 默认配置文件
 */
let default_config = {
    //这是一个计算公式 将所有配置的值经过计算 得出 px 的单位 
    dpr:(val)=>{
        if(typeof val === 'number'){
            return val*dpr
        }else{
            let n_val = val * 1
            if(isNaN(n_val)){
                return val
            }else{
                return n_val*dpr
            }
        } 
    },

    //初始化配置
    init:{
        renderer:'canvas',
        devicePixelRatio:4,
        width: 'auto',
        height: 300,
        autoWidth:false, //当浏览器窗口宽度发生变化时,图表宽度自动变化 默认 false 当宽度值为auto的时候该属性生效
    },
    columns:[],
    //图表数据
    chartData:[],

    //提示
    // tips:{
    //     show:true
    // },

    //扩展功能
    // extend:(ctx,zrender)=>{},

    //该值是在绘图之后挂载在对象上的,禁止被修改
    _diff:{}
}

export { 
    default_config
}