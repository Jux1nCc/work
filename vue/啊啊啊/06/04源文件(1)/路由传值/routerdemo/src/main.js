import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import pagea from './components/pagea.vue'
import pageb from './components/pageb.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/pagea'
    },
    {
      path: '/pagea',
      component: pagea
    },
    {
      path: '/pageb',
      component: pageb
    },
    {
      // 将path重新定位到另一个路径
      path: '*',
      redirect: '/pagea'
    }
  ]
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
