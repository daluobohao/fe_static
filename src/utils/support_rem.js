/**
 * support rem
 */
(function (doc, win) {
    var docEl = doc.documentElement,     // html Dom
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',      // only ios has ‘orientation’ event, other browser only has window.resize
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=720){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 720) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);