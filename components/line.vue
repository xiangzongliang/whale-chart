<template>
    <div :ref="lineRef"></div>
</template>
<script>
import zrender from 'zrender'
import { random } from './util/algorithms'
import { default_config } from './util/default_config'
import { render_grid,render_axis,chart_lines } from './util/render'
export default {
    data(){
        return{
            RAW_OBJ:null, //最终在页面渲染的实例对象
            lineRef:`whale_line_${random(5)}`,

            ShowConfig:{},     //最终显示在页面上的配置

        }
    },
    props:{
        //数据
        opction:{
            type:[Object,Array],
            default(){
                return {}
            }
        }
    },
    mounted(){
        //初始化
        let opt = Object.assign({},default_config.init); //生成一个新对象 ,避免多图重复 永远不要试图修改 默认配置
        zrender.util.merge(opt,this.opction.init,true)
        //最终实例
        let w_line = zrender.init(this.$refs[this.lineRef],opt)
        this.RAW_OBJ = w_line

        zrender.util.merge(this.ShowConfig,default_config,true)
        zrender.util.merge(this.ShowConfig,this.opction,true)
        // // //开始渲染全部
        this.renderAll()
    },
    methods:{
        //所有的形状渲染
        renderAll(){
            let _axis = render_axis(zrender,this.RAW_OBJ,this.opction,this.ShowConfig)
            let _grid = render_grid(zrender,this.RAW_OBJ,this.opction,this.ShowConfig)
            let _chart = chart_lines(zrender,this.RAW_OBJ,this.opction,this.ShowConfig)


            this.RAW_OBJ.add(_grid)
            this.RAW_OBJ.add(_axis)
            this.RAW_OBJ.add(_chart)
        },
    }
}
</script>

