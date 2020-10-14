// 播放页

// 切换视频
var video = document.querySelector('video');
var li = document.querySelectorAll('.play .content ul li:nth-of-type(n+2)');
var src = ['5杀.mp4', 'd.v.a四杀.mp4', '路霸三杀.mp4', '麦克雷死斗.mp4', '西格玛.mp4'];

for (var i = 0; i < li.length; i++) {
    li[i].index = i;

    li[i].onclick = function () {
        for (var i = 0; i < li.length; i++) {
            li[i].className = '';
        }
        this.className = 'active';
        video.src = '../video/' + src[this.index];

        // 切换视频后控件样式重置
        now_time.style.width = 0 + 'px';
        dlm.style.left = 0 + 'px';
        play_button.className = '';
    }
}

// 自定义播放控件
var play_button = document.getElementById('play_button');
var l_time = document.getElementById('l_time');

var c_time = document.getElementById('c_time');
var now_time = document.getElementById('now_time');
var dlm = document.getElementById('dlm');

var r_time = document.getElementById('r_time');
var full = document.getElementById('full');

var onOff = true;
var timeW = c_time.offsetWidth;

// 总时长
video.addEventListener('loadedmetadata', function () {
    r_time.innerText = time(video.duration);
});

// 点击视频播放
video.onclick = function () {
    if (onOff) {
        video.play();
        play_button.className = 'photo';
    } else {
        video.pause();
        play_button.className = '';
    }
    onOff = !onOff;
}

// 点击按钮播放
play_button.onclick = function () {
    if (onOff) {
        video.play();
        this.className = 'photo';
    } else {
        video.pause();
        this.className = '';
    }
    onOff = !onOff;
}

// 转换时间显示格式
function time(s) {
    s = Math.floor(s);
    var h = Math.floor(s / 3600);
    var m = Math.floor(s % 3600 / 60);
    var s = Math.floor(s % 60);
    return toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);

    function toTwo(n) {
        if (n < 10) {
            return '0' + n;
        } else {
            return '' + n;
        }
    };
}

// 蓝色进度条
video.ontimeupdate = function () {
    l_time.innerText = time(video.currentTime);

    var now = video.currentTime; // 当前的时长
    var len = video.duration; // 总的时间长
    var L = (now / len) * timeW;
    now_time.style.width = L + 'px';
    dlm.style.left = L + 'px';

    // 播放结束
    if (video.ended) {
        play_button.className = '';
        onOff = true;
    };
}

// 全屏
full.onclick = function () {
    video.requestFullscreen();
    video.controls = '';
}

// 获取位置
function getPos(obj) {
    var pos = { left: 0, top: 0 };
    while (obj) {
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
};

// 拖动进度条
dlm.onmousedown = function (ev) {
    var len = video.duration; // 总的时间长
    var parentL = getPos(this.parentNode).left; // 父级到左边的距离
    var disX = ev.pageX - getPos(this).left; // 鼠标按下时距盒子左边的距离

    // 拖动
    document.onmousemove = function (ev) {
        var left = ev.pageX - disX - parentL;
        if (left < 0) {
            left = 0;
        } else if (left > timeW) {
            left = timeW;
        }
        dlm.style.left = left + 'px';
        now_time.style.width = left + 'px';

        // 更改视频的位置
        video.currentTime = (left / timeW) * len;
    }

    // 抬起
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    }

    return false;
}