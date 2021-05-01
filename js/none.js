
// let normalise = new fullScroll({
//     mainElement: "main"
// });
if (document.addEventListener) {
    document.removeEventListener('mousewheel', full.mouseWheelAndKey);
    document.removeEventListener('wheel', full.mouseWheelAndKey);
    document.removeEventListener('keyup', full.mouseWheelAndKey);
    document.removeEventListener('touchstart', full.touchStart);
    document.removeEventListener('touchend', full.touchEnd); 
    window.removeEventListener("hashchange", full.hashChange);
} else {
    document.detachEvent('onmousewheel', full.mouseWheelAndKey);
    document.detachEvent('onkeyup', full.mouseWheelAndKey);
}


