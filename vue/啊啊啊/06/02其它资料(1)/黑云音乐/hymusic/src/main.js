import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import home from './components/home'
import songs from './components/songs'
import player from './components/player'
import comment from './components/comment'
import mv from './components/mv'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

Vue.use(ElementUI);
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: home
    },
    {
      path: "/home",
      component: home
    },
    {
      path: "/songs",
      component: songs
    },
    {
      path: "/mv",
      component: mv
    },
    {
      path: "/player",
      component: player
    },
    {
      path: "/comment",
      component: comment
    }
  ]
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
