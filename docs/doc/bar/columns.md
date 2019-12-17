# columns 显示栏目
> 默认 `[]`   类型  `Array`  必填

图表需要显示的数据集合配置,如果不配置该参数图表则不会显示,结合[chartData]()参数使用.   
例如图表的完整数据为如下:
```js
chartData:[{
    key:3,
    age:100,
    val:21
},{
    key:0,
    age:100,
    val:3
},{
    key:null,
    age:100,
    val:56
},{
    key:5,
    age:100,
    val:34
},{
    key:8,
    age:100,
    val:-54
}]
```
我们需要显示`age`为图表内容时,只需配置`columns`如下:
```js
columns:[{
    key:'age'
}]

```
这时图表便会进行一次完整的渲染

## columns[].key
>类型 `String`

图表需要渲染的数据中的`key`,如果数据中没有找到`key`,将会全部当作数据异常而不显示.

## columns[].type

> 默认 `line`     可选 `line | bar`

当前`key`渲染成柱状图还是折线图

## columns[].axis

> 默认 `axis`     可选 `left | right`

当前`key`渲染所对应的轴标示,在双轴时使用该参数

## columns[].bar

> 类型 `Object`

当`type=bar`时生效,指当前柱状图的相关配置

示例:
``` js {3,5,27-34,38-48}
columns:{
    key:'age',      //必填
    style:'bar',    //选填
    axis:'left',    //选填
    bar:{           //选填
        r:100,      //柱形的圆角
        width:20,   //柱形的宽度
        interval:3, //多组柱形图时的间距
        text:{
            show:true,  //是否显示柱形图上方的文字
            style:{     //柱形图上方的文字样式
                //...
            },
            formatter:(val)=>{
                return `${val}万` //柱状图的文字统一加万
            }
        },
        style:{},   //柱状图的样式
        setStyle:(ctx)=>{   //可针对单个柱状形状设置样式 ,该属性会覆盖`style`的配置
            /**
             * 回调的上下文包含
             * ctx.fill         //当前柱形的颜色
             * ctx.index        //第几个柱形
             * ctx.value        //当前柱形对应的值
             * ctx.zrender      //zrender 实例
             **/
            //案例1 大于0的柱形显示红色  小于0的显示蓝色
            let fill = '#33b5e5'
            if(ctx.value > 0){
                fill = '#ff3300'
            }
            return {
                fill
            }


            // -----------------------------
            //案例2 渐变柱形的设置
            let color = new ctx.zrender.LinearGradient(0,0,0,1,[{
                offset:1,
                color:'#ff8800'
            },{
                offset:0.2,
                color:'#ff3300' 
            }])
            return {
                fill:color
            }

        }
    }
}
```

## columns[].bar.r

> 默认 `0`     类型 `Number`

柱形图的圆角大小

## columns[].bar.width

> 默认 `dpr(11)`     类型 `Number`

柱形的宽度

## columns[].bar.interval

> 默认 `dpr(2)`     类型 `Number`

多组柱形图时的间隔,单组柱形图该参数无效计算

## columns[].bar.text

>  类型 `Object`

柱形图上方的文字配置

## columns[].bar.text.show

> 默认 `false` 类型 `Boolean`

是否显示柱形图上方的文字

## columns[].bar.text.style

> 类型 `Object`

柱形图上方的文字样式


## columns[].bar.text.formatter

> 类型 `Function`

柱形图上方的文字样式

## columns[].bar.style

> 类型 `Object`

柱状图的柱形样式设置,继承自[zrender.Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable)

## columns[].bar.setStyle

> 类型 `Function`

单独设置每一个柱形的样式回调,权限高于`style`





## columns[].line

> 默认 `{}`     类型 `Object`

当`type=line`时生效,指当前折线图的折线绘制部分配置

示例:
``` js {3,5-14}
columns:{
    key:'age',      //必填
    style:'line',    //选填
    axis:'left',    //选填
    line:{
        smooth:0.3, //折线圆滑度
        style:{
            stroke:'#ff3300',   //线条颜色
            lineWidth:1.6,      //线条粗细
            /**
             * 可配置 zrender.Displayable 所有的有效属性
             **/
        }
    }
}
```

## columns[].line.smooth

> 默认 `0`     类型 `Number`  取值范围 `0-1`

指折线圆滑程度,同 `zrender`的[zrenderpolyline](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderpolyline)`smooth`参数.圆滑曲线推荐使用`0.3`

## columns[].line.style

> 类型 `Object`

可配置折线图的样式,该属性可配置继承自[zrender.Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable)的属性,
::: tip 提示
`style.lineWidth` 线宽会被[dpr](/doc/bar/dpr/)进行自动缩放
:::


