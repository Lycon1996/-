export function addWaterMark (pDom, settings) {
  // 默认设置
  let defaultSettings = {
    watermark_txt: 'text',
    watermark_x: 20, // 水印起始位置x轴坐标
    watermark_y: 70, // 水印起始位置Y轴坐标
    watermark_rows: 0, // 水印行数，为 0 则自动计算。
    watermark_cols: 0, // 水印列数，为 0 则自动计算。
    watermark_x_space: 0, // 水印x轴间隔
    watermark_y_space: 70, // 水印y轴间隔
    watermark_color: '#999', // 水印字体颜色
    watermark_alpha: 0.2, // 水印透明度
    watermark_fontsize: '12px', // 水印字体大小
    watermark_font: '微软雅黑', // 水印字体
    watermark_width: 150, // 水印宽度
    watermark_height: 80, // 水印长度
    watermark_angle: 15 // 水印倾斜度数
  }
  // 采用配置项替换默认值
  if (typeof settings === 'object') {
    let src = settings || {}
    for (let key in src) {
      if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key]) {
        continue
      } else if (src[key]) {
        defaultSettings[key] = src[key]
      }
    }
  }

  // let oTemp = document.createDocumentFragment()
  let maskDivWrap = document.createElement('div')
  maskDivWrap.id = 'maskDivWrap'
  maskDivWrap.style.pointerEvents = 'none'
  maskDivWrap.style.position = 'absolute'
  maskDivWrap.style.top = 0
  maskDivWrap.style.left = 0
  maskDivWrap.style.width = '100%'
  maskDivWrap.style.height = '100%'
  maskDivWrap.style.overflow = 'hidden'

  // 获取父级最大宽度
  let pageWidth = Math.max(pDom.scrollWidth, pDom.clientWidth)
  // 获取父级最大长度
  let pageHeight = Math.max(pDom.scrollHeight, pDom.clientHeight)

  // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  let watermarkWidth = parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1))
  if (defaultSettings.watermark_cols === 0 || (watermarkWidth > pageWidth)) {
    defaultSettings.watermark_cols = parseInt((pageWidth - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space))
    defaultSettings.watermark_x_space = parseInt((pageWidth - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1))
  }
  // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  let watermarkHeight = parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1))
  if (defaultSettings.watermark_rows === 0 || (watermarkHeight > pageHeight)) {
    defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + pageHeight - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))
    defaultSettings.watermark_y_space = parseInt((pageHeight - defaultSettings.watermark_y - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1))
  }
  let x = 0
  let y = 0
  for (let i = 0; i < defaultSettings.watermark_rows; i++) {
    y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i
    for (let j = 0; j < defaultSettings.watermark_cols; j++) {
      x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j
      let maskDiv = document.createElement('div')
      maskDiv.id = 'maskDiv' + i + j
      maskDiv.appendChild(document.createTextNode(defaultSettings.watermark_txt))
      // 设置水印div倾斜显示
      maskDiv.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      maskDiv.style.visibility = ''
      maskDiv.style.position = 'absolute'
      maskDiv.style.left = x + 'px'
      maskDiv.style.top = y + 'px'
      maskDiv.style.overflow = 'hidden'
      maskDiv.style.zIndex = '10'
      // maskDiv.style.border='solid #eee 1px'
      maskDiv.style.opacity = defaultSettings.watermark_alpha
      maskDiv.style.fontSize = defaultSettings.watermark_fontsize
      maskDiv.style.fontFamily = defaultSettings.watermark_font
      maskDiv.style.color = defaultSettings.watermark_color
      maskDiv.style.textAlign = 'center'
      maskDiv.style.width = defaultSettings.watermark_width + 'px'
      maskDiv.style.height = defaultSettings.watermark_height + 'px'
      maskDiv.style.display = 'block'
      maskDiv.style.pointerEvents = 'none'
      maskDivWrap.appendChild(maskDiv)
    }
  }
  pDom.appendChild(maskDivWrap)
}

export function removeWaterMark (pDom) {
  let maskDivWrap = document.querySelector('#maskDivWrap')
  if (maskDivWrap) {
    pDom.removeChild(maskDivWrap)
  }
}
