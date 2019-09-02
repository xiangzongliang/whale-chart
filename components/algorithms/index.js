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
let _calc_point = ({ ROW_CONFIG={} ,allarr=[] ,arr=[] , _DIFF = {}, total=0 ,deviation=0}) => {
    let diff = Object.assign({},maxDiff(allarr),{
        width:_DIFF.width,
        height:_DIFF.height
    }),
        max_diff = diff.max_diff,
        max = diff.max,
        min = diff.min,
        isN = diff.isN, //是否有负数
        abs_max = diff.abs_max,
        abs_min = diff.abs_min,

        g_height = diff.height,
        g_width = diff.width,
        _box_ = ROW_CONFIG._box_,

        //点坐标集合
        points = [], 
        zero_axis,
        cutting_X = ROW_CONFIG.grid.horizontal.num //把画布的高度分为几段

        
       

        let {
            item_H,
            cut,
            zero_top,
            zero_bottom,
            all_line,
            n_max,
            n_min
        } = cutter({
            max,
            min,
            len:cutting_X,
            height:g_height - _box_.top - _box_.bottom
        })



        //重置最大值最小值和绝对值
        max = n_max
        min = n_min

        //=========== 先要确定 0 轴的位置
        if(min>=0){ //数组点全部在 0轴之上
            zero_axis = g_height - _box_.bottom
            min = 0
        }else if(max <= 0){ //数组点全部在 0轴之下
            zero_axis = _box_.top
            max = 0
        }else{ //数组点 分为正负值都有
            zero_axis =  item_H * zero_top + _box_.top
        }


        abs_max = Math.abs(max)
        abs_min = Math.abs(min)

        //得到 0 轴以上多少段 ,0 轴一下多少段
        Object.assign(diff,{
            zero_axis, //0轴位置
            //all_points, //所有的点坐标集合
            item_H,  //画布被分割的每一段的高度
            cut,    //数值被拆分成多少段之后的向上近似值
            all_line,   //一共有多少横线
            zero_top,   //0 轴以上多少背景横线
            zero_bottom, //0 轴以下多少背景横线
            deviation //是否存在绘制偏移
        })


        for(let ai in arr){
            let x = (g_width - _box_.left - _box_.right - deviation) / (total-1) * (parseInt(ai)) + _box_.left + deviation/2,
                y = 0;

            //柱状图或者混合图需要的偏移   
            // if(deviation){
            //     x = (g_width - _box_.left - _box_.right - deviation) / (total-1) * (parseInt(ai)) + _box_.left + deviation/2
            // }

            //如果只有一条数据
            if(total <= 1){
                x = (g_width - _box_.left - _box_.right - deviation) / 2 + _box_.left + deviation/2
            }
            

            if(isN === true){//如果有负数
                if(arr[ai] > 0){
                    // y = zero_axis - (arr[ai] / abs_max * (zero_axis - _box_.top)) + _box_.top //   (g_height - _box_.top - _box_.bottom) + _box_.top - 
                    y = zero_axis - arr[ai] / max * (item_H * zero_top) //+ _box_.top //   (g_height - box.top - box.bottom) + box.top - 
                }else if(arr[ai] == 0){
                    y = zero_axis
                }else{
                    // y = (arr[ai] / abs_min * (g_height - box.top - box.bottom - zero_axis) * -1) + zero_axis + box.top
                    y = zero_axis + (arr[ai] / abs_min * -1 * (item_H * zero_bottom) )
                }
            }else{//都为正数 0 被包含在正数中
                y = (g_height - _box_.top - _box_.bottom) - (arr[ai] / max_diff * (g_height - _box_.top - _box_.bottom)) + _box_.top
            }
            points.push([x,y])
        }


        return {
            diff,
            points,
        }
}

let calc_point = ({ ROW_CONFIG={} ,allarr=[] ,arr=[] , _DIFF = {}, deviation=0}) => {
    let diff =  Object.assign({},maxDiff(allarr)),
        points = [],
        item_num = ROW_CONFIG.grid.horizontal.num || 3, //把画布的高度分为几段
        max = diff.max,
        min = diff.min


        //特殊处理
        if(max<0){ //全部为负数
            max = 0
        }else if(min>0){ //全部为正数字
            min>0
        }else{  //正负数都有

        }





    
    return {
        diff,
        points,
    }
}



/**
 * 和上面的方法作用相似
 * 是为了计算靠右侧的坐标以及对应的坐标点
 */
