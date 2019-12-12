<template>
    <div>
        <annular-chart :opction="chartOpction"/>
    </div>
</template>
<script>
import annularChart from '@/components/annular.vue'
export default {
    data(){
        return {
            chartOpction:{
                columns:[{
                    key:'age',
                    innerR:20, //内半径
                    extR:30, //外半径
                    deviation:[0,0],    //圆心偏离 [x,y]
                }],
                chartData:[{
                    key:0,
                    age:40,
                    val:null
                },{
                    key:0,
                    age:100,
                    val:null
                },{
                    key:0,
                    age:40,
                    val:null
                },{
                    key:0,
                    age:50,
                    val:null
                },{
                    key:0.01,
                    age:50,
                    val:null
                }]
            }
        }
    },
    components:{
        annularChart
    },


}
</script>