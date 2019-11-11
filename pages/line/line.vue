<template>
    <div>
        <blend-chart class="line" :opction="chartOpction"/>
        <div class="content">neirong12</div>
    </div>
</template>
<script>
import blendChart from '@/components/line.vue'
export default {
    data(){
        return {
            chartOpction:{
                box:{
                    right:50,
                    // left:10
                },
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                columns:[
                    {
                    key:'val',
                    // type:'bar',
                    // axis:'right',
                    line:{
                        smooth:'0'
                    },
                    // bar:{
                    //     width:20
                    // }
                }
                // ,{
                //     key:'age',
                //     type:'bar',
                //     bar:{
                //         width:8
                //     }
                // },{
                //     key:'val',

                //     line:{
                //         smooth:'0.3'
                //     },
                // }
                ],
                //数据集合
                chartData:[],
                /**
                 {
                    key:'val',
                    axis:'right',
                    type:'bar',
                    line:{
                        smooth:0.3,
                        style:{}
                    },
                    bar:{
                       width:10,
                        textShow:false,
                        interval:0,
                        style:{} 
                    }
                }
                 */
                
                axis:{
                    bottom:{
                        interval:{ //间隔
                            type:'between',  // 'all'    'between'
                        },
                    },
                    // left:{
                    //     paddingLeft:55,
                    //     textStyle:{},
                    //     formatter:(val)=>{
                    //         // return [val.toFixed(1),'{_name|2019}'].join('\n') 
                    //         return (val/1000000).toFixed(2) +'亿'
                    //     },
                    // },
                    // right:{
                    //     formatter:(val)=>{
                    //         return val.toFixed(2)
                    //     },
                    // }
                },
                // colors:['#CCA663','#CCA663','#CCA663'],
                // box:{
                //     right:40
                // },
                // grid:{},
                // pointer:{
                //     vertical:{},
                //     point:{
                //         show:true,
                //         item:[{
                //             shape:{
                //                 r:2,
                //             },
                //             style:{
                //                 opacity:0.4
                //             }
                //         }],
                //         hover:{
                //             show:true, 
                //             item:[{
                //                 shape:{
                //                     r:8,
                //                 },
                //                 style:{
                //                     opacity:0.5,
                //                     lineWidth:2
                //                 }
                //             }]
                //         }
                        
                //     },
                //     tip:{
                //         show:true,
                //         formatter(text,data){},
                //         style:{}
                //     }
                // }
                event:{
                    pointer:{
                        update:(val)=>{
                            console.log(val)
                        }
                    },
                    error:(ctx)=>{
                        console.log(ctx)
                    },
                    //图表被更新
                    update:(ctx)=>{
                        console.log(ctx)
                    }
                }
                
            }
        }
    },
    mounted(){
        // this.chartOpction.chartData = [{
        //     key:100,
        //     age:27,
        //     val:null
        // },{
        //     key:126,
        //     age:23,
        //     val:null
        // },{
        //     key:200,
        //     age:20,
        //     val:null
        // },{
        //     key:900,
        //     age:18,
        //     val:null
        // },{
        //     key:1000,
        //     age:26,
        //     val:null
        // }]
        this.$axios({
            method:'post',
            url:'/api/chart',
            data:{},
        }).then(res=>{
            console.log(res.data.data)
            this.chartOpction.chartData = res.data.data
        })
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
    // touch-action: none;
}
.content{
    height: 2000px;
    background: #ff8800
}
</style>




