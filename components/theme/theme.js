import { default_color } from './default.js'
import { black_color } from './black.js'
import { white_color } from './white.js'
let THEME = (zrender,key) => {

    //这里必须深度拷贝一次 /输出的时候再深度拷贝一次
    let callback_Obj = {},
        _black = zrender.util.merge({},default_color,true),
        _white = zrender.util.merge({},default_color,true)



    let all_obj = {
        default : default_color,    //默认主题
        black : zrender.util.merge(_black,black_color,true),        //黑板主题
        white : zrender.util.merge(_white,white_color,true),        //白板主题
    }

    

    return all_obj[key]

}

export {
    THEME
}