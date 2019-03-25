import Vue from 'vue'
import Router from 'vue-router'
import * as types from '../store/mutation-type'
import routes from './routes'
import { toParams } from '../utils/to-params'

Vue.use(Router)

export function createRouter () {
  let router = new Router({
    routes
  })

  /**
   * 切换动画名称
   */
  const SLIDE_LEFT = 'slide-left'
  const SLIDE_RIGHT = 'slide-right'

  router.beforeEach(async (to, from, next) => {
    // 判断当前是前进还是后退，添加不同的动画效果
    if (router.app.$store) {
      let pageTransitionName = isForward(to, from) ? SLIDE_LEFT : SLIDE_RIGHT
      router.app.$store.commit(`appShell/${types.SET_PAGE_TRANSITION_NAME}`, { pageTransitionName })
    }
    /* 设置title */
    if (to.name) {
      router.app.$setWechatTitle(to.name)
    } else {
      router.app.$setWechatTitle('')
    }
    /* 下一步 */
    // 抓取code
    if (window.location.href.indexOf('code=') !== -1) {
      if (!to.query.code) {
        let query = toParams()
        sessionStorage.setItem('code', query.code)
      } else {
        sessionStorage.setItem('code', to.query.code)
      }
    }
    next()
  })

  return router
}

/**
 * to 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
 * @type {Array.<string>}
 * @const
 */

const ALWAYS_BACK_PAGE = ['列表']

/**
 * to 如果在这个列表中，始终采用从右到左的滑动效果
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_FORWARD_PAGE = []

/**
 * 历史记录，记录访问过的页面的 fullPath
 * @type {Array.<string>}
 * @const
 */
export const HISTORY_STACK = []

/**
 * 判断当前是否是前进，true 表示是前进，否则是回退
 * @param {Object} to 目标 route
 * @param {Object} from 源 route
 * @return {boolean} 是否表示返回
 */
function isForward (to, from) {
  // debugger
  // to 如果在这个列表中，始终认为是后退
  if (to.name && ALWAYS_BACK_PAGE.indexOf(to.name) !== -1) {
    // 清空历史
    HISTORY_STACK.length = 0
    return false
  }

  // 如果是从 ALWAYS_BACK_PAGE 过来的，那么永远都是前进
  if (from.name && ALWAYS_BACK_PAGE.indexOf(from.name) !== -1) {
    HISTORY_STACK.push(to.fullPath)
    return true
  }

  // to 如果在这个列表中，始终认为是前进
  if (to.name && ALWAYS_FORWARD_PAGE.indexOf(to.name) !== -1) {
    HISTORY_STACK.push(to.fullPath)
    return true
  }

  // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
  let index = HISTORY_STACK.indexOf(to.fullPath)
  if (index !== -1) {
    HISTORY_STACK.length = index + 1
    return false
  }

  // 将 to.fullPath 加到栈顶
  HISTORY_STACK.push(to.fullPath)
  return true
}

