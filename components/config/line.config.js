let line_config = {
    //图表盒子模型
    box:{
        top:30,
        bottom:30,
        left:30,
        right:20
    },
    //颜色数组
    colors:['#CCA663','#DF6666','#588EEB','#6AA84F','#9800FF'],
    //轴线
    axis:{
        // [ line | bar ]
        bottom:{
            interval:{ //间隔
                type:'all',  // 'all'    'between'
            },
            lineStyle:{
                lineWidth:0.5,
                stroke:"#ccc",
                lineDash:[0],
            },
            textStyle:{
                fontWeight:400,
                fontSize:12,
                textFill:"#666666",
                // textAlign: "right", //无效
                textVerticalAlign:"bottom",
            },
            formatter(text,data){
                return text
            }
        },
        // [ line | bar ]
        left:{
            paddingLeft:0,
            textStyle:{
                fontWeight:400,
                fontSize:12,
                textFill:"#666666",
                textAlign: "right",
                textVerticalAlign:"middle"
            },
            formatter:(val)=>{
                return val
            },
        },
        // [ line | bar ] //适合双轴
        right:{
            paddingRight:10,
            // lineStyle:{
            //     show:false,
            //     lineWidth:1,
            //     stroke:"#ccc",
            //     lineDash:[0],
            // },
            textStyle:{
                fontWeight:400,
                fontSize:12,
                textFill:"#666666",
                textAlign: "left",
                textVerticalAlign:"middle"
            },
            formatter:(val)=>{
                return val
            },
        },
        // render:(ctx,zrender)=>{

        // }
    },
    //背景网格 [ line | bar ]
    grid:{
        show:true,
        horizontal:{ //水平背景线
            show:true,  //是否显示
            num:4,      //线条数量
            lineStyle:{
                lineWidth:0.5,
                stroke:"#CCCCCC",
                lineDash:[5,3],
            }
        }
    },
    //指示器
    pointer:{
        //垂直 [ line | K ]
        vertical:{
            show:true,
            style:{
                lineWidth:0.5,
                stroke:"#CCA663",
                lineDash:[0],
            }
        },
        //折线图的转折点 [ line ]
        point:{
            show:true, //是否显示转折点 
            item:[{
                shape:{
                    r:0,
                },
                style:{
                    fill:'#fff',
                    lineWidth:1,
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
        },
        //提示 [ all ]
        tip:{
            show:true,
            // formatter(text,data){
            //     return text
            // },
            style:{
                textBackgroundColor:'rgba(0,0,0,0.5)',
                textBorderColor:'rgba(153, 153, 153, 0.25)',
                textBorderWidth:1,
                textBoxShadowBlur:3,
                textBorderRadius:2,
                textPadding:[10,20],
                rich({dpr ,arr_zoom}){
                    return {
                        _key:{
                            fontSize:dpr(14),
                            textFill:'#fff',
                            fontWeight:400
                        },
                        _val:{
                            textPadding: arr_zoom({
                                arr:[0,0,0,10],
                                dpr
                            }),
                            textFill:'#fff',
                            fontSize:dpr(14),
                            fontWeight:400
                        }
                    }
                }
            }
        }
    },
    event:{
        pointer:{
            //指示器更新之后回调
            update:(opction)=>{}
        },
        //图表被按下
        touchstart(){},
        //图表松开
        touchend(){},
        //图表渲染之前
        start(){},
        //图表渲染结束
        end(){},
        //图表被更新
        update(){} 
    }

}
export {
    line_config
}