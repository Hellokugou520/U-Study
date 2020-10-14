function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

function move(obj, json, callback) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var onOff = true; // 开头

        // for里面改开关的状态
        for (var attr in json) {
            var target = json[attr]; // target是目标  attr是属性

            if (attr === 'opacity') {
                var iNow = getStyle(obj, 'opacity') * 100; // 当前的位置
            } else {
                var iNow = parseInt(getStyle(obj, attr)); // 当前的位置
            }

            var dir = (target - iNow) / 10; // (目标 - 当前) / 系数
            dir = dir > 0 ? Math.ceil(dir) : Math.floor(dir);

            iNow += dir; // 下一步应该运动到的位置

            if ((iNow >= target && dir > 0) || (iNow <= target && dir < 0)) {
                iNow = target;
            }

            if (attr === 'opacity') {
                obj.style.opacity = iNow / 100;
                obj.style.filter = 'alpha(opacity = ' + iNow + ')';
            } else {
                obj.style[attr] = iNow + 'px';
            }

            if (iNow != target) {
                onOff = false;
            }
        }

        if (onOff) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}