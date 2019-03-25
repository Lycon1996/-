/**
 * @file app shell store
 * @author douwencan(douwencan1994@163.com)
 */

import * as types from '../mutation-type'

let state = {

  /**
   * 是否需要页面切换动画
   *
   * @type {boolean}
   */
  needPageTransition: true,

  /**
   * 多个页面是否处于切换中
   *
   * @type {boolean}
   */
  isPageSwitching: false,

  /**
   * 多个页面切换效果名称
   *
   * @type {string}
   */
  pageTransitionName: '',

  /**
   * 上个页面 scroll 的信息
   *
   * @type {Object}
   */
  historyPageScrollY: {}
}

let actions = {

  /**
   * 开启页面切换动画
   *
   * @param {Function} commit commit
   */
  enablePageTransition ({ commit }) {
    commit(types.ENABLE_PAGE_TRANSITION, true)
  },

  /**
   * 关闭页面切换动画
   *
   * @param {Function} commit commit
   */
  disablePageTransition ({ commit }) {
    commit(types.DISABLE_PAGE_TRANSITION, false)
  },

  /**
   * 设置页面是否处于切换中
   *
   * @param {Function} commit commit
   * @param {boolean} isPageSwitching isPageSwitching
   */
  setPageSwitching ({ commit }, isPageSwitching) {
    commit(types.SET_PAGE_SWITCHING, isPageSwitching)
  },

  /**
   * 保存页面 scroll 高度
   *
   * @param {[type]} options.commit [description]
   * @param {string} options.path path
   * @param {number} options.scrollY scrollTop
   */
  saveScrollY ({ commit }, { path, scrollY }) {
    commit(types.SAVE_SCROLLY, { path, scrollY })
  }
}

let mutations = {
  [types.SET_PAGE_SWITCHING] (state, isPageSwitching) {
    state.isPageSwitching = isPageSwitching
  },
  [types.SET_PAGE_TRANSITION_NAME] (state, { pageTransitionName }) {
    state.pageTransitionName = pageTransitionName
  },
  [types.SAVE_SCROLLY] (state, { path, scrollY }) {
    state.historyPageScrollY[path] = scrollY
  }
}

export default {
  namespaced: true,
  /* eslint-disable */
  actions,
  mutations,
  state
}
