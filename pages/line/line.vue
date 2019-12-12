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
                init:{
                    height:260
                },
                // box:{
                    // right:50,
                    // left:10
                // },
                dimension:{
                    bottom:{
                        key:'name',
                    }
                },
                selectColor:'white',//white b
                columns:[
                    {
                    key:'key',
                    axis:'right',
                    line:{
                        smooth:'0'
                    }
                },{
                    key:'val',
                    type:'bar',
                    bar:{
                        r:100,
                        text:{
                            show:true,
                        },
                        setStyle:(ctx)=>{
                            //渐变的用法
                            let col = new ctx.zrender.LinearGradient(0,0,0,1,[{
                                offset:1,
                                color:'#ff8800'
                            },{
                                offset:0.2,
                                color:'#ff3300' 
                            }])
                            return {
                                fill:col
                            }
                        }
                    }
                },{
                    key:'key',
                    type:'bar',
                    line:{
                        smooth:'0.3'
                    },
                    bar:{
                        r:100,
                        // text:{
                        //     // show:true,
                        //     // style:{
                        //     //     textFill:"#ff8800"
                        //     // },
                        //     formatter:(val)=>{
                        //         return val*10000 + '万'
                        //     },
                        // },
                        setStyle:(ctx)=>{
                            if(ctx.value > 0){
                                return {
                                    fill:"#ff8800"
                                }
                            }else{
                                return {
                                    fill:"#33b5e5"
                                }
                            }
                            
                        }
                    }
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
                    },
                    bar:{
                        width:10,   //柱状图的宽度
                        interval:0, //多个柱状图时候之间的间距,一个柱状图时该数据不生效
                        r:10,       //柱状图的圆角 默认为0
                        text:{
                            show:false, //是否显示柱状图上面的文字
                            formatter:(val)=>{
                                return val
                            },
                            style:{

                            }
                        },
                        style:{}, // setStyle的权限大于style的权限
                        setStyle:(ctx)=>{
                            return {}
                        },

                    }
                }
                 */
                
                axis:{
                    inward:true,
                    bottom:{
                        interval:{ //间隔
                            type:'between',  // 'all'    'between'
                        },
                    },
                    left:{
                        // paddingLeft:55,
                        text:{
                            show:false,
                            style:{}
                        },
                        formatter:(val)=>{
                            // return [(val/10000).toFixed(2),'{_name|万}'].join('\n') 
                            return (val/10000).toFixed(2) +'万'
                        },
                    },
                    right:{
                        text:{
                            show:false
                        }
                        // formatter:(val)=>{
                        //     return val.toFixed(2)
                        // },
                    }
                },
                // colors:['#CCA663','#CCA663','#CCA663'],
                // box:{
                //     right:40
                // },
                grid:{
                    horizontal:{ //水平背景线
                        num:5,      //线条数量
                    }
                },
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
        //     key:3,
        //     age:100,
        //     val:21
        // },{
        //     key:0,
        //     age:100,
        //     val:3
        // },{
        //     key:null,
        //     age:100,
        //     val:56
        // },{
        //     key:5,
        //     age:100,
        //     val:34
        // },{
        //     key:8,
        //     age:-100,
        //     val:-54
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




