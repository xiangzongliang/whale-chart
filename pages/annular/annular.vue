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
                
            }
        }
    },
    components:{
        annularChart
    }

}
</script>