import Vue from 'vue'
import App from './App.vue'
import find from './components/find.vue'
import my from './components/my.vue'
import friend from './components/friend.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 将$router挂载到了vue原型上
const router = new VueRouter({
  routes: [
    {
      path: '/find',
      component: find
    },
    {
      path: '/my',
      component: my
    },
    {
      path: '/friend',
      component: friend
    }
  ]
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
