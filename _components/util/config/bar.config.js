let bar_config = (D) => {
    return {
        //图表盒子模型
        box:{
            top:30,
            bottom:25,
            left:60,
            right:20
        },
        //颜色数组
        colors:['#588EEB','#CCA663','#9800FF','#DF6666','#6AA84F'],
            //维度 例如 bottom 是指 底部的 X 轴 对应的 key
        dimension:{
            // top:{
            //     key:null,
            //     formatter:(val,data)=>{
            //         return val
            //     },
            // },
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
            // left:{
            //     key:null,
            //     formatter:(val,data)=>{
            //         return val
            //     }
            // },
            // right:{
            //     key:null,
            //     formatter:(val,data)=>{
            //         return val
            //     }
            // }
        },
        //轴线
        axis:{
            // [ line | bar ]
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
                },
                formatter(text,data){
                    return text
                }
            },
            // [ line | bar ]
            zero:{
                // show:true,
                lineStyle:{
                    lineWidth:0.5,
                    stroke:"#ccc",
                    lineDash:[3,2],
                }
            },
            // [ line | bar ]
            left:{
                paddingLeft:35,
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
            // [ line | bar ] //适合双轴
            right:{
                show:true,
                line:{
                    show:true,
                    style:{

                    }
                },
                text:{
                    show:true,
                    style:{

                    }
                }
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
            //垂直 [ line | K ]
            vertical:{
                show:true,
                style:{
                    lineWidth:0.5,
                    stroke:"#CCA663",
                    lineDash:[0],
                    zlevel:999,
                }
            },
            //折线图的转折点 [ line ]
            point:{
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
            },
    
            //提示 [ all ]
            tip:{
                show:false,
                formatter(text,data){
                    return text
                },
                style:{
                    textBackgroundColor:'rgba(0,0,0,0.5)',
                    textBorderColor:'rgba(153, 153, 153, 0.25)',
                    textBorderWidth:1,
                    textBoxShadowBlur:3,
                    textBorderRadius:2,
                    textPadding:[10,20],
                    rich:{
                        _title:{
    
                        },
                        _key:{
                            fontSize:14,
                            textFill:'#fff',
                            fontWeight:400
                        },
                        _val:{
                            textPadding:[0,0,0,10],
                            textFill:'#fff',
                            fontSize:14,
                            fontWeight:400
                        }
                    },
                    zlevel:1000,
                }
            }
    
        },
    
        //背景网格 [ line | bar ]
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
    }
}


export { 
    bar_config
}