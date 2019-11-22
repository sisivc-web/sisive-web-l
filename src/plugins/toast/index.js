var Toast = {}
var showToast = false // 存储toast显示状态
var toastVM = null // 存储toast vm

Toast.install = function (Vue, options = {width: '', complete: function() {}}) {
  Vue.prototype.$toast = function (tips, config) {
    options.width = config && config.width ? config.width : ''
    options.complete = config && config.complete ? config.complete : function() {}
    if (showToast) return
    if (!toastVM) {
      var ToastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips
          }
        },
        method() {

        },
        template: `<div v-show="show" class="m-toast" style="width: ${options.width}">{{tip}}</div>`
      })
      toastVM = new ToastTpl()
      var tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }
    toastVM.tip = tips
    toastVM.show = showToast = true

    setTimeout(function () {
      toastVM.show = showToast = false
      options.complete()
    }, 2000)
  }
}
module.exports = Toast
