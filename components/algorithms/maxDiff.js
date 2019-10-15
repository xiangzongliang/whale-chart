/**
 * 计算一个数组中的最大差值 切是否有负数
 * @param {*} arr  //数组集合
 */ 
let maxDiff = (arr) => {
    let max = Math.max(...arr), //Math.abs(),
        min = Math.min(...arr),
        abs_max = Math.abs(max),
        abs_min = Math.abs(min),
        isNegative = false,
        callback_max = abs_max;

        if(min < 0){
            isNegative = true
        }
        if(abs_max < abs_min){
            callback_max = abs_min
        }

        return {
            max:max,    //最大值
            min:min,    //最小值
            abs_max:abs_max,    //最大值的绝对值
            abs_min:abs_min,     //最小值的绝对值
            max_diff:callback_max,  //最大差值 距离0轴
            isN:isNegative,     //是否有负数   true有负数
        }
}
export {
    maxDiff
}