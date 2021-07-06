import Vue from 'vue'
import App from './App.vue'
import home from "./components/home.vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
Vue.config.productionTip = false
const router = new VueRouter({
  routes: [{
    path: "/home",
    component: home
  }]
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
