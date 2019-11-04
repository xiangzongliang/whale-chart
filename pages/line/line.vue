<template>
    <div>
        <blend-chart class="line" :opction="chartOpction"/>
        <div class="content">neirong</div>
    </div>
</template>
<script>
import blendChart from '@/components/line.vue'
export default {
    data(){
        return {
            chartOpction:{
                box:{
                    // right:50,
                    // left:10
                },
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                columns:[{
                    key:'key',
                    // type:'bar',
                    axis:'right',
                    line:{
                        smooth:'0'
                    },
                    bar:{
                        width:20
                    }
                },{
                    key:'age',
                    type:'bar'
                },{
                    key:'val',
                    // type:'bar'
                }
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
                //     bottom:{
                //         interval:{ //间隔
                //             type:'all',  // 'all'    'between'
                //         },
                //     },
                    // left:{
                    //     paddingLeft:55,
                    //     textStyle:{},
                    //     formatter:(val)=>{
                    //         // return [val.toFixed(1),'{_name|2019}'].join('\n') 
                    //         return (val/1000000).toFixed(2) +'亿'
                    //     },
                    // },
                //     right:{
                //         formatter:(val)=>{
                //             // return [val.toFixed(1),'{_name|2019}'].join('\n') 
                //             return val.toFixed(2)
                //         },
                //     }
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
        this.chartOpction.chartData = [{
            key:28,
            age:27,
            val:30
        },{
            key:11,
            age:23,
            val:26
        },{
            key:null,
            age:20,
            val:20
        },{
            key:9,
            age:18,
            val:16
        },{
            key:10,
            age:26,
            val:30
        },]
        this.$axios({
            method:'post',
            url:'/api/chart',
            data:{},
        }).then(res=>{
            // this.chartOpction.chartData = res.data.data
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




