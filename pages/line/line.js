import Vue from 'vue'
import line from './line.vue'
import rem from '@/config/rem'
Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。


new Vue({
    el: '#app',
    render: h => h(line),
})