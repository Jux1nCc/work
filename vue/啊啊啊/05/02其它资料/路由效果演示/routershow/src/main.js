import Vue from 'vue'
import App from './App.vue'
import xxx from "./components/xxx.vue"
import ooo from "./components/ooo.vue"
// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/xxx',
      component: xxx  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/ooo',
      component: ooo  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    }
  ]
})
Vue.config.productionTip = false
// 注入到vue
new Vue({
  el: "#app",
  render: h => h(App),
  router
})




