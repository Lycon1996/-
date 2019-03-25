export default function () {
  let option = {
    cdn: 'https://cdn.jsdelivr.net/npm/vconsole@3.1.0/dist/vconsole.min.js',
    activeParams: 'vConsole', // 激活参数名称,
    loadCompleted: function () {
      /* eslint-disable no-undef */
      window.vConsole = new window.VConsole({
        defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
        maxLogNumber: 1000,
        onReady: function () {
          if (getParameter(option.activeParams) === 'true') {
            vConsole.showSwitch()
          } else {
            vConsole.hideSwitch()
          }
        },
        onClearLog: function () {
        }
      })
    }
  }
  if (getParameter(option.activeParams)) {
    loadScript(option.cdn, option.loadCompleted)
  }
}

function getParameter (n) {
  let m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)'))
  let result = !m ? '' : decodeURIComponent(m[1])
  return result || getParameterByName(n)
}

function getParameterByName (name, url) {
  if (!url) url = window.location.href
  /* eslint-disable no-useless-escape */
  name = name.replace(/[\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function loadScript (src, callback) {
  let s
  let r
  let t
  r = false
  s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = src
  s.onload = s.onreadystatechange = function () {
    // console.log( this.readyState ); //uncomment this line to see which ready states are called.
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true
      callback()
    }
  }
  t = document.getElementsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}
