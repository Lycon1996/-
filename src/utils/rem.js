/*
 * base on clientWidth,then transform to rem,default 320px == 20rem
 */
export function setRem (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let reCaculate = function () {
    var clientWidth = docEl.clientWidth
    // console.log(clientWidth)
    if (!clientWidth) return
    docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, reCaculate, false)
  doc.addEventListener('DOMContentLoaded', reCaculate, false)
}
