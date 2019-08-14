<template>
    <div :ref="barRef"></div>
</template>
<script>
import zrender from 'zrender'
import { random } from './util/algorithms'
import { default_config } from './util/config/default.config'
import { bar_config } from './util/config/bar.config'
import { render_grid,render_axis,chart_bar,pointer } from './util/render'
export default {
    data(){
        return{
            RAW_OBJ:null, //最终在页面渲染的实例对象
            barRef:`whale_line_${random(5)}`,

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
        let merge_config = Object.assign(default_config,bar_config),
            opt = Object.assign({},merge_config.init); //生成一个新对象 ,避免多图重复 永远不要试图修改 默认配置
            
        zrender.util.merge(opt,this.opction.init,true)
        //最终实例
        let w_bar = zrender.init(this.$refs[this.barRef],opt)
        this.RAW_OBJ = w_bar

        zrender.util.merge(this.ShowConfig,merge_config,true)
        zrender.util.merge(this.ShowConfig,this.opction,true)

        // // //开始渲染全部
        this.renderAll()
    },
    methods:{
        //所有的形状渲染
        renderAll(){
            let _chart = chart_bar(zrender,this.RAW_OBJ,this.opction,this.ShowConfig)
            let _axis = render_axis(zrender,this.RAW_OBJ,this.opction,this.ShowConfig)
            let _grid = render_grid(zrender,this.RAW_OBJ,this.opction,this.ShowConfig)
            let _pointer = pointer(zrender,this.RAW_OBJ,this.opction,this.ShowConfig)


            
            this.RAW_OBJ.add(_chart)
            this.RAW_OBJ.add(_axis)
            this.RAW_OBJ.add(_grid)
            this.RAW_OBJ.add(_pointer)




        },
    }
}
</script>

