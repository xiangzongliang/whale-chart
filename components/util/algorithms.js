
var onlyId = 0x0000; //多图时唯一ID

/**
 * 亿万化处理
 * @param {*} val 
 */
let KMB = (val) => {

}

/**
 * 计算一个数组中的最大差值 切是否有负数
 * @param {*} arr 
 */
let maxDiff = (arr) => {
    let max = Math.max(...arr), //Math.abs(),
        min = Math.min(...arr),
        abs_max = Math.abs(max),
        abs_min = Math.abs(min),
        isNegative = false, //有负数
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
            max_diff:callback_max,  //最大差值
            isN:isNegative,     //是否有负数
            abs_max:abs_max,    //最大值的绝对值
            abs_min:abs_min     //最小值的绝对值
        }
}
/**
 * 生成随机字符 用来处理唯一 ID
 * @param {*} len 
 */
let random = (len) => {
    onlyId++
    len = len || 5;
    let str = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
    maxPos = str.length,
    callback = '';
    for (let i = 0; i < len-1; i++) {
        callback += str.charAt(Math.floor(Math.random() * maxPos))
    }
　　return `${callback}${onlyId}`;
}

/**
 * 通过一系列数组计算出每个点在坐标轴中的位置
 * @param {*} RAW_OBJ 
 * @param {*} ShowConfig 
 * @param {*} arr 
 * @param {*} total 
 */
let calc_point = (RAW_OBJ,ShowConfig,allarr,arr,total) => {
    let diff = maxDiff(allarr),
        max_diff = diff.max_diff,
        max = diff.max < 0 ? 0 : diff.max,
        min = diff.min,
        isN = diff.isN,
        abs_max = diff.abs_max,
        abs_min = diff.abs_min,

        g_height = RAW_OBJ.getHeight(),
        g_width = RAW_OBJ.getWidth(),
        box = ShowConfig.box,
        points = [],
        //先要确定 0 轴
        // let zero_axis = (g_height - box.top - box.bottom) * (abs_max / (abs_max + abs_min)) + box.top
        zero_axis = (g_height - box.top - box.bottom) * (max / (abs_max + abs_min)) + box.top  //确定 0 轴位置


        diff.height = g_height
        diff.width = g_width



        Object.defineProperty(ShowConfig, '_diff', {
            value: diff,
            writable: false,        //禁止被修改
        });


        for(let ai in arr){
            let x = (g_width - box.left - box.right) / (total-1) * (parseInt(ai)) + box.left,
                y = 0;

            if(isN === true){//如果有负数
                
                if(arr[ai] > 0){
                    console.log(arr[ai])
                    // y = zero_axis - (arr[ai] / abs_max * (zero_axis - box.top)) + box.top //   (g_height - box.top - box.bottom) + box.top - 
                    y = zero_axis - arr[ai] / max * (zero_axis - box.top) //+ box.top //   (g_height - box.top - box.bottom) + box.top - 
                }else if(arr[ai] == 0){
                    y = zero_axis
                }else{
                    // y = (arr[ai] / abs_min * (g_height - box.top - box.bottom - zero_axis) * -1) + zero_axis + box.top
                    y = (arr[ai] / abs_min * (g_height - box.top - box.bottom - zero_axis) * -1) + zero_axis
                }
                
            }else{//都为正数 0 被包含在正数中
                y = (g_height - box.top - box.bottom) - (arr[ai] / max_diff * (g_height - box.top - box.bottom)) + box.top
            }
            points.push([x,y])
        }
        return points
}

export {
    KMB,
    maxDiff,
    random,
    calc_point
}