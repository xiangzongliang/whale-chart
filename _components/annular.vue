<template>
    <div :ref="DOM_REF"></div>
</template>
<script>
import zrender from 'zrender'
import { random } from './algorithms'
import { default_config } from './config/default.config'
import { annular_config } from './config/annular.config'
export default {
    data(){
        return {

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
        
    }
}
</script>