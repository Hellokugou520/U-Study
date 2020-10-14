var banner = document.querySelector('.banner');
var ul = document.querySelector('.banner ul');
var li = document.querySelectorAll('.banner ul li');
var lBtn = document.querySelector('.banner_right .leftBtn');
var rBtn = document.querySelector('.banner_right .rightBtn');
var span = document.querySelectorAll('.banner_right .page span');
var clientW = document.documentElement.clientWidth;
var count = 0;
var timer = null;

ul.style.width = li.length * clientW + 'px';
for (var i = 0; i < li.length; i++) {
    li[i].style.width = clientW + 'px';
}

timer = setInterval(auto, 3000);
banner.onmouseover = function () {
    clearInterval(timer);
    lBtn.style.display = 'block';
    rBtn.style.display = 'block';
}
banner.onmouseout = function () {
    timer = setInterval(auto, 3000);
    lBtn.style.display = 'none';
    rBtn.style.display = 'none';
}

lBtn.onclick = function () {
    count--;
    if (count < 0) {
        count = li.length - 1;
    }
    change();
}
rBtn.onclick = auto;

for (var i = 0; i < span.length; i++) {
    span[i].index = i;
    span[i].onclick = function () {
        count = this.index;
        change();
    }
}

function auto() {
    count++;
    if (count >= li.length) {
        count = 0;
    }
    change();
}

function change() {
    move(ul, {
        left: -clientW * count
    });
    for (var i = 0; i < span.length; i++) {
        span[i].className = '';
    }
    span[count].className = 'active';
}