let calc_right_point = ({ ROW_CONFIG={}, _DIFF={}, allarr=[], arr=[], total=0, deviation=0 }) => {
    // if(_DIFF.all_points.length <= 0){
    //     return
    // }
    let diff = Object.assign({},maxDiff(arr),{
        width:_DIFF.width,
        height:_DIFF.height
    }),
    _box_ = ROW_CONFIG._box_,
    min = diff.min,
    max = diff.max,
    max_diff = diff.max_diff,
    isN = diff.isN,
    abs_max = diff.abs_max,
    abs_min = diff.abs_min,
    line_diff = _DIFF.all_points[0].diff, //获取第一个折线图的 diff
    all_line = line_diff.all_line,
    zero_top = 0,
    zero_bottom = 0,
    cut = sign_num((diff.abs_max + diff.abs_min) / all_line,true),
    reset = {
        zero_top,
        zero_bottom,
        cut
    },
    points = [];


    if(diff.max <= 0){ //点全部在 0 轴以下
        zero_bottom = all_line
        max = 0
        reset.zero_bottom = all_line
    }else if(diff.min >= 0){ //点全部在 0 轴以上
        zero_top = all_line
        min = 0
        reset.zero_top = all_line
    }else{ 
        /**
         * 这里主要是通过数值来匹配坐标轴
         * 反向匹配
         */

        let cut = sign_num((diff.abs_max + diff.abs_min) / all_line,true)
        zero_top = Math.ceil(Math.abs(max)/cut)
        zero_bottom = Math.ceil(Math.abs(min)/cut)



        let calc_zero = function({zero_top,zero_bottom,cut}){
            if((zero_top + zero_bottom) == all_line){
                return {
                    cut,
                    zero_top,
                    zero_bottom
                }
            }else{ //说明 item_H 小了  切分的段落就会多 
                let n_cut = (zero_top + zero_bottom) * cut / all_line, //注意这里严格取值   不需要模糊算法
                    n_zero_top = Math.ceil(Math.abs(max)/n_cut),
                    n_zero_bottom = Math.ceil(Math.abs(min)/n_cut)

                
                return calc_zero({
                    zero_top:n_zero_top,
                    zero_bottom:n_zero_bottom,
                    cut:n_cut
                })
            }
        }

        reset = calc_zero({
            zero_top,
            zero_bottom,
            cut
        }) 
    }

    let zero_axis = _box_.top + line_diff.item_H * reset.zero_top
    diff = Object.assign({},line_diff,diff,{
        cut:reset.cut,
        zero_axis,
        zero_top:reset.zero_top,   //0 轴以上多少背景横线
        zero_bottom:reset.zero_bottom, //0 轴以下多少背景横线
        deviation, //是否存在绘制偏移
    })


    //重置最大值最小值和绝对值
    max = reset.cut * reset.zero_top
    min = reset.cut * reset.zero_bottom * -1
    abs_max = Math.abs(max)
    abs_min = Math.abs(min)



    //循环输出点
    for(let ri in arr){
        let x = (diff.width - _box_.left - _box_.right - deviation) / (total-1) * (parseInt(ri)) + _box_.left + deviation/2,
            y = 0;
        // console.log(arr[ri])

        //如果只有一条数据
        if(total <= 1){
            x = (diff.width - _box_.left - _box_.right - deviation) / 2 + _box_.left + deviation/2
        }


        if(isN === true){//如果有负数
            if(arr[ri] > 0){
                y = diff.zero_axis - arr[ri] / max * (diff.item_H * diff.zero_top)
            }else if(arr[ri] == 0){
                y = diff.zero_axis
            }else{
                y = diff.zero_axis + (arr[ri] / abs_min * -1 * (diff.item_H * diff.zero_bottom) )
            }
        }else{//都为正数 0 被包含在正数中
            max_diff = abs_max
            y = (diff.height - _box_.top - _box_.bottom) - (arr[ri] / max_diff * (diff.height - _box_.top - _box_.bottom)) + _box_.top
        }
        points.push([x,y])
    }

    return {
        diff,
        points
    }
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
 * ⚠️复杂的算法
 * 在这里是在用数组坐标去匹配绘图区域的坐标
 * 用于计算折线或柱状图的绘制区域最大值和最小值
 * 通过分段 的数量来重新计算绘制的值
 */
let cutter = ({max,min,len,height})=>{

    if(min>0){
        min = 0
    }
    if(max<0){
        max = Math.abs(min)
        min = 0
    }

    let cut = sign_num(( max - min ) / len , true),
        zero_top = Math.ceil(Math.abs(max) / cut),      //零轴以上多少条线
        zero_bottom = Math.ceil(Math.abs(min) / cut),   //零轴以下多少条线
        all_line = zero_top + zero_bottom,          //一共有多少条横背景线
        n_max = cut * zero_top,                         //得到图表的最大值
        n_min = cut * zero_bottom * -1,                 //得到图表的最小值
        item_H = height / all_line
        return {
            item_H,
            cut,
            zero_top,
            zero_bottom,
            all_line,
            n_max,
            n_min
        }      
}


/**
 * @简单统计
 * 
 * 已知:
 *          数组 arr 集合
 *          数字 num
 * 条件:    
 *          排出所有负数
 * 求:      
 *          num 占数组集合总和的百分比
 */
let percentage = ({arr=[],num=0})=>{
    // console.log(arr)
}


/**
 * @三角函数
 * 
 * 已知:
 *      圆心坐标 x1,y1
 *      半径    R
 *      夹角    horn
 * 条件:
 *      以Y轴正半轴开始绘制的圆形,且夹角为 horn 
 *      巨型的左上角的点为[0,0]点,是一个反向的平面直角坐标系
 * 求:  
 *      过圆上点的坐标[x,y]
 */
let round_edge = ({x1,y1,R}) => {

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
    calc_right_point,
    adjacent,
    cutter,
    percentage,
    round_edge,
    arr_zoom
}