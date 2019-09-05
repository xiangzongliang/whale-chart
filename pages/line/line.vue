<template>
    <div>
        <blend-chart class="line" :opction="chartOpction"/>
    </div>
</template>
<script>
import blendChart from '@/components/line.vue'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            chartOpction:{
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                columns:[{
                    key:'key',
                }],
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
                
                // axis:{
                //     bottom:{
                //         interval:{ //间隔
                //             type:'between',  // 'all'    'between'
                //         },
                //     },
                //     left:{
                //         paddingLeft:35,
                //         textStyle:{},
                //         formatter:(val)=>{
                //             return [val.toFixed(1),'{_name|2019}'].join('\n') 
                //         },
                //     }
                // },
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
                // event:{
                //     pointer:{
                //         update(val){
                //             console.log(val)
                //         }
                //     }
                // }
                
            }
        }
    },
    mounted(){
        this.$axios({
            method:'post',
            url:'/api/chart',
            data:{},
        }).then(res=>{
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
}
</style>




