import VueRouter from 'vue-router'
import Vue from 'vue'
import found from '@/views/found.vue'
import newMusic from '@/views/newMusic.vue'
import newMv from '@/views/newMv.vue'
import mvplay from '@/views/mvplay.vue'
import audioplay from '@/views/audioplay.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      alias: '/found',
      component: found
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
      path: '/mvplay',
      component: mvplay
    },
    {
      path: '/audioplay',
      component: audioplay
    }
  ]
})
export default router
