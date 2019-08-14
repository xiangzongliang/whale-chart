<template>
    <div :ref="cakeRef"></div>
</template>
<script>
import zrender from 'zrender'
import { random } from './util/algorithms'
import { default_config } from './util/config/default.config'
import { cake_config } from './util/config/cake.config'
import { cake } from './util/render'
export default {
    data(){
        return {
            cakeRef:`whale_cake_${random(5)}`,
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
        let merge_config = Object.assign(default_config,cake_config)
        zrender.util.merge(this.ShowConfig,merge_config,true)
        zrender.util.merge(this.ShowConfig,this.opction,true)

        let w_cake = zrender.init(this.$refs[this.cakeRef],this.ShowConfig.init)

        cake({
            zrender,
            RAW_OBJ     : w_cake,
            ShowConfig  : this.ShowConfig
        })
    }
}
</script>

