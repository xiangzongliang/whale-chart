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
                //维度
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                columns:[{
                    key:'key',//需要展示成线的key
                    type:'bar',
                    bar:{
                        width:20
                    }
                },{
                    key:'val',//需要展示成线的key
                    type:'bar',
                    bar:{
                        width:20,
                        style:{
                            fill:'#33b5e5'
                        }
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
            },
            chartOpction:{
                box:{
                    left:60,
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
                    type:'bar',
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
                        paddingLeft:35,
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




