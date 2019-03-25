import Vue from 'vue'
import App from './App'

/* router & 历史栈 */
import { createRouter } from './router'
let router = createRouter()

/* vuex */
import store from './store'

/* import MintUI */
import { Popup } from 'mint-ui'
Vue.component(Popup.name, Popup)

/* 引入 SDK 并挂载在 Vue 上 */
import SDK from './sdk'
for (let i in SDK) {
  Object.defineProperty(Vue.prototype, `$${i}`, { value: SDK[i] })
}

import env from '@/env'
import config from '@/config'
Object.defineProperty(Vue.prototype, `$env`, { value: env })
Object.defineProperty(Vue.prototype, `$config`, { value: config })

/* 引入 better-scroll */
import BScroll from 'better-scroll'

/* 引入 vconsole */
import loadVConsole from './utils/vconsole'
loadVConsole()

/* import rem.js for setting font-size */
import { setRem } from './utils/rem'
setRem(document, window)

/* autoPlay music */
Vue.prototype.$autoPlay = (src, cb) => {
  App.methods.autoPlay(src, cb)
}

/* 返回前一个页面回到原本位置 */
Vue.mixin({
  data () {
    return {
      contentBScrollWrap: null // contentBScroll 容器
    }
  },
  methods: {
    async initBScroll () {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          // ref 必须是 contentBScrollWrap
          if (this.$refs.contentBScrollWrap) {
            // 路由切换后，返回页面滚动前位置。
            // 对于 keep-alive 的页面，滚动情况也会被保存，不需担心。
            // 这里路由切换的返回滚动主要针对没有 keep-alive 的长页面，在 init 时把存在 vuex 里的 scrollY 给到 startY。
            let fullPath = this.$route.fullPath
            let scrollY = this.$store.state.appShell.historyPageScrollY[fullPath] || 0
            let scrollbar = {
              fade: true,
              interactive: false // 1.8.0 新增
            }
            let options = {
              click: true,
              startY: scrollY,
              scrollbar
            }
            // 需要上拉加载更多的页面
            if (this.$route.meta.needPullUp) {
              options.pullUpLoad = {
                threshold: 50
              }
            }
            // 需要下拉刷新的页面
            if (this.$route.meta.needPullUp) {
              options.pullDownRefresh = {
                threshold: 50,
                stop: 20
              }
            }
            this.contentBScrollWrap = new BScroll(this.$refs.contentBScrollWrap, options)
            resolve()
          }
        })
      })
    }
  },
  // 路由切换前，保存页面滚动位置
  beforeRouteLeave (to, from, next) {
    if (this.contentBScrollWrap) {
      let scrollY = this.contentBScrollWrap.y
      this.$store.dispatch('appShell/saveScrollY', { path: from.fullPath, scrollY: scrollY })
    }
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App),
  async created () {
    if (this.$config.isWechat && this.$checkIsWeixin()) {
      console.log('引入微信SDK')
      await this.$importWeixinSDK()
      await this.$wxConfig(location.href.split('#')[0])
    }
  }
})
