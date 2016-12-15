/*
    通过js调整viewport及html字体大小实现h5适配(1rem = 10px)
    chayangge@163.com
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
        window.document.body.style.minHeight = docHeight + "px";
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
        window.addEventListener("resize", setHtmlFontSize, false);

        window.addEventListener('DOMContentLoaded', function(e) {
            // 设置body字体，供内部继承
            window.document.body.style.fontSize = 12 * dpr + 'px';
        }, false);

        setTimeout(function() {
            // 异步调用,防意外
            setHtmlFontSize();
        }, 100)
    })()

})(window);