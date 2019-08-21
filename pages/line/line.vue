<template>
    <div>
        <lineChart class="line" :opction="chartOpction"/>
        <bar-chart :opction="barOpction"/>
        <cakeChart class="cake" :opction="cakeOpction"/>
        
        <!-- <lineChart class="line" :opction="chartOpction_two"/> -->
    </div>
</template>
<script>
import lineChart from '@/components/line.vue'
import barChart from '@/components/bar.vue'
import cakeChart from '@/components/cake.vue'
export default {
    data(){
        return {
            barOpction:{
                box:{
                    left:30,
                    bottom:40
                },
                colors:['#EDD095','#ACC4F0','#FF9800','#CCA663'],
                //维度
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                //指针
                pointer:{
                    vertical:{
                        show:true,
                    },
                    tip:{
                        show:false,
                        formatter(text,data){
                            // return text
                        }
                    },
                    point:{//转折点
                        show:true, //是否显示转折点 
                        item:[{
                            shape:{
                                r:3,
                            },
                            style:{
                                // fill:'#fff',
                            }
                        }],
                    }
                },
                columns:[{
                    key:'key',//需要展示成线的key
                    type:'bar',
                    axis:'right',    //双轴时使用  默认 left  | right
                    bar:{
                        // width:30,    //宽度
                        // interval:20, //间隔
                        // style:{ //条形图的样式
                            // fill:'#000'
                        // },
                        textShow:false,
                        // textStyle:{}
                        formatter(text){
                            return text
                        }
                    }
                },{
                    key:'val',
                    type:'bar',
                    bar:{
                        // width:20,
                        // textShow:false

                    }
                },{
                    key:'age',
                    line:{
                        smooth:0.3
                    }
                },{
                    key:'calc'
                }],
                //数据集合
                chartData:[{
                    name:'一季报\n2017',
                    key:3,
                    val:2,
                    calc:-1,
                    age:7
                },{
                    name:'中报\n2017',
                    key:4,
                    val:4.3552893456,
                    calc:6,
                    age:4
                },{
                    name:'三季报\n2018',
                    key:-2.5,
                    val:1,
                    calc:-2.2,
                    age:-2
                },{
                    name:'年报\n2018',
                    key:6,
                    val:2,
                    calc:-1.33333,
                    age:0.3
                }],
                axis:{
                    left:{
                        paddingLeft:25, 
                    },
                    right:{

                    }
                },
            },
            chartOpction:{
                box:{
                    left:50,
                    bottom:40
                },
                //维度
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                columns:[{
                    key:'key',//需要展示成线的key
                    // type:'bar',
                    line:{
                        smooth:0.3
                    },
                    bar:{

                    }

                },{
                    key:'calc',
                    line:{
                        smooth:'0'
                    }
                }],
                //数据集合
                chartData:[{
                    name:'小明',
                    key:3,
                    val:1,
                    calc:-1
                },{
                    name:'张三',
                    key:4,
                    val:0,
                    calc:-2
                },{
                    name:'老王',
                    key:-2.5,
                    val:1,
                    calc:-2.2
                },{
                    name:'未知',
                    key:6,
                    val:2,
                    calc:-1.33333
                }],
                axis:{
                    bottom:{
                        interval:{
                            type:'all' //between
                        },
                        formatter:(val,data)=>{
                            return [val,'{time|2019}'].join('\n')
                        },
                        textStyle:{
                            textOffset:[0,0],
                            textFill:'#ff8800',
                            textVerticalAlign:'bottom',
                            rich:{
                                time:{
                                    textFill:"#666666",
                                }
                            }
                        }
                    },
                    left:{
                        paddingLeft:40,
                        formatter:(val)=>{
                            // return val
                            return [val.toFixed(2),'2019'].join('\n')
                        },
                    },
                    render:(ctx,zrender)=>{

                    }
                },
                //背景网格
                grid:{
                    // show:true, //是否渲染背景网格
                    horizontal:{ //水平背景网格线相关配置
                    //     show:true,  //是否显示
                        // num:10,      //分段数量
                    //     lineStyle:{
                    //         // lineWidth:3,
                    //         stroke:"#ff8800",
                    //         lineDash:[10,5],
                    //     }
                    },
                    // vertical:{ //垂直背景网格线相关配置
                    //     show:true,  //是否显示
                    //     num:4,      //线条数量
                    //     lineStyle:{
                    //         lineWidth:1,
                    //         stroke:"#ff8800",
                    //         lineDash:[5,5],
                    //     }
                    // },
                    // render(ctx,zrender){  //自定义渲染
                    //     ctx.next()
                    // }
                },
                tips:{
                    render:(ctx,zrender)=>{}
                },
            },
            cakeOpction:{
                chartData:{
                    //需要展示成线的key
                    columns:[{
                        key:'val',
                    }],
                    //数据集合
                    rows:[{
                        key:50
                    },{
                        key:50
                    }]
                },
            }
        }
    },
    components:{
        lineChart,
        cakeChart,
        barChart
    }
}
</script>
<style lang="less" scoped>
.line{
    // padding: 20px;
    box-sizing: border-box;
}
</style>




