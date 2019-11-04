/**
 * 返回以 x 为底 y 的对数（即logx y）
 * @param {*} x 
 * @param {*} y 
 */
function get_base_log(x, y) {
    return Math.log(y) / Math.log(x);
}
/**
 * 这是一个奇怪的计算公式
 * 大于 0 的数字输出第一位有效数字的值
 * 例如 41 => 40  1203 => 1000  
 * @param {*} val 
 * @param {*} noFixed 0~1 之间的值不取两位小数 
 */
const sign_num = (val, noFixed, fixedNum) => {
    let get_v = parseFloat(val),
        handle = (v)=>{
            let abs_v = Math.abs(v),    //绝对值
                n_v = v.toString(),     //字符串
                len = n_v.length,
                //isFloat = n_v.indexOf('.'), //是否有小数
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
            }else if(abs_v >= 10){ // 10 ~ 99  取整数5的倍数
                calback_val = Math.ceil(abs_v/10)*10
                if(abs_v <= (calback_val - 5)){
                    calback_val = calback_val - 5
                }
            }else if(abs_v >= 1){ // 1 ~ 9
                calback_val = Math.ceil(abs_v)
            }else{ //0 ~ 1
                if(abs_v === 0){
                    calback_val = 0
                }else{
                    if(noFixed === true){
                        calback_val = abs_v
                    }else{
                        calback_val = abs_v.toFixed(fixedNum || 2) * 1
                    }
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
export {
    sign_num,
    get_base_log
}