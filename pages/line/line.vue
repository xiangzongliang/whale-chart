<template>
    <div>
        <blend-chart class="line" :opction="chartOpction"/>
    </div>
</template>
<script>
import blendChart from '@/components/line.vue'
export default {
    data(){
        let dataArr = []
        for(let i=0;i<1;i++){
            dataArr.push(...[{
                    name:'小明',
                    key:3,
                    val:8.2,
                    calc:-1,
                    per:90
                },{
                    name:'张三',
                    key:4,
                    val:1,
                    calc:-2,
                    per:20
                },{
                    name:'老王',
                    key:7,
                    val:0,
                    calc:-2.2,
                    per:40
                },{
                    name:'未知',
                    key:6,
                    val:-1,
                    calc:-1.33333,
                    per:10
                }])
        }
        return {
            chartOpction:{
                box:{
                    left:50,
                    bottom:40,
                    right:50
                },
                //维度
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                columns:[{
                    key:'key',
                    // type:'bar'
                },{
                    key:'val',
                    // type:'bar'
                },{
                    key:'per',//需要展示成线的key
                    type:'bar',
                    axis:'right',
                    // line:{
                        // smooth:0.3,
                        // style:{}
                    // }

                }],
                //数据集合
                chartData:dataArr,
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
                            return [val.toFixed(2),'{year|2019}'].join('\n')
                        },
                        textStyle:{
                            rich:{
                                year:{
                                    textFill:'#ff8800'
                                }
                            }
                        }
                    },
                    right:{
                        formatter:(val)=>{
                            return [val,'{year|2019}'].join('\n')
                        },
                        textStyle:{
                            rich:{
                                year:{
                                    textFill:'#ff8800'
                                }
                            }
                        }
                    },
                    render:(ctx,zrender)=>{

                    }
                },
                //背景网格
                // grid:{
                    // show:true, //是否渲染背景网格
                    // horizontal:{ //水平背景网格线相关配置
                    //     show:true,  //是否显示
                        // num:10,      //分段数量
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
                    // render(ctx,zrender){  //自定义渲染
                    //     ctx.next()
                    // }
                // },
                event:{
                    pointer:{
                        update:(opction)=>{
                            // console.log(this,opction)
                        }
                    }
                }
            }
        }
    },
    components:{
        blendChart
    }
}
</script>
<style lang="less" scoped>
.line{
    // padding: 20px;
    box-sizing: border-box;
}
</style>




