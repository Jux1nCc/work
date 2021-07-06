import Vue from 'vue'
import App from './App.vue'
// 导入该路由插件
import VueRouter from 'vue-router'
// 导入xxx组件
import xxx from './components/xxx'
// 导入ooo组件
import ooo from './components/ooo'
// 注册该路由插件
Vue.use(VueRouter)
const router = new VueRouter({
  // 配制路由的对应关系
  routes: [
    {
      path: "/xxx",   //路由地址
      component: xxx   //上面路由地址对应的路由组件
    },
    {
      path: "/",   //路由地址
      component: xxx   //上面路由地址对应的路由组件
    },
    {
      path: "/ooo",
      component: ooo
    }
  ]
})
Vue.config.productionTip = false

new Vue({
  // 将路由挂载到vue中全局使用
  router,
  render: h => h(App),
}).$mount('#app')
