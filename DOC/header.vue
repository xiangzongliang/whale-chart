<template>
    <header>
        <span class="logo">LOGO</span>
        <nav>
            <a v-for="(item,index) in nav" :key="index" :class="select_nav == index ? 'active' : ''" @click="changeNav(item)">{{ item.name }}</a>
        </nav>
        <input type="search" placeholder="搜索...">
    </header>
</template>
<script>
export default {
    data(){
        return {
            select_nav:0,
            nav:[{
                index:0,
                router:'/',
                name:'文档'
            },{
                index:1,
                router:'/design',
                name:'设计'
            },{
                index:2,
                router:'/case',
                name:'案例'
                
            },{
                index:3,
                router:'/develop',
                name:'开发者'
            }]
        }
    },
    methods:{
        changeNav(item){
            this.select_nav = item.index
            this.$router.push({
                path:item.router
            })
        }
    }
}
</script>