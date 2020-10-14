// 导航栏
var fdj = document.querySelector('nav .right li .icon-fangdajing');
var input = document.querySelector('nav .right li input');
var div = document.querySelector('nav .right li div');

fdj.onmouseenter = function () {
    input.style.width = 100 + 'px';
    input.style.paddingLeft = 10 + 'px';
    div.style.borderColor = '#e6e6e6';
    input.focus();
}

input.onblur = function () {
    input.style.width = 0 + 'px';
    input.style.paddingLeft = 0 + 'px';
    div.style.borderColor = 'transparent';
}