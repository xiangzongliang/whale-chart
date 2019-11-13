/**
 * 异常浮点数处理
 * 对于无限循环浮点数保留四位小数
 */
let abnormal_float = (val) => {
    let str_text = `${val}`.split('.'),
        callback_num = val

    if(str_text[1] && str_text[1].length > 4){
        callback_num = val.toFixed(4)
    }
    return callback_num
}

export {
    abnormal_float
}