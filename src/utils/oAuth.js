import Fly from 'flyio/dist/npm/fly'
import env from '@/env'
import config from '@/config'

export default async function (code) {
  const oAuth = new Fly()
  oAuth.config.baseURL = env.host + env.baseURL
  oAuth.config.withCredentials = true
  console.log(oAuth.config)
  const authUrl = env.authUrl || config.authUrl || ''
  let {data: {access_token, token_type, expires_in}} = await oAuth.post(authUrl, {
    code
  })
  const storageType = env.storageType || config.jwtConfig.storageType || 'localStorage'
  const tokenText = env.token || config.jwtConfig.token || 'token'
  const tokenTypeText = env.tokenType || config.jwtConfig.tokenType || 'tokenType'
  window[storageType].setItem(tokenText, access_token)
  window[storageType].setItem(tokenTypeText, token_type)
  window[storageType].setItem('expires_in', expires_in)
  return {
    access_token,
    token_type,
    expires_in
  }
}
