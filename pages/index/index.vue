<template>
    <div>
        <header-dom></header-dom>
        <div class="chart-content">
            <router-view name="menuDom"></router-view>
            <router-view name="contentDom"></router-view>
        </div>
    </div>
</template>
<script>
import headerDom from '@/DOC/header.vue'
export default {
    data(){
        return {

        }
    },
    components:{
        headerDom,
    }
}
</script>