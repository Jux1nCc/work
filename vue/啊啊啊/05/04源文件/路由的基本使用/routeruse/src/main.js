import Vue from 'vue'
import App from './App.vue'
/*
路由基本使用：vue-router插件
1：安装vue-router  npm i vue-router
2:导入vue-router   import VueRouter from 'vue-router'
3:注册 Vue.use(VueRouter)
4:实例化  const router = new VueRouter({
  // 路由配制
      routes:[
        {
          path:"",
          component:组件名
        }
      ]
       })
5：注入到new Vue({ router })
6:路由对应组件展示 的地址（路由出口）
   <router-view />
*/
import xxx from './components/xxx'
import ooo from './components/ooo'
// 2:导入vue-router
import VueRouter from 'vue-router'
//  3:注册
Vue.use(VueRouter)
// 4:实例化
const router = new VueRouter({
  // 配制规则
  routes: [
    {
      path: '/',
      component: xxx
    },
    {
      path: '/xxx',
      component: xxx
    },
    {
      path: '/ooo',
      component: ooo
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
