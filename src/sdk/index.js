// import env from '@/env'
// import config from '@/config'
import weixin from './weixin'
import fetch from './fetch'
export default {
  /**
   *用于防止iPhone中设置document.title失败
   *
   * @param {*} title
   */
  setWechatTitle (title) {
    document.title = title
    var iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    iframe.setAttribute('src', 'https://www.baidu.com/img/baidu_jgylogo3.gif')
    var iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  },
  ...weixin,
  fetch
}
