exports.install = function (Vue, options) {
  /**
   * 生成随机颜色数组
   * @param count 为生成数组的元素个数
   */
  Vue.prototype.randomColor = function(count) {
    var randomColors = []
    for (let i = 0; i < count; i++) {
      let red = Math.round(Math.random() * 255)
      let green = Math.round(Math.random() * 255)
      let blue = Math.round(Math.random() * 255)
      randomColors.push(`rgba(${red}, ${green}, ${blue}, 0.7)`)
    }
    return randomColors
  }
  /**
   * 毫秒数转时间
   * @param ms 毫秒
   */
  Vue.prototype.beTime = function(ms, format) {
    var date = new Date(ms)
    var fmt = format !== undefined ? format : 'yyyy-MM-dd hh:mm'
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  }
  /**
   * 比较精确的两数相乘
   * @param {*乘数} arg1
   * @param {*被乘数} arg2
   */
  Vue.prototype.accMul = function (arg1, arg2) {
    var m = 0
    var s1 = arg1.toString()
    var s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
      // console.log(e)
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
      // console.log(e)
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }
  /**
   * 比较精确的两数相除
   * @param {*被除数} arg1
   * @param {*除数} arg2
   */
  Vue.prototype.accDiv = function (arg1, arg2) {
    var t1 = 0
    var t2 = 0
    var r1
    var r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * (10 ** t2 - t1)
  }
  Vue.prototype.noValue = function (value) {
    return value === '{}' || value === '[]' || value === '' || value === undefined || value === null || value === 'null'
  }
  Vue.prototype.isPhoneNumber = function (value) {
    //  && value.length === 11
    if (typeof value === 'string') {
      // let reg = /^1[0-9]{10}$/
      // 国内国外的手机号都可以，这里就只验证输入的是数字就行
      let reg = /^[0-9]*$/
      return reg.test(value)
    }
    return false
  }
  Vue.prototype.isEmail = function (value) {
    if (typeof value === 'string') {
      var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      return reg.test(value)
    }
    return false
  }
  Vue.prototype.eventbus = new Vue()
  // 筛选条件文字宽度
  Vue.prototype.filterWidth = function () {
    let language = JSON.parse(window.localStorage.getItem('immi_language'))
    return language === 'zh_CN' ? 110 : 220
  }
}
