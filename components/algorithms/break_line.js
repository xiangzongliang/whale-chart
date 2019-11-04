/**
 * 折线图的多段线处理
 * 当数据出现中途断线的时候开始绘制 多段折线图
 * 该方法是配合 calc_point 方法生成的坐标点来处理的
 * @param {*} arr 
 */
let break_line = (arr) =>{
    let callback_arr = [],
        num = 0
    callback_arr[num] = []
    for(let ai in arr){
        let isBreak = arr[ai][2]
        if(isBreak === true){
            num ++
            callback_arr[num] = []
        }else{
            callback_arr[num].push(arr[ai])
        }
    }
    return callback_arr
}

export {
    break_line
}