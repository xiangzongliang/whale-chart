import zrender from 'zrender'
import { random } from './algorithms/random'
import { default_config } from './config/default.config'
import { line_config } from './config/line.config'
import { line_bar_render } from './render/line.render'
import { THEME } from './theme/theme'
const line = function (Vue, opts = {}) {
    Vue.component('ec-line',{
        data(){
            return {
                CHART:null,                         //最终的图表实例
                DOM_REF:`whale_line_${random(5)}`,  //refs
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
                let theme = THEME(zrender,this.opction.selectColor || 'default') //
    
    
                zrender.util.merge(this.ROW_CONFIG,default_config,true)
                zrender.util.merge(this.ROW_CONFIG,line_config,true)
                zrender.util.merge(this.ROW_CONFIG,theme,true)
                zrender.util.merge(this.ROW_CONFIG,this.opction,true)
    
    
    
    
                this.CHART = zrender.init(this.$refs[this.DOM_REF],{
                    renderer:           this.ROW_CONFIG.init.renderer,
                    devicePixelRatio:   this.ROW_CONFIG.init.devicePixelRatio,
                    width:              this.ROW_CONFIG.init.width,
                    height:             this.ROW_CONFIG.dpr(this.ROW_CONFIG.init.height),
                })
    
    
                /**
                 * 回调图表绘制之前
                 */
                this.ROW_CONFIG.event.update(Object.assign({},{
                    zrender,
                    CHART:this.CHART,
                    ROW_CONFIG:this.ROW_CONFIG,
                    REFS:this.$refs[this.DOM_REF],
                    frequency
                }))
                line_bar_render({
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
    line
}