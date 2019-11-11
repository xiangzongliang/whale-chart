let mouseHandler = [
    'click', 'dblclick', 'mousewheel', 'mouseout',
    'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

let touchHandler = [
    'touchstart', 'touchend', 'touchmove'
];

/**
 * 判断设备是否支持touch 事件
 * s事件监听优先使用touch 事件
 */
let isMouse = () => {
    // return "ontouchend" in document ? true : false;
    // return "onmousemove" in document ? true : false;
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
    //该方法来源于jquery mobile
}

export {
    isMouse,
    touchHandler,
    mouseHandler
}