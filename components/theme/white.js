let white_color = {
    colors:['#EDD095','#ACC4F0','#FF9800'], //绘图的颜色顺序

    //轴 [线、字] 颜色
    axis:{
        left:{
            text:{
                style:{
                    textFill:'#666666'
                }
            }
        },
        right:{
            text:{
                style:{
                    textFill:'#666666'
                }
            }
        },
        bottom:{
            line:{
                style:{
                    stroke:"#CCCCCC",
                }
            },
            text:{
                style:{
                    textFill:'#666666'
                }
            }
        }



    },
    grid:{
        horizontal:{
            style:{
                stroke:'#CCCCCC'
            }
        }
    },
    pointer:{
        vertical:{
            style:{
                stroke:'#CCA663'
            }
        }
    }
}


export {
    white_color
}