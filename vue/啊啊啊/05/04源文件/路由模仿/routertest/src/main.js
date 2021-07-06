import Vue from 'vue'
import App from './App.vue'
import sona from './components/sona'
import sonb from './components/sonb'
// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      // 路由：指向，把一个地址指向了一个组件
      path: '/sona',
      component: sona //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/sonb',
      component: sonb //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    }
  ]
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
