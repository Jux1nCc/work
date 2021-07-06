import Vue from 'vue'
import App from './App.vue'
// 导入element插件
import ElementUI from 'element-ui';
// 导入element的css
import 'element-ui/lib/theme-chalk/index.css';
// 导入路由实例对象
import router from './router/router.js'
// 导入vuex
import store from '@/store/index.js'

// 注册elementui
Vue.use(ElementUI);
Vue.config.productionTip = false
// 5：注入到vue实例  
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
