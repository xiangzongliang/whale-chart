import zrender from 'zrender'
var onlyId = 0x0000; //多图时唯一ID

/**
 * 这是一个奇怪的计算公式
 * 大于 0 的数字输出第一位有效数字的值
 * 例如 41 => 40  1203 => 1000  
 * @param {*} val 
 * @param {*} noFixed 0~1 之间的值不取两位小数 
 */
let sign_num = (val,noFixed) => {
    let get_v = parseFloat(val),
        handle = (v)=>{
            let abs_v = Math.abs(v),    //绝对值
                n_v = v.toString(),     //字符串
                len = n_v.length,
                isFloat = n_v.indexOf('.'), //是否有小数
                fist_num = n_v.slice(0,1),
                calback_val;

            
            if(abs_v >= 100){ // 100+
                n_v = parseInt(abs_v).toString()
                len = n_v.length
                fist_num = n_v.slice(0,2)
                calback_val = fist_num * Math.pow(10,len - 2)

                if(calback_val < abs_v){
                    calback_val = parseInt(calback_val) + Math.pow(10,len - 2)
                }
            }else if(abs_v >= 10){ // 10 ~ 99
                calback_val = Math.ceil(abs_v/10)*10
            }else if(abs_v >= 1){ // 1 ~ 9
                calback_val = Math.ceil(abs_v)
            }else{ //0 ~ 1
                if(noFixed === true){
                    calback_val = abs_v
                }else{
                    calback_val = abs_v.toFixed(2) * 1
                }
            }

            return calback_val
        }

    if(isNaN(get_v)){
        return 0
    }


    if(get_v > 0){
        return handle(get_v)
    }else if (get_v == 0){
        return 0
    }else if(get_v < 0){
        return handle(get_v) * -1
    }
}


/**
 * 计算一个数组中的最大差值 切是否有负数
 * @param {*} arr  //数组集合
 */ 
