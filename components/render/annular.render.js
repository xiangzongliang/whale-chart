import { arr_zoom } from '../algorithms/arr_zoom'
import { trig_xy } from '../algorithms/trigonometric'

let annular_render = ({ zrender, CHART, ROW_CONFIG, REFS, frequency }) => {
    console.log(ROW_CONFIG)
    let dpr = ROW_CONFIG.dpr,
        _DIFF = {
            width:  CHART.getWidth(),
            height: CHART.getHeight(),
        },
        colors =  ROW_CONFIG.colors || {},
        get_color = (index) => {
            return colors[(index*1) % colors.length]
        },
        key = ROW_CONFIG.columns[0].key || '',
        mask = ROW_CONFIG.mask || {},
        cut = ROW_CONFIG.cut || {},
        text = ROW_CONFIG.text || {},
        chartData = ROW_CONFIG.chartData || [],
        total_num = 0, //值的总和  用于求百分比
        calc_arr = [],


        cx = _DIFF.width / 2,  //圆心 x
        cy = _DIFF.height / 2,
        default_r = _DIFF.width

        //取较小的距离加百分比
        if(_DIFF.width > _DIFF.height){
            default_r = _DIFF.height
        }
        default_r = default_r / 2 * 0.8



    let r = default_r, //半径
        r0 = default_r * 0.45    //内半径
    

    //得到总大小
    for(let ci in chartData){
        let num = parseFloat(chartData[ci][key])
        if(!isNaN(num)){
            total_num += num
        }
    }

    //计算占比
    for(let ci in chartData){
        let num = parseFloat(chartData[ci][key])
        if(!isNaN(num)){
            calc_arr.push({
                percentage : num / total_num,
                angle : num / total_num * 360,
                value : num
            })
        }
    }


    /**
     * 开始绘制扇形图
     */
    let startAngle = -90,
        endAngle = -90

    for(let ci in calc_arr){
        let C_item = calc_arr[ci]


        startAngle = endAngle
        endAngle = endAngle + C_item.angle

        let RD_sector = new zrender.Sector({
            shape:{
                cx,
                cy,
                r,
                r0,
                startAngle : Math.PI * startAngle/180,
                endAngle : Math.PI * endAngle/180,
                clockwise : true,   //顺时针
            },
            style:{
                fill:get_color(ci)
            }
        })
        CHART.add(RD_sector) 

        /**
         * 绘制分割线
         */
        if(cut.show === true){
            let start_xy = trig_xy({
                cx,
                cy,
                r:r0,
                angle : startAngle * -1
            }),
            end_xy = trig_xy({
                cx,
                cy,
                r,
                angle : startAngle * -1
            })
        
            let RD_line = new zrender.Line({
                shape:{
                    x1:start_xy.x,
                    y1:start_xy.y,
                    x2:end_xy.x,
                    y2:end_xy.y,
                },
                style:Object.assign({},cut.style,{
                    lineWidth:dpr(cut.style.lineWidth)
                }),
                zlevel:100
            })
            CHART.add(RD_line)
        }
        
    }




    /**
     * 绘制灰色遮挡
     */
    if(mask.show === true){
        let RD_sector = new zrender.Sector({
            shape:{
                cx : _DIFF.width / 2,
                cy : _DIFF.height / 2,
                r : r0*1.26,
                r0 : r0,
                clockwise : true,   //顺时针
            },
            style:Object.assign({},mask.style),
            zlevel:200
        })
        CHART.add(RD_sector)
    }
     

    /**
     * 渲染中间的文字
     */
    if(text.show === true){
        let RD_text = new zrender.Rect({
            shape:{
                x:cx,
                y:cy,
                width:0,
                height:0,
            },
            style:Object.assign({},text.style,{
                fontSize : dpr(text.style.fontSize),
                textLineHeight : dpr(text.style.textLineHeight)
            })
        })
        CHART.add(RD_text)
    }
}
export {
    annular_render
}