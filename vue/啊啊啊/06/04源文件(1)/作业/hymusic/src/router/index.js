/*
1安装
2:导入
3：注册
4：实例化
5：注入
6：路由出口
*/

// 1安装
// 2:导入
import VueRouter from 'vue-router'

// 3：注册
import Vue from 'vue'
Vue.use(VueRouter)
import find from '../views/find.vue'
import newMusic from '../views/newMusic.vue'
import newMv from '../views/newMv.vue'
import audioPlay from '../views/audioPlay.vue'
import mvPlay from '../views/mvPlay.vue'
// 4：实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/find'
    },

    {
      path: '/find',
      component: find
    },
    {
      path: '/newMusic',
      component: newMusic
    },
    {
      path: '/newMv',
      component: newMv
    },
    {
      path: '/audioPlay',
      component: audioPlay
    },
    {
      path: '/mvPlay',
      component: mvPlay
    }
  ]
})
// 输出出去
export default router
// 5：注入   new Vue()

// 6：路由出口
