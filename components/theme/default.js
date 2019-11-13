let default_color = {
    colors:['#CCA663','#6386CC','#FF9800','#6AA84F','#9800FF'], //绘图的颜色顺序

    //轴 [线、字] 颜色
    axis:{
        left:{
            text:{
                style:{
                    textFill:'#9B9B9C'
                }
            }
        },
        right:{
            text:{
                style:{
                    textFill:'#9B9B9C'
                }
            }
        },
        bottom:{
            line:{
                style:{
                    stroke:"#464647",
                }
            },
            text:{
                style:{
                    textFill:'#9B9B9C'
                }
            }
        }



    },
    grid:{
        horizontal:{
            style:{
                stroke:'#464647'
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
    default_color
}