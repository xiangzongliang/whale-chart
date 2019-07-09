
var onlyId = 0x0000; //多图时唯一ID

/**
 * 亿万化处理
 * @param {*} val 
 */
let KMB = (val) => {

}

/**
 * 计算一个数组中的最大差值
 * @param {*} arr 
 */
let maxDiff = (arr) => {

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

//默认颜色
let color = ['#33b5e5','#ff8800','#ff3300'];
export {
    KMB,
    maxDiff,
    random,
    color,
}