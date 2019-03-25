/**
 * @file global data store
 * @author douwencan(douwencan1994@163.com)
 */

let state = {

  /**
   * 公众号二维码
   *
   * @type {string}
   */
  qrCode: '',

  /**
   * banner
   *
   * @type {string}
   */
  banner: '',

  /**
   * 是否需要关注
   *
   * @type {boolean}
   */
  needSubscribe: true,

  /**
   * 用户昵称
   *
   * @type {string}
   */
  nickname: '',

  /**
   * 用户头像
   *
   * @type {string}
   */
  avatar: '',

  /**
   * 用户是否关注了公众号
   *
   * @type {boolean}
   */
  hasSubscribe: true
}

let mutations = {
  setQrCode (state, qrCode) {
    state.qrCode = qrCode
  },
  setBanner (state, banner) {
    state.banner = banner
  },
  setNeedSubscribe (state, needSubscribe) {
    state.needSubscribe = needSubscribe
  },
  setNickname (state, nickname) {
    state.nickname = nickname
  },
  setAvatar (state, avatar) {
    state.avatar = avatar
  },
  setHasSubscribe (state, hasSubscribe) {
    state.hasSubscribe = hasSubscribe
  }
}

export default {
  namespaced: true,
  /* eslint-disable */
  mutations,
  state
}
