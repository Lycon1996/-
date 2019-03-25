import { Toast } from 'mint-ui'
import config from '@/config'
import env from '@/env'
import Fetch from 'flyio/dist/npm/fly'
function isJSON (str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  } else {
    return false
  }
}
export default {
  /**
   *检查是否是微信浏览器
   *
   * @returns
   */
  checkIsWeixin () {
    if (!config.isWechat) return
    let ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') >= 0) {
      return true
    } else {
      return false
    }
  },
  /**
   *动态引入微信SDK
   *
   * @returns
   */
  importWeixinSDK () {
    let doc = document
    let type = 'script'
    let ele = doc.createElement(type)
    let oldScr = doc.getElementsByTagName(type)[0]
    ele.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js'
    let promise = new Promise((resolve) => {
      ele.addEventListener('load', () => {
        resolve()
      })
    })
    oldScr.parentNode.insertBefore(ele, oldScr)
    return promise
  },
  /**
   *获取微信配置
   *
   * @param {*} url
   * @param {*} apiList
   */
  async wxConfig (url) {
    if (!config.isWechat || !this.$checkIsWeixin()) return
    const fetch = new Fetch()
    try {
      const wechatConfigUrl = env.wechatConfigUrl ? env.wechatConfigUrl : config.wechatConfig.wechatConfigUrl || ''
      console.log(wechatConfigUrl)
      if ((wechatConfigUrl.indexOf('http://') >= 0 || wechatConfigUrl.indexOf('https://') >= 0)) {
        fetch.config.baseURL = wechatConfigUrl
      } else {
        fetch.config.baseURL = env.host
      }
      fetch.config.headers = {
        'App-Id': env.appID
      }
      const resData = await fetch.post(`${(wechatConfigUrl.indexOf('http://') >= 0 || wechatConfigUrl.indexOf('https://') >= 0) ? '' : wechatConfigUrl}`, {
        url,
        app_id: env.appID
      })
      console.log('data: ', resData.data)
      const data = typeof resData.data === 'string' ? isJSON(resData.data) ? JSON.parse(resData.data) : {} : resData.data
      console.log(data)
      if (data) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [...data.jsApiList] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.error(function (res) {
          Toast('jssdk error:' + res.errMsg)
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  /**
   *配置微信分享接口
   *
   * @param {*} op
   */
  setShare (op) {
    if (!config.isWechat || !this.$checkIsWeixin()) return
    var {title = '', desc = '', link = location.href, imgUrl = '', success = function () {}} = op
    wx.ready(function () {
      wx.onMenuShareAppMessage && wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          success()
          console.log('share success')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('share cancel')
        }
      })
      wx.onMenuShareTimeline && wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接,
        desc: desc, // 分享描述
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          success()
          console.log('share success')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log('share cancel')
        }
      })
      wx.updateAppMessageShareData && wx.updateAppMessageShareData({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标,
        success: function () {
          console.log('update success')
        }
      })
      wx.updateTimelineShareData && wx.updateTimelineShareData({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标,
        success: function () {
          console.log('update success')
        }
      })
    })
  },
  /**
   *用来隐藏微信菜单
   *
   */
  hideMenu (arr = []) {
    if (!config.isWechat || !this.$checkIsWeixin()) return
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: arr // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      })
    })
  },
    /**
   *隐藏分享
   *
   */
  banShare () {
    if (!config.isWechat || !this.$checkIsWeixin()) return
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: ['menuItem:share:facebook', 'menuItem:share:email', 'menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      })
    })
  }
}
