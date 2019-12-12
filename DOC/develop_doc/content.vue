<template>
    <div class="right-content">
        <div class="case_chart">
             <blendChart :opction="lineOpction"></blendChart>
             <blendChart :opction="barOpction"></blendChart>
             <blendChart :opction="chartOpction"></blendChart>
        </div>
        <div class="case_chart">
             <blendChart :opction="opction4"></blendChart>
             <blendChart :opction="opction5"></blendChart>
             <blendChart :opction="opction6"></blendChart>
        </div>
    </div>
</template>
<script>
import blendChart from '@/components/line.vue'
export default {
    data(){
        return{
            lineOpction:{
               dimension:{
                    bottom:{
                        key:'name',
                    }
                }, 
                selectColor:'white',
                columns:[{
                    key:'age',
                    line:{
                        smooth:'0'
                    }
                },{
                    key:'val'
                }],
                chartData:[],
                pointer:{
                    tip:{
                        show:true
                    }
                },
                plugins:()=>{

                }
            },


            barOpction:{
               dimension:{
                    bottom:{
                        key:'name',
                    }
                }, 
                selectColor:'white',
                columns:[{
                    key:'age',
                    type:'bar',
                    bar:{
                        width:5,
                        textShow:true
                    }
                },{
                    key:'val',
                    type:'bar'
                }],
                chartData:[],
                pointer:{
                    vertical:{
                        show:false
                    }
                }
            },


            chartOpction:{
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                selectColor:'white',//white b
                columns:[
                    {
                    key:'age',
                    axis:'right',
                    line:{
                        smooth:'0'
                    }
                }
                ,{
                    key:'val',
                    type:'bar',
                },{
                    key:'val',

                    line:{
                        smooth:'0.3'
                    },
                }],
                chartData:[],
            },

            opction4:{
                box:{
                    left:10,
                    right:10
                },
                dimension:{
                    bottom:{
                        key:'name',
                    }
                }, 
                selectColor:'white',
                columns:[{
                    key:'age',
                    line:{
                        smooth:'0'
                    }
                },{
                    key:'val',
                    axis:'right'
                }],
                chartData:[],
                axis:{
                    inward:true,
                    bottom:{
                        text:{
                            show:false
                        }
                    }
                }
            },

            opction5:{
               dimension:{
                    bottom:{
                        key:'name',
                    }
                }, 
                selectColor:'white',
                columns:[{
                    key:'pre',
                    type:'bar',
                    bar:{
                        width:15,
                        r:100,
                        text:{
                            show:true
                        },
                        setStyle:(ctx)=>{
                            //渐变的用法
                            let col = new ctx.zrender.LinearGradient(0,0,0,1,[{
                                offset:1,
                                color:'#EDD095'
                            },{
                                offset:0.2,
                                color:'#FF9800' 
                            }])
                            return {
                                fill:col
                            }
                        }
                    }
                }],
                chartData:[],
                axis:{
                    inward:true,
                    left:{
                        text:{
                            show:false
                        }
                    }
                }
            },

            opction6:{
               dimension:{
                    bottom:{
                        key:'name',
                    }
                }, 
                selectColor:'white',
                columns:[{
                    key:'age',
                    type:'bar',
                    bar:{
                        width:8,
                        interval:0,
                    }
                },{
                    key:'val',
                    type:'bar',
                    bar:{
                        width:8,
                        interval:0,
                    }
                },{
                    key:'pre',
                    type:'bar',
                    bar:{
                        width:8,
                        interval:0,
                    }
                },{
                    key:'key',
                    type:'bar',
                    bar:{
                        width:8,
                        interval:0,
                    }
                }],
                chartData:[],
                pointer:{
                    tip:{
                        show:true
                    }
                }
            },

        }
    },
    mounted(){
        this.$axios({
            method:'post',
            url:'/api/chart',
            data:{},
        }).then(res=>{
            this.lineOpction.chartData = res.data.data
            this.barOpction.chartData = res.data.data
            this.chartOpction.chartData = res.data.data
            this.opction4.chartData = res.data.data
            this.opction5.chartData = res.data.data
            this.opction6.chartData = res.data.data
        })
    },
    components:{
        blendChart
    }
}
</script>
<style lang="less">
.case_chart{
    display: flex;
    display: -webkit-flex;
    padding-bottom: 2rem;
    div{
        width: 100%;
    }
}
    
</style>