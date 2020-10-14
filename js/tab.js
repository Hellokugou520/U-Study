// 选项卡
function tab(liValue, divValue) {
    var li = document.querySelectorAll(liValue);
    var div = document.querySelectorAll(divValue);

    for (var i = 0; i < li.length; i++) {
        li[i].index = i;

        li[i].onmouseover = function () {
            for (var i = 0; i < li.length; i++) {
                li[i].className = '';
                div[i].style.display = 'none';
            }

            this.className = 'active';
            div[this.index].style.display = 'block';
        }
    }
}