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
                    key:'age'
                }],
                chartData:[{
                    key:0,
                    age:100,
                    val:null
                },{
                    key:0,
                    age:100,
                    val:null
                },{
                    key:0,
                    age:100,
                    val:null
                },{
                    key:0,
                    age:100,
                    val:null
                },{
                    key:0.01,
                    age:100,
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