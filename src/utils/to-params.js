/**
 *  * {a:1,b:2,c:3} -> params(...) -> a=1&b=2&c=3
 */
export const toParams = () => {
  var url = location.search // 获取url中"?"符后的字串
  var hash = location.hash
  var queryIndex = hash.indexOf('?')
  if (queryIndex >= 0 && hash.slice(queryIndex + 1)) {
    url === '' ? url += '?' + hash.slice(queryIndex + 1) : url += '&' + hash.slice(queryIndex + 1)
  }
  // alert(JSON.stringify(location.search))
  // alert(JSON.stringify(location.hash))
  // alert(JSON.stringify(url))
  var theRequest = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  // alert(JSON.stringify(theRequest))
  return theRequest
}
