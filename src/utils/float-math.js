/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 *
 * @param num1 加数1
 * @param num2 加数2
 */
function numAdd (num1, num2) {
  let baseNum = 0
  let baseNum1 = 0
  let baseNum2 = 0
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  return (num1 * baseNum + num2 * baseNum) / baseNum
}
/**
 * 加法运算，避免数据相减小数点后产生多位数和计算精度损失。
 *
 * @param num1 被减数
 * @param num2 减数
 */
function numSub (num1, num2) {
  let baseNum = 0
  let baseNum1 = 0
  let baseNum2 = 0
  let precision = 0// 精度
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
}
/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 *
 * @param num1 被乘数
 * @param num2 乘数
 */
function numMulti (num1, num2) {
  let baseNum = 0
  try {
    baseNum += num1.toString().split('.')[1].length
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split('.')[1].length
  } catch (e) {
  }
  return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
}
/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 *
 * @param num1 被除数
 * @param num2 除数
 */
function numDiv (num1, num2) {
  let baseNum1 = 0
  let baseNum2 = 0
  let baseNum3 = 0
  let baseNum4 = 0
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum3 = Number(num1.toString().replace('.', ''))
  baseNum4 = Number(num2.toString().replace('.', ''))
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
}

export default {
  numAdd,
  numSub,
  numMulti,
  numDiv
}
