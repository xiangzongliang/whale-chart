<template>
    <div>
        <lineChart class="line" :opction="chartOpction"/>
    </div>
</template>
<script>
import lineChart from '@/components/line.vue'
export default {
    data(){
        return {
            chartOpction:{
                //数据集合
                chartData:{
                    //需要展示成线的key
                    columns:['key'],
                    //数据集合
                    rows:[{
                        date:'2019-07-03',
                        key:100,
                        val:1029,
                        calc:234.34
                    },{
                        date:'2019-07-04',
                        key:200,
                        val:3782,
                        calc:-7891
                    },{
                        date:'2019-07-05',
                        key:120,
                        val:897,
                        calc:8912
                    }]
                },
                axis:{
                    X:{
                        top:{
                            show:false,

                        },
                        buttom:{
                            show:true,
                            interval:{ //间隔
                                type:'all',  // 'all'   3   'between'   'sign'  // 'auto'
                                sign:[]
                            },
                            formatter:(val)=>{
                                return val
                            },
                            lineStyle:{
                                lineWidth:3,
                                stroke:"#ff8800",
                                lineDash:[10,5],
                            },
                            textStyle:{

                            }
                        }
                    },
                    Y:{},
                    render:(ctx,zrender)=>{

                    }
                },
                color:[],
                title:{
                    render:(ctx,zrender)=>{}
                },
                //背景网格
                grid:{
                    show:true, //是否渲染背景网格
                    // horizontal:{ //水平背景网格线相关配置
                    //     show:true,  //是否显示
                    //     num:3,      //分段数量
                    //     lineStyle:{
                    //         // lineWidth:3,
                    //         stroke:"#ff8800",
                    //         lineDash:[10,5],
                    //     }
                    // },
                    // vertical:{ //垂直背景网格线相关配置
                    //     show:true,  //是否显示
                    //     num:4,      //线条数量
                    //     lineStyle:{
                    //         lineWidth:1,
                    //         stroke:"#ff8800",
                    //         lineDash:[5,5],
                    //     }
                    // },
                    render(ctx,zrender){  //自定义渲染
                        ctx.next()
                    }
                },
                tips:{
                    render:(ctx,zrender)=>{}
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
    padding: 20px;
    box-sizing: border-box;
}
</style>




