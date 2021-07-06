import Vue from 'vue'
import App from './App.vue'
// 导入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入路由
import router from '@/router/router.js'
// 导入vuex
import store from '@/store/index'
// 使用elementui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
