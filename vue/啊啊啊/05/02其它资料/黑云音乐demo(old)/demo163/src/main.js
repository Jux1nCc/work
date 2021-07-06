import Vue from 'vue'
import App from './App.vue'
import home from "./components/home"
import songs from "./components/songs"
import mv from "./components/mv"
import player from "./components/player"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/home',
      component: home  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/songs',
      component: songs  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/mv',
      component: mv  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/player',
      component: player  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    }
  ]
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

