import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios
// 基地址
axios.defaults.baseURL = 'https://autumnfish.cn/'
// 如果axios请求的url没有http它会将基地址自动拼接上去  基地址+url
// 如果axios请求的url有http 不拼接
import router from './router/index.js'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
