<template>
    <div>
        <lineChart class="line" :opction="chartOpction"/>
        <lineChart class="line" :opction="chartOpction_two"/>
    </div>
</template>
<script>
import lineChart from '@/components/line.vue'
export default {
    data(){
        return {
            chartOpction:{
                box:{
                    left:60
                },
                //数据集合
                chartData:{
                    //需要展示成线的key
                    columns:[{
                        key:'key',
                    },{
                        key:'val',
                    },{
                        key:'calc',
                    }],

                    // smooth:0.3,
                    //维度
                    dimension:{
                        bottom:{
                            key:'date'
                        }
                    },
                    //数据集合
                    rows:[{
                        date:'小明',
                        key:2,
                        val:1,
                        calc:-2
                    },{
                        date:'张三',
                        key:4,
                        val:3,
                        calc:-3
                    },{
                        date:'老王',
                        key:3,
                        val:2.5,
                        calc:-2.2
                    },{
                        date:'未知',
                        key:6,
                        val:3.7,
                        calc:0
                    },{
                        date:'哈哈',
                        key:8,
                        val:5.5,
                        calc:-3.6
                    },{
                        date:'呵呵',
                        key:7,
                        val:2.8,
                        calc:-3
                    }]
                },
                axis:{
                    bottom:{
                        interval:{
                            // type:'all'
                        }
                    },
                    left:{
                        formatter:(val)=>{
                            return val.toFixed(2)
                        },
                    },
                    render:(ctx,zrender)=>{

                    }
                },
                color:[],
                title:{
                    render:(ctx,zrender)=>{}
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
                    //需要展示成线的key
                    columns:[{
                        key:'key',
                    }],
                    //维度
                    dimension:{
                        bottom:{
                            key:'date'
                        }
                    },
                    //数据集合
                    rows:[{
                        date:'小明',
                        key:2000,
                    },{
                        date:'张三',
                        key:2343,
                    },{
                        date:'老王',
                        key:2256,
                    },{
                        date:'未知',
                        key:0,
                    },{
                        date:'哈哈',
                        key:2039,
                    },{
                        date:'呵呵',
                        key:2930,
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




