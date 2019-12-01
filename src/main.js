import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import VueI18n from 'vue-i18n'
import messages from './i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Toast from './plugins/toast'
import Loading from './plugins/loading'
import './plugins/toast/toast.css'
import './plugins/loading/loading.css'

// 二维码生成
import QRCode from 'qrcode'

// 工具类
import Utility from './common/utility/index.js'
import GLOBAL from 'common/js/global_variable'

Vue.prototype.GLOBAL = GLOBAL

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Utility)
Vue.use(QRCode)

import 'common/stylus/index.styl'
// vue-quill-editor 富文本 require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  error: require('../static/image/default.png'),
  loading: require('../static/image/default.png'),
  attempt: 1
})

const i18n = new VueI18n({
  locale: JSON.parse(window.localStorage.getItem('immi_language')) === 'zh_CN' ? 'zh_CN' : 'en',    // 语言标识,默认为en
  messages
})
window.localStorage.setItem('immi_language', JSON.stringify(i18n.locale))

/* 2.2.0 新增 | 设置为 false 以阻止 vue 在启动时生成生产提示 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
