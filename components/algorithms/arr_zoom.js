/**
 * 数组等倍放大器
 * 用于处理虚线的兼容显示
 * 只能处理单层数组
 */
/**
 * 
 * @arr {*} array || object 
 */
let arr_zoom = ({ arr = [],dpr }) =>{
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
    arr_zoom
}