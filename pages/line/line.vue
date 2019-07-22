<template>
    <div>
        <lineChart class="line" :opction="chartOpction"/>
        <!-- <lineChart class="line" :opction="chartOpction_two"/> -->
    </div>
</template>
<script>
import lineChart from '@/components/line.vue'
export default {
    data(){
        return {
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
                //数据集合
                chartData:{
                    //需要展示成线的key
                    columns:[{
                        key:'key',
                        type:'bar',
                    },{
                        key:'val',
                    },{
                        key:'calc',
                    }],

                    // smooth:0.3,
                    
                    //数据集合
                    rows:[{
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
                        key:3,
                        val:1,
                        calc:-2.2
                    },{
                        name:'未知',
                        key:6,
                        val:2,
                        calc:-1.33333
                    },{
                        name:'哈哈',
                        key:8,
                        val:5.5,
                        calc:-2.222
                    },{
                        name:'呵呵',
                        key:7,
                        val:2.8,
                        calc:-3
                    }]
                },
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
                        formatter:(val)=>{
                            return [val.toFixed(2),'2019'].join('\n')
                        },
                        // formatter:123
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
            chartOpction_two:{
                chartData:{
                    dimension:{
                        bottom:{
                            key:'date',
                            formatter:(val)=>{
                                return [val,'1'].join('\n')
                            }
                        }
                    },
                    //需要展示成线的key
                    columns:[{
                        key:'key',
                    }],
                    //数据集合
                    rows:[{
                        date:'小明',
                        key:-2000,
                    },{
                        date:'张三',
                        key:-2343,
                    },{
                        date:'老王',
                        key:-2960,
                    },{
                        date:'未知',
                        key:300,
                    },{
                        date:'哈哈',
                        key:-2039,
                    },{
                        date:'呵呵',
                        key:-2900,
                    }]
                },
            }
        }
    },
    components:{
        lineChart
    }
}
</script>
<style lang="less" scoped>
.line{
    // padding: 20px;
    box-sizing: border-box;
}
</style>




