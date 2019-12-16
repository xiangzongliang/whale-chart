import zrender from 'zrender'
import { random } from './algorithms/random'
import { default_config } from './config/default.config'
import { annilar_config } from './config/annular.config'
//渲染
import { annular_render } from './render/annular.render'


const annular = function (Vue, opts = {}) {
    Vue.component('ec-annular',{
        data(){
            return {
                CHART:null,                         //最终的图表实例
                DOM_REF:`whale_annular_${random(5)}`,  //refs
                ROW_CONFIG:{},                      //最终合并完成的 config
                FEQY:0,                             //更新了几次
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
        mounted() {
            this.renderChart({
                frequency:0
            })
        },
        methods:{
            renderChart({ frequency }){

                zrender.util.merge(this.ROW_CONFIG,default_config,true)
                zrender.util.merge(this.ROW_CONFIG,annilar_config,true)
                zrender.util.merge(this.ROW_CONFIG,this.opction,true)
    
                this.CHART = zrender.init(this.$refs[this.DOM_REF],{
                    renderer:           this.ROW_CONFIG.init.renderer,
                    devicePixelRatio:   this.ROW_CONFIG.init.devicePixelRatio,
                    width:              this.ROW_CONFIG.init.width,
                    height:             this.ROW_CONFIG.dpr(this.ROW_CONFIG.init.height),
                })
    
    
                annular_render({
                    zrender,
                    CHART:this.CHART,
                    ROW_CONFIG:this.ROW_CONFIG,
                    REFS:this.$refs[this.DOM_REF],
                    frequency
                })
            },
            upChart(){
               this.CHART.dispose() 
               this.FEQY = this.FEQY + 1
               this.renderChart({
                   frequency : this.FEQY
               })
            }
        },
        watch:{
            'opction.chartData':function(val, oldVal){
                this.upChart()
            }
        },
        render:function(createElement){
            return createElement('div',{
                ref:this.DOM_REF,
            })
        }
    })
}

export {
    annular
}