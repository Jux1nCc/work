import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//  注册element-ui
Vue.use(ElementUI);
// 导入vuex
import store from '@/store/index.js'

//  在router.js中配置
// // 导入路由
// import VueRouter from 'vue-router';
// // 注册路由
// Vue.use(VueRouter);
// // 实例化路由
// let router = new VueRouter({
//   // 配置路由
//   routes : [

//   ]
// })

// 导入router
import router from '@/router/router.js';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
