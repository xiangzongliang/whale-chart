import { terser } from 'rollup-plugin-terser'; //压缩JS
import visualizer from 'rollup-plugin-visualizer';//可视化


//打包图表
let config = [{
    input: './components/index.js',
    output: [{
        file: './build/chart.js',
        format: 'es',
    }],
    plugins: [
        terser(),
        visualizer({
            open:true
        })
    ],
}]

export default config;