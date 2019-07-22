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
        bottom:25,
        left:60,
        right:20
    },

    //颜色数组
    colors:['#588EEB','#CCA663','#9800FF','#DF6666','#6AA84F'],

    //维度 例如 bottom 是指 底部的 X 轴 对应的 key
    dimension:{
        top:{
            key:null,
            formatter:(val,data)=>{
                return val
            },
        },
        bottom:{
            key:null,
            formatter:(val,data)=>{
                /**
                 * @val 当前列的值
                 * @data 当前列的所有值
                 */
                return val
            }
        },
        left:{
            key:null,
            formatter:(val,data)=>{
                return val
            }
        },
        right:{
            key:null,
            formatter:(val,data)=>{
                return val
            }
        }
    },

    //图表数据
    chartData:{
        //数据 array
        rows:[],
        
        /**
         * {
         *      key:'key'   //需要展示成线的
         * }
         *  */
        columns:[],
        smooth:0, //折线的光滑度 0-1
    },

    //轴线
    axis:{
        bottom:{
            show:true,
            interval:{ //间隔
                type:'all',  // 'all'    'between'    'sign' 
                sign:[]
            },
            lineStyle:{
                lineWidth:1,
                stroke:"#ccc",
                lineDash:[0],
            },
            textStyle:{
                fontWeight:300,
                fontSize:14,
                textFill:"#666666",
                textAlign: "right",
                textVerticalAlign:"bottom",
            }
        },
        zero:{
            lineStyle:{
                show:false,
                lineWidth:0.5,
                stroke:"#ccc",
                lineDash:[3,2],
            }
        },
        left:{
            lineStyle:{
                show:false,
                lineWidth:1,
                stroke:"#ccc",
                lineDash:[0],
            },
            textStyle:{
                show:true,
                fontWeight:300,
                fontSize:14,
                textFill:"#666666",
                textAlign: "right",
                textVerticalAlign:"middle"
            },
            formatter:(val)=>{
                return val
            },
        },
        render:(ctx,zrender)=>{

        }
    },

    //指针
    pointer:{
        //水平
        // horizontal:{
        //     show:false,
        //     lineStyle:{
        //         lineWidth:1,
        //         stroke:"#CCA663",
        //         lineDash:[0],
        //     }
        // },
        //垂直
        vertical:{
            show:true,
            style:{
                lineWidth:0.5,
                stroke:"#CCA663",
                lineDash:[0],
                zlevel:999,
            }
        },
        point:{//转折点
            show:true, //是否显示转折点 
            item:[{
                shape:{
                    r:2,
                },
                style:{
                    fill:'#fff',
                }
            }],

            //选中时的样式 于 point 配置相同
            hover:{
                show:true, 
                item:[{
                    shape:{
                        r:8,
                    },
                    style:{
                        opacity:0.4
                    }
                },{
                    shape:{
                        r:5,
                    },
                    style:{
                        fill:'#fff'
                    }
                },{
                    shape:{
                        r:3,
                    }
                }],
            }
        }
    },

    //提示
    tips:{
        show:true
    },

    //背景网格
    grid:{
        horizontal:{
            show:true,  //是否显示
            num:4,      //线条数量
            lineStyle:{
                lineWidth:0.5,
                stroke:"#CCCCCC",
                lineDash:[3,2],
                zlevel:10,
            }
        },
        vertical:{ //垂直背景网格线相关配置
            show:false,  //是否显示
            num:5,      //线条数量
            lineStyle:{
                lineWidth:0.5,
                stroke:"#CCCCCC",
                lineDash:[5,5],
                z:0
            }
        }
    },

    //扩展功能
    extend:(ctx,zrender)=>{

    },

    //该值是在绘图之后挂载在对象上的,禁止被修改
    _diff:{}
}

export { 
    default_config
}