import { percentage } from '../algorithms'
let cake = ({zrender,RAW_OBJ,ShowConfig}) => {
    let group = new zrender.Group(),
        colors = ShowConfig.colors,
        height = RAW_OBJ.getHeight(),
        width = RAW_OBJ.getWidth(),

        a = new zrender.Sector({
        shape:{
            cx:100,
            cy:100,
            r:50,
            r0:20,
            startAngle : Math.PI * (0.5),
            endAngle : Math.PI * (0 + 1.5),
            clockwise:false,//顺时针
        },
        style:{
            fill:'#DDA544'
        }
    })
    
    percentage({
        arr:undefined
    })
    RAW_OBJ.add(a)
}
export {
    cake
}