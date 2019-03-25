/*
 *  capsulation of http request,use 'fly',vue-resource alternative
 *  see detail in https://github.com/wendux/fly
 */

import Fly from 'flyio/dist/npm/fly'
import env from '@/env'
import config from '@/config'
import oAuth from '@/utils/oAuth'
import { toParams } from '@/utils/to-params'
// import qs from 'qs'
import { Toast } from 'mint-ui'
const fly = new Fly()
const wechatAuthUrl = env.wechatAuthUrl || config.wechatAuthConfig.wechatAuthUrl || ''
const wxAuthUrl = `${wechatAuthUrl.indexOf('http://') >= 0 || wechatAuthUrl.indexOf('https://') >= 0 ? wechatAuthUrl : env.host + wechatAuthUrl}?redirect=${encodeURIComponent(location.origin + location.pathname + location.hash)}&app_id=${env.appID}`
const authUrl = env.authUrl || config.authUrl || ''
const loginPage = `${authUrl.indexOf('http://') >= 0 || authUrl.indexOf('http://') >= 0 ? authUrl : env.host + authUrl}`

fly.config.baseURL = env.host + env.baseURL
fly.config.withCredentials = true
// request setting
fly.interceptors.request.use(async function (request) {
  if (config.authenticator === 'jwt') {
    if (config.jwtConfig.authWhiteList.indexOf(request.url) < 0) {
      // 非白名单,则开启校验
      const storageType = env.storageType || config.jwtConfig.storageType || 'localStorage'
      const tokenText = env.token || config.jwtConfig.token || 'token'
      const tokenTypeText = env.tokenType || config.jwtConfig.tokenType || 'tokenType'
      let token = window[storageType].getItem(tokenText)
      let tokenType = window[storageType].getItem(tokenTypeText)
      let code = sessionStorage.getItem('code')
      if (!token) {
        if (config.isNeedWechatAuth && code) {
          // 无token,微信认证成功
          // 锁定队列
          fly.lock()
          let res = await oAuth(code)
          sessionStorage.removeItem('code')
          request.headers['Authorization'] = `${res.token_type} ${res.access_token}`
          // 释放队列
          fly.unlock()
          return request
        }
        return request
      } else {
        request.headers['Authorization'] = `${tokenType} ${token}`
        return request
      }
    }
  }
  return request
})

fly.interceptors.response.use(async function (config, promise) {
  return config
}, async function (error, promise) {
  if (error.status === 401) {
        // 如果此时有token,清除token
    const storageType = env.storageType || config.jwtConfig.storageType || 'localStorage'
    const tokenText = env.token || config.jwtConfig.token || 'token'
    let token = window[storageType].getItem(tokenText)
    if (token) {
      // 一旦出现401,立即删除token
      window[storageType].removeItem(tokenText)
    }
    if (config.isWechat && config.isNeedWechatAuth) {
      // 监听hashchage事件,防止微信授权后并没有真正重定向
      window.addEventListener('hashchange', function () {
        console.log('hashchange in fetch', location.href)
        // 触发了hashchange, 就地处理地址中的code
        let query = toParams()
        console.log('query', query)
        if (query.code) {
          location.reload()
        }
      }, false)
          // 如果是要求微信授权,则直接跳去微信授权页面(wechatAuthUrl)
      console.log('need location href to wxAuthUrl')
      console.log(wxAuthUrl)
      // 重定向到授权页面
      location.href = wxAuthUrl
    } else {
          // 否则,前往auth中提供的地址(config.authUrl)
      console.log('need location href to loginPage')
      location.href = loginPage
    }
    return promise.reject(error)
  } else if (error.status === 404 || error.status === 500 || error.status === 400) {
    console.error(error)
    Toast('网络错误!')
    return promise.reject(error)
  } else if (error.status === 429) {
    console.log('request are too fast')
    Toast('您太快了,请稍后重试!')
    return promise.reject(error)
  } else if (error.status === 403) {
    console.log('forbidden request')
    console.error(error)
    Toast('您无权访问')
    return promise.reject(error)
  } else {
    // 其他请求,直接抛出让业务去处理
    return promise.reject(error)
  }
})

export default fly
