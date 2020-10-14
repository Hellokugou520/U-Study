function wheelDelta(ev) {
    if (ev.wheelDelta) {
        // 谷歌和IE
        return ev.wheelDelta; // 上：120  下：-120
    } else {
        // 火狐
        return ev.detail * -40; // 上：-3     下：3
    }
}
; (function ($) {
    $.fn.extend({
        slideBar: function () {
            // this: 范围容器
            // 被滚动的内容

            var children = this.children();

            // 重新布局
            var slideContent = $(`<div class="slideContent">
                <div class="clearfix"></div>
                <div class="clearfix"></div>
            </div>`);

            this.children().insertAfter(slideContent.children().eq(0));
            slideContent.appendTo(this);
            slideContent.css({
                'transition': 'top 0.2s',
                position: 'relative'
            });

            // -----------------------
            // 求高度
            var boxH = this.innerHeight(); // 容器盒子高
            var slideContentH = slideContent.innerHeight(); // 滚动盒子高

            if (boxH >= slideContentH) {
                this.empty().append(children);
                return fasle;
            } else {
                this.css({
                    position: 'absolute',
                    overflow: 'hidden'
                });
            }

            // ----------------------------
            // 创建滚动条
            var slideRight = $('<div>');
            slideRight.css({
                position: 'absolute',
                right: 0,
                top: 0,
                height: boxH,
                width: 3,
                background: '#ccc'
            });
            slideRight.appendTo(this);

            // 滑块
            var slideOH = boxH * boxH / slideContentH;
            var slideO = $('<div>');
            slideO.css({
                position: 'absolute',
                right: 0,
                top: 0,
                transition: 'top 0.2s',
                height: slideOH,
                width: '100%',
                background: 'rgb(87, 205, 252)'
            });
            slideO.appendTo(slideRight);

            // 滚动
            this.on('mousewheel DOMMouseScroll', function (ev) {
                ev.preventDefault();
                var top = slideO.get(0).offsetTop; // 顶边的距离
                if (wheelDelta(ev.originalEvent) > 0) {
                    // 向上
                    top -= 100
                } else {
                    // 向下
                    top += 100
                }

                if (top < 0) {
                    top = 0
                } else if (top > boxH - slideOH) {
                    top = boxH - slideOH + 20;
                }

                slideO.css('top', top);

                // ----------------
                var b = top / (boxH - slideOH);
                slideContent.css('top', -b * (slideContentH - boxH))

            });
        }
    });
})(jQuery);