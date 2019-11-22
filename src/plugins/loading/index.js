var Loading = {}
var showLoad = false // 存储loading显示状态
var loadNode = null // 存储loading节点元素

Loading.install = function(Vue) {
  Vue.prototype.$loading = function(tips, status) {
    if (loadNode && status === 'close') {
      loadNode.show = showLoad = false
      return
    } else if (showLoad) {
      return
    } else if (status === undefined) {
      var LoadTpl = Vue.extend({
        data: function() {
          return {
            show: showLoad,
            tip: tips
          }
        },
        template: `<div v-show="show" class="m-load-mark"><div class="m-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><p style="max-width: 100%;white-space: pre-wrap;overflow: hidden;line-height: 20px;">{{tip}}</p></div></div>`
      })
      if (!loadNode) {
        loadNode = new LoadTpl()
        var tpl = loadNode.$mount().$el
        document.body.appendChild(tpl)
      }
      loadNode.tip = tips !== undefined ? tips : (JSON.parse(window.localStorage.getItem('immi_language')) === 'zh_CN' ? '加载中' : 'loading')
      loadNode.show = showLoad = true
    }
  }
  Vue.prototype.$loading.close = function() {
    Vue.prototype.$loading('', 'close')
  }
}
module.exports = Loading
