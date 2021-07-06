import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import swiper from './components/swiper'
import results from './components/results'
import player from './components/player'
import mv from './components/mv'
import comment from './components/comment'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: swiper
    },
    {
      path: '/results',
      component: results
    },
    {
      path: '/mv',
      component: mv
    },
    {
      path: '/comment',
      component: comment
    },
    {
      path: '/player',
      component: player
    }
  ]
})
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// axios.defaults.baseURL = 'http://183.237.67.218:3000/'
// import axios from 'axios'
// Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
