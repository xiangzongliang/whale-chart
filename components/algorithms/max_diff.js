/**
 * 计算一个数组中的最大差值 切是否有负数
 * @param {*} arr  //数组集合
 */ 
let max_diff = (arr) => {
    if(arr.length <= 0){
        return {
            max:0,
            min:0,
            abs_max:0,
            abs_min:0,
            zero_diff:0,
            max_diff:0,
            isN:false,
        }
    }

    
    let max = Math.max(...arr), //Math.abs(),
        min = Math.min(...arr),
        abs_max = Math.abs(max),
        abs_min = Math.abs(min),
        isNegative = false,
        callback_max = abs_max,
        max_diff;

        /**
         * 针对最大值和最小值相同的时候进行处理
         */
        if(max == min && max != 0){
            if(max > 0 && min > 0){
                min = 0
                abs_min = 0
            }
            if(max < 0 && min < 0){
                max = 0
                abs_max = 0
            }
        }



        if(min < 0){
            isNegative = true
        }
        if(abs_max < abs_min){
            callback_max = abs_min
        }

        if(max<0){
            max_diff = abs_min
            max = 0
            abs_max = 0
        }else if(min>0){
            max_diff = abs_max
            min = 0
            abs_min = 0
        }else{
            max_diff = abs_max + abs_min
        }


        //这里处理最大值和最小值异常 补充
        if(isNaN(max_diff) === true || isFinite(max_diff) === false){
            max_diff = 0
        }



        return {
            max:max,    //最大值
            min:min,    //最小值
            abs_max,    //最大值的绝对值
            abs_min,     //最小值的绝对值
            zero_diff:callback_max,  //最大差值 距离0轴
            max_diff,   //最大正值和最大负值的差值
            isN:isNegative,     //是否有负数   true有负数
        }
}
export {
    max_diff
}