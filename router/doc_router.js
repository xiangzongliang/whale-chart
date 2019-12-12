import menuDom from '@/DOC/develop_doc/menu.vue'
import contentDom from '@/DOC/develop_doc/content.vue'
let router = (Router) =>{
    return new Router({
        routes:[{
                path: '/',
                components:{
                    menuDom,
                    contentDom
                } ,
        },{
            path: '/doc/:id',
            components:{
                menuDom,
                contentDom
            },
            children: [{
                path: '/doc/line/:id',
                // component: UserProfile
            }]
        }]
    })
}
export {
    router
}