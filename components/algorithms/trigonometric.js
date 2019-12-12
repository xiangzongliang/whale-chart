/**
 * 三角函数相关的计算公式
 */

 /**
  * 通过输入圆心、半径、角度 获取坐标点的 x|y
  * 注 : 角度增加  会生成逆时针旋转的线条 
  * 通常将角度转换为负数,则得到顺时针旋转的线条 
  * @cx 圆心x
  * @cy 圆心y
  * @r  半径
  * @angle  角度
  */
let trig_xy = ({ cx=0, cy=0, r=0, angle=0 }) =>{

    angle = angle - 270
    //1000是为了提高精确度  当 r 为 1 时候的精确度
    let x = Math.round(r*Math.sin(Math.PI*angle/180)*1000,4)/1000 + cx,
        y = Math.round(r*Math.cos(Math.PI*angle/180)*1000,4)/1000 + cy
    return {
        x,y
    }
}
 export {
    trig_xy
 }