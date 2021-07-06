import Vue from 'vue'
import App from './App.vue'
// 安装element-ui   npm i element-ui
// 导入element-ui
import ElementUI from 'element-ui'
// 导入element的css
import 'element-ui/lib/theme-chalk/index.css'
import find from './components/find'
import newMusic from './components/newMusic'
import newMv from './components/newMv'
// 注册
Vue.use(ElementUI)
Vue.config.productionTip = false
// 导入
import VueRouter from 'vue-router'
// 注册
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  routes: [
    {
      path: '/find',
      component: find
    },
    {
      path: '/newMusic',
      component: newMusic
    },
    {
      path: '/newMv',
      component: newMv
    }
  ]
})
// 注入
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
