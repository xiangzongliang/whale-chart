import { sign_num } from '../algorithms/sign_num'
import { max_diff } from '../algorithms/max_diff'
const core_line_bar = ({ ROW_CONFIG, _DIFF, arr}) =>{
    let item_num = ROW_CONFIG.grid.horizontal.num || 4,
        item_val,
        item_height,
        diff = max_diff(arr),
        max = diff.max,
        min = diff.min,
        _box_ = ROW_CONFIG._box_,
        zero_top,
        zero_bottom,
        zero_axis





    item_val = sign_num(diff.max_diff /  item_num,true) //放大器

    //这里是很核心的一个步骤
    let max_surplus = Math.abs(max % item_val),
        min_surplus = Math.abs(min % item_val)

        item_val = item_val + (max_surplus + min_surplus) / item_num//特殊备注这行代码,不要随便修改它



        item_val = sign_num(item_val)

        if(item_val === 0){
            let N_item_val = diff.max_diff /  item_num
            if(N_item_val == 0){
                item_val = 1
            }else{
                item_val = N_item_val.toFixed(4)
            }
        }


        zero_top = Math.ceil(Math.abs(max) / item_val)
        zero_bottom = Math.ceil(Math.abs(min) / item_val)
        item_height = (_DIFF.height - _box_.top - _box_.bottom) / (zero_top + zero_bottom)




    //计算 0 轴
    if(max == 0 && min == 0){ //当所有值都为0 的时候 //特殊处理
        zero_axis = _DIFF.height - _box_.bottom

        return {
            diff,
            item_val : 1,
            item_height : (_DIFF.height - _box_.top - _box_.bottom) / item_num,
            zero_axis,
            zero_top : item_num,
            zero_bottom : 0,
        }
    }else if(max <= 0){ //全部为负数
        zero_axis = _box_.top
    }else if(min > 0){ //全部为正数字
        zero_axis = _DIFF.height - _box_.bottom
    }else{ //正负数都有
        zero_axis =  item_height * zero_top + _box_.top
    }



    return {
        diff,
        item_val,
        item_height,
        zero_axis,
        zero_top,
        zero_bottom,
    }
}


export {
    core_line_bar
}