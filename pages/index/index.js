import Vue from 'vue'
import Router from 'vue-router'
import index from './index.vue'
import axios from 'axios'
import MOCK from '@/mock'
import rem from '@/config/rem'
import { annular,line } from '@/build/chart.js'
Vue.use(Router)
Vue.use(line)
Vue.use(annular)
import '@/assets/doc.less'
Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。
import { router } from '@/router/doc_router.js'

Vue.prototype.$axios = axios
new Vue({
    el: '#app',
    router:router(Router),
    render: h => h(index),
})