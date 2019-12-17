# init

`init`是对`zrender`底层的`init`进行了配置和初始化

## init.renderer

> 默认 `canvas`   类型  `canvas | svg | vml` 推荐使用`canvas`

渲染方式,同`zrender`底层的`init.renderer`

   
## init.devicePixelRatio
> 默认 `2` 类型 `Number`  不建议修改很大,比较消耗`CPU`和内存

同`zrender`底层的`init.devicePixelRatio` **(该属性会继续优化)**

## init.width

> 默认 `auto`     类型 `auto | Number`

渲染图表的宽度,同`zrender`底层的`init.width`

## init.height

> 默认 `260`  类型 `Number`

渲染图表的高度,同`zrender`底层的`init.height`

## init.autoWidth

> 默认 `false` 类型 `Boolean`

暂不支持该方法,当视图窗口大小改变时自动缩放图表大小

``` js
init:{
    renderer:'canvas',
    devicePixelRatio: 2,
    width: 'auto',
    height: 260,
    //autoWidth:false, //该属性暂不支持!!!当浏览器窗口宽度发生变化时,图表宽度自动变化 默认 false 当宽度值为auto的时候该属性生效
},
```