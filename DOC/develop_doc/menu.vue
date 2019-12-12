<template>
    <div class="left-nav">
        <div v-for="(item,index) in p_list" :key="index" :class="select_index == index ? 'active' : ''">
            <p @click="changeMenu(item)">
                <a>{{ item.name }}</a>
                <svg t="1575969792346" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5335" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="5336"></path>
                </svg>
            </p>
            <transition mode="out-in" appear>
                <ul v-if="item.children && select_index == index">
                    <li v-for="(c_item,c_index) in item.children" :key="c_index">{{ c_item.name }}</li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name:'doc',
    data(){
        return{
            select_index:0,
            p_list:[{
                index:0,
                router:'/doc/line',
                name:'折线图',
                children:[{
                    router:'/doc/line/init',
                    name:'init'
                },{
                    router:'/doc/line/box',
                    name:'box'
                }]
            },{
                index:1,
                router:'/doc/bar',
                name:'柱状图',
                children:[{
                    router:'/doc/line/init',
                    name:'binit'
                },{
                    router:'/doc/line/box',
                    name:'box'
                }]
            },{
                index:2,
                router:'/doc/various',
                name:'混合图'
            },{
                index:3,
                router:'/doc/annular',
                name:'环形图'
            }]
        }
    },
    methods:{
        changeMenu(item){
            if(this.select_index == item.index){
                this.select_index = 9999
            }else{
                this.select_index = item.index
            }
            this.$router.push({
                path:item.router
            })
        }
    }
}
</script>