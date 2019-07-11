/**
 * 默认配置文件
 */
let default_config = {
    //这是一个计算公式 将所有配置的值经过计算 得出 px 的单位 
    toPX:(val)=>{
        return val
    },
    //初始化配置
    init:{
        renderer:'canavs',
        devicePixelRatio:2,
        width: 'auto',
        height: 300,
        autoWidth:false, //当浏览器窗口宽度发生变化时,图表宽度自动变化 默认 false 当宽度值为auto的时候该属性生效
    },
    //图表盒子模型
    box:{
        top:20,
        bottom:30,
        left:60,
        right:0
    },
    //颜色数组
    colors:['#EF5A3C','#029A01','#A0A0A0'],
    //图表数据
    chartData:{
        rows:[],
        columns:[]
    },

    //轴线
    axis:{
        X:{
            bottom:{
                show:true,
                interval:{ //间隔
                    type:'between',  // 'all'   3   'between'   'sign'  // 'auto'
                    sign:[]
                },
                formatter:(val)=>{
                    return val
                },
                lineStyle:{
                    lineWidth:3,
                    stroke:"#ff8800",
                    lineDash:[0],
                },
                textStyle:{

                }
            }
        },
        Y:{},
        render:(ctx,zrender)=>{

        }
    },

    //背景网格
    grid:{
        horizontal:{
            show:true,  //是否显示
            num:5,      //线条数量
            lineStyle:{
                lineWidth:1,
                stroke:"#CCCCCC",
                lineDash:[6,4],
            }
        },
        vertical:{ //垂直背景网格线相关配置
            show:false,  //是否显示
            num:5,      //线条数量
            lineStyle:{
                lineWidth:1,
                stroke:"#CCCCCC",
                lineDash:[5,5],
                z:0
            }
        }
    },

    //该值是在绘图之后挂在在对象上的,禁止被修改
    _diff:{}
}

export { 
    default_config
}