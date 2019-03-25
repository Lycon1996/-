import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import appShell from './modules/appShell'
import globalData from './modules/globalData'

// regist Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    appShell,
    globalData
  }
})
