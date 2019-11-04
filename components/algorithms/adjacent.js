/**
 * 更具输入的 val 计算出 arr 中距离最近的数
 * 主要用来处理折线和柱状图指针的位置
 * @param {*} val 
 * @param {*} part 
 * @param {*} arr 
 */
const adjacent = (val,part,arr)=>{
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
    adjacent
}