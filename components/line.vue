<template>
    <div :ref="DOM_REF"></div>
</template>
<script>
import zrender from 'zrender'
import { random } from './algorithms'
import { default_config } from './config/default.config'
import { line_config } from './config/line.config'
import { line_bar_render } from './render/line.render'

//渲染

export default {
    data(){
        return {
            CHART:null,                         //最终的图表实例
            DOM_REF:`whale_line_${random(5)}`,  //refs
            ROW_CONFIG:{}                       //最终合并完成的 config
        }
    },
    props:{
        opction:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    mounted(){
        zrender.util.merge(this.ROW_CONFIG,default_config,true)
        zrender.util.merge(this.ROW_CONFIG,line_config,true)
        zrender.util.merge(this.ROW_CONFIG,this.opction,true)

        this.CHART = zrender.init(this.$refs[this.DOM_REF],{
            renderer:           this.ROW_CONFIG.init.renderer,
            devicePixelRatio:   this.ROW_CONFIG.init.devicePixelRatio,
            width:              this.ROW_CONFIG.init.width,
            height:             this.ROW_CONFIG.dpr(this.ROW_CONFIG.init.height),
        })

        line_bar_render({
            zrender,
            CHART:this.CHART,
            ROW_CONFIG:this.ROW_CONFIG
        })
    }
}
</script>