let maxDiff = (arr,sub) => {
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
            max_diff:callback_max,  //最大差值 距离0
            isN:isNegative,     //是否有负数
            abs_max:abs_max,    //最大值的绝对值
            abs_min:abs_min,     //最小值的绝对值
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
 * 移除数组中不正常的数据类型  转换为 ''
 * @param {*} arr 
 */
let Remove_unusual = (arr) =>{
    let new_arr = []
    for(let ri in arr){
        let item = parseFloat(arr[ri])
        if(isNaN(item)){
            new_arr.push('')
        }else{
            new_arr.push(arr[ri])
        }
    }
    return new_arr
}

/**
 * 
 * 获取 0 轴的位置
 */
let get_zero = () =>{

}

/**
 * 
 * @param {*} diff:
        abs_max: 6      //最大值的绝对值
        abs_min: 2.5    //最小值的绝对值
        all_line: 5     //总共有几条横线
        cut: 2          //背景分割线的每一段的值 || 注意不是分段高度 是用来对应每段值的大小
        deviation: 30   //是否存在偏移 主要在计算柱状图的时候使用
        height: 600     //canvas 总高度
        isN: true       //数据中是否有负数 左侧轴是统计所有左侧的数据是否有负数,右侧轴则是统计当前数组中是否有负数
        item_H: 92      //背景网格每段的 高度
        max: 6          //最大值
        max_diff: 6     //与 0 轴偏移的最大值
        min: -2.5       //最小值
        width: 640      //canvas 的宽度
        zero_axis: 336  // 0 轴的Y坐标
        zero_bottom: 2  // 0 轴以下有几条线
        zero_top: 3     // 0 轴以上有几条线
 */
/**
 * 通过一系列数组计算出每个点在坐标轴中的位置
 * 也是核心折线图和柱状图的数据分析模块
 * @param {*} ROW_CONFIG    //配置
 * @param {*} allarr        //所有值的数组
 * @param {*} arr           //当前渲染的线的数组
 * @param {*} total         //单一横轴渲染多少个点
 * @param {*} all_points    //当前图表的所有计算的点集合
 * @param {*} _diff         //差值  用于存储核心计算需要的值,在其他地方只可读取不可赋值
 * @param {*} deviation     //偏移 主要用于柱状图的绘制偏移
 */

let calc_point = ({ ROW_CONFIG={}, allarr=[], arr=[], _DIFF = {}, deviation=0}) => {
    let _allarr = Remove_unusual(allarr),
        _arr = Remove_unusual(arr),
        diff =  Object.assign({},maxDiff(_allarr)),
        _box_ = ROW_CONFIG._box_,
        points = [],
        item_num = ROW_CONFIG.grid.horizontal.num || 4, //把画布的高度分为几段
        total = _arr.length,
        max = diff.max,
        min = diff.min,
        zero_axis = 0,      // 0 轴位置
        item_H = (_DIFF.height - _box_.top - _box_.bottom) / item_num,         //每一段的高度
        zero_top = 0,        // 0 轴以上有多少段
        zero_bottom = 0,
        DMU,
        cut = 0                 //每一段对应数值 的 近似值
        
        


        /**
         * 计算 0 轴以上多少段 
         */
        if(max <= 0){
            max = 0
            DMU = diff.abs_min
        }else if(min >= 0){
            min = 0
            DMU = diff.abs_max
        }else{
            DMU = diff.max - diff.min
        }
            


        cut = sign_num(DMU/item_num,true)



        //这里是很核心的一个步骤
        let max_surplus = Math.abs(max%cut),
            min_surplus = Math.abs(min%cut)
        cut = cut + (max_surplus + min_surplus) / item_num //特殊备注这行代码,不要随便修改它

        zero_top = Math.ceil(Math.abs(max)/cut)
        zero_bottom = Math.ceil(Math.abs(min)/cut)

        item_H = (_DIFF.height - _box_.top - _box_.bottom) / (zero_top + zero_bottom)







        //计算 0 轴
        if(max <= 0){ //全部为负数
            zero_axis = _box_.top
        }else if(min > 0){ //全部为正数字
            zero_axis = _DIFF.height - _box_.bottom
        }else{ //正负数都有
            zero_axis =  item_H * zero_top + _box_.top
        }

        let n_max = cut * zero_top,
            n_min = cut * zero_bottom * -1,
            abs_max = Math.abs(n_max),
            abs_min = Math.abs(n_min)
        if(abs_max >= abs_min){
            diff.max_diff = abs_max
        }else{
            diff.max_diff = abs_min
        }

        
        Object.assign(diff,{
            zero_axis, //0轴位置
            item_H,  //画布被分割的每一段的高度
            all_line:zero_top + zero_bottom,   //一共有多少横线
            deviation, //是否存在绘制偏移
            cut,        //每一段对应的值
            zero_top,
            zero_bottom
        })
        
        for(let ai in _arr){
            let x = (_DIFF.width - _box_.left - _box_.right - deviation) / (total-1) * (parseInt(ai)) + _box_.left + deviation/2,
                y = 0,
                isBreak = false,   //当前的值是否为断点,主要用于折线图,绘制多段线使用
                num = parseFloat(_arr[ai])


            if(isNaN(num)){ //有断点
                isBreak = true
                num = 0
            }

            //如果只有一条数据
            if(total <= 1){
                x = (_DIFF.width - _box_.left - _box_.right - deviation) / 2 + _box_.left + deviation/2
            }



            if(diff.isN === true){//如果有负数
                if(num > 0){
                    y = zero_axis - num / abs_max * (zero_top * item_H)
                }else if(num == 0){
                    y = zero_axis
                }else{
                    y = zero_axis + (num / abs_min * (item_H * zero_bottom) * -1 )
                }
            }else{//都为正数 0 被包含在正数中
                y = (_DIFF.height - _box_.top - _box_.bottom) - (num / diff.max_diff * (_DIFF.height - _box_.top - _box_.bottom)) + _box_.top
            }
            
            
            points.push([x,y,isBreak])
        }

    return {
        diff,
        points,
    }
}

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



/**
 * 更具输入的 val 计算出 arr 中距离最近的数
 * 主要用来处理折线和柱状图指针的位置
 * @param {*} val 
 * @param {*} part 
 * @param {*} arr 
 */
let adjacent = (val,part,arr)=>{
    let rema = val % part,
        section = parseInt(val/part)
    if(rema >= part / 2){ //偏向下一个
        return {
            index : section+1,
            position : arr[section+1]
        }
    }else{ //偏向上一个
        return {
            position : arr[section],
            index : section
        }
    }
}





/**
 * 数组等倍放大器
 * 用于处理虚线的兼容显示
 * 只能处理单层数组
 */
/**
 * 
 * @arr {*} array || object 
 */
let arr_zoom = ({arr = [],dpr}) =>{
    let new_arr = []
    for(let ar in arr){
        let item = arr[ar]
        if(typeof item == 'number'){
            new_arr[ar] = dpr(item)
        }else{
            new_arr[ar] = item
        }
    }
    return new_arr
}




export {
    sign_num,
    maxDiff,
    random,
    calc_point,
    break_line,
    adjacent,
    arr_zoom
}