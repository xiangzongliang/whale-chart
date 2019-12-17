# dpr

建议在全局暴露`dpr`参数,通常我们会通过引入`flexible.js`文件即可,`dpr`是所有图表库的通用方法,在不同分辨率的手机上,通过输入相同的数值,进行**分辨率的缩放**,*(默认值为 2 后续优化)*

::: danger 警告
该方法使用较多,禁止随意修改和赋值
:::

## 源代码
``` js
dpr:(val)=>{
    let dpr = window.dpr || 2
    if(typeof val === 'number'){
        return val*dpr
    }else{
        let n_val = val * 1
        if(isNaN(n_val)){
            return val
        }else{
            return n_val*dpr
        }
    } 
}
```