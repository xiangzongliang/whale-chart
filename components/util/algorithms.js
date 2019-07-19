var onlyId = 0x0000; //多图时唯一ID

/**
 * 这是一个奇怪的算法公式
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
 * 通过一系列数组计算出每个点在坐标轴中的位置
 * 也是核心折线图和柱状图的数据分析模块
 * @param {*} RAW_OBJ       //实例
 * @param {*} ShowConfig    //配置
 * @param {*} allarr        //所有值的数组
 * @param {*} arr           //当前渲染的线的数组
 * @param {*} total         //单一横轴渲染多少个点
 */
let calc_point = ({RAW_OBJ,ShowConfig,allarr,arr,total,all_points,_diff}) => {
    let diff = Object.assign(maxDiff(allarr),_diff),
        max_diff = diff.max_diff,
        max = diff.max < 0 ? 0 : diff.max,
        min = diff.min > 0 ? 0 : diff.min,
        isN = diff.isN, //是否有负数
        abs_max = diff.abs_max,
        abs_min = diff.abs_min,

        g_height = diff.height,
        g_width = diff.width,
        box = ShowConfig.box,

        //点坐标集合
        points = [], 
        zero_axis,
        para = ShowConfig.grid.horizontal.num, //把画布的高度分为几段
        parag_val = sign_num((max - min) / para,true)  //每一段所站数值 极值的差别的比例 在向上取近似值




        //计算 0 轴以上有多少段
        let top_lins = Math.ceil(max / ((max - min) / para)) // 0 以上有多少段

        //先要确定 0 轴
        // let zero_axis = (g_height - box.top - box.bottom) * (abs_max / (abs_max + abs_min)) + box.top
        if(min>=0){ //数组点全部在 0轴之上
            zero_axis = g_height - box.bottom
        }else if(max <= 0){ //数组点全部在 0轴之下
            zero_axis = box.top
        }else{ //数组点 分为正负值都有
            // let _zero_axis = (g_height - box.top - box.bottom) * (max / (abs_max + abs_min)) + box.top

            zero_axis = (g_height - box.top - box.bottom) / para * top_lins + box.top  //Math.ceil(max / parag_val) *  + box.top
        }

        //得到 0 轴以上多少段 ,0 轴一下多少段



        // let zu = Math.ceil(max / ((max - min) / para)) // 0 以上有多少段

        console.log(zero_axis,parag_val)



        
        diff.zero_axis = zero_axis // 0 轴坐标
        diff.all_points = all_points    //所有的点坐标集合
        diff.para = para
        diff.parag_val = parag_val
        diff.top_lins = top_lins




        Object.defineProperty(ShowConfig, '_diff', {
            value: diff,
            writable: false,        //禁止被修改
        });



        //========
        max = top_lins * parag_val  //最大值发生了变化
        max_diff = Math.abs(max) > Math.abs(min) ?  Math.abs(max) : Math.abs(min)

        for(let ai in arr){
            let x = (g_width - box.left - box.right) / (total-1) * (parseInt(ai)) + box.left,
                y = 0;

            if(isN === true){//如果有负数
                
                if(arr[ai] > 0){
                    // console.log(arr[ai])
                    // y = zero_axis - (arr[ai] / abs_max * (zero_axis - box.top)) + box.top //   (g_height - box.top - box.bottom) + box.top - 
                    y = zero_axis - arr[ai] / max * (zero_axis - box.top) //+ box.top //   (g_height - box.top - box.bottom) + box.top - 
                }else if(arr[ai] == 0){
                    y = zero_axis
                }else{
                    // y = (arr[ai] / abs_min * (g_height - box.top - box.bottom - zero_axis) * -1) + zero_axis + box.top
                    y = (arr[ai] / abs_min * (g_height - box.top - box.bottom - zero_axis) * -1) + zero_axis + box.top
                }
                
            }else{//都为正数 0 被包含在正数中
                y = (g_height - box.top - box.bottom) - (arr[ai] / max_diff * (g_height - box.top - box.bottom)) + box.top
            }
            points.push([x,y])
        }
        diff.points = points
        all_points.push(points)


        return points
}


/**
 * 更具输入的 val 计算出 arr 中距离最近的数
 * 主要用来处理指针的位置
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



export {
    sign_num,
    maxDiff,
    random,
    calc_point,
    adjacent
}