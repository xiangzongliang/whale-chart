<template>
    <div ref="d3line"></div>
</template>

<script>
import * as d3 from "d3";
// import { min } from 'd3-array';
import { init,Circle } from 'zrender';
export default {
    data(){
        return{

        }
    },
    mounted(){
        let dom = this.$refs.d3line

        let zr = new init(dom,{
            renderer:'canvas',
            devicePixelRatio:2,
            width:300,
            height:500
        })

        var circle = new Circle({
            shape: {
                cx: 150,
                cy: 50,
                r: 40
            },
            style: {
                fill: 'none',
                stroke: '#F00'
            }
        });
        zr.add(circle);



    }
}
</script>
