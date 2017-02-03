/*
    通过js调整viewport及html字体大小实现h5适配
    chayangge@163.com
    为计算方便，目前设置：1rem = 10px，所以：如果设计稿某宽20px，css可直接定义为2rem
    （当然可自定义为默认的16px，如果不怕计算麻烦）
*/
;
(function(window) {
    'use strict';
    (function() {
        var doc = document.documentElement,
            docHeight = doc.clientHeight,
            metaEle = document.querySelector("meta[name='viewport']"),
            dpr = window.devicePixelRatio || 1,
            scale = 1 / dpr,
            content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';
        dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);
        // 重定义meta标签的content，主要更改scale
        if (metaEle) {
            metaEle.setAttribute("content", content);
        } else {
            var viewportEle = document.createElement("meta");
            viewportEle.setAttribute("name", "viewport");
            viewportEle.setAttribute("content", content);
        }
        // 设置html根字体
        function setHtmlFontSize() {
            var width = document.documentElement.getBoundingClientRect().width || window.innerWidth;
            if (width / dpr > 540) {
                width = 540 * dpr;
            }
            document.documentElement.style.fontSize = width / 10 + "px";
        }
        window.addEventListener('load', setHtmlFontSize, false);
        window.addEventListener("resize", setHtmlFontSize, false);
        window.addEventListener('DOMContentLoaded', function(e) {
            setHtmlFontSize();
            // 设置body字体，供内部继承
            window.document.body.style.fontSize = 12 * dpr + 'px';
        }, false);

        setTimeout(function() {
            // 异步调用,防意外
            setHtmlFontSize();
            // 防止活动页无内容大背景被拉出的手机键盘折叠
            // window.document.body.style.minHeight = docHeight + "px";

        }, 200)
    })()

})(window);
