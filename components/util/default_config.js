/**
 * 默认配置文件
 */
let default_config = {
    init:{
        renderer:'canavs',
        devicePixelRatio:2,
        width: 'auto',
        height: 400,
        autoWidth:false, //当浏览器窗口宽度发生变化时,图表宽度自动变化 默认 false 当宽度值为auto的时候该属性生效
    },

    box:{
        top:20,
        bottom:30,
        left:60,
        right:0
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
            }
        }
    }
}

export { 
    default_config
}