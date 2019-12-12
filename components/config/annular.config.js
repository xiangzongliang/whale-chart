let annilar_config = {
    colors:['#EBC880','#5C5475','#8279A0','#9A96A7','#CBCDD2','#F8F8F8'],
    //当前选择的颜色的 key
    selectTheme:'default',
    //遮罩
    mask:{
        show:true,
        style:{
            fill:'#44403E',
            opacity:0.1
        }
    },

    //分割线
    cut:{
        show:true,
        style:{
            stroke:'#ffffff',
            lineWidth:1.5
        }
    },
    text:{
        show:true,
        style:{
            text:'文字\n区域',
            textFill:'#666666',
            fontSize : 18,
            textLineHeight : 22
        }
    }
    
}
export {
    annilar_config
}