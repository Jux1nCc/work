import Vue from 'vue'
import App from './App.vue'
import slider from "./components/slider.vue"
import list from "./components/list.vue"
import player from "./components/player"
import mv from "./components/mv"
import comment from "./components/comment"
// 导入moment
import moment from "moment"
// 导入element-ui与css样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入路由
import VueRouter from "vue-router"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// 注册
Vue.use(VueRouter)
Vue.use(ElementUI)
// 实例化router
const router = new VueRouter({
  // 配制路由对应关系
  routes: [
    {   //首页
      path: "/",
      component: slider
    },
    {    //音乐列表
      path: "/list",
      component: list
    },
    {   //音乐播放
      path: "/player",
      component: player
    },
    {   //mv
      path: "/mv",
      component: mv
    },
    {
      //评论
      path: "/comment",
      component: comment
    }
  ]
})
Vue.config.productionTip = false

// 过滤器
Vue.filter("formatTimeGlobal", function (value) {
  return moment(value).format("YYYY-MM-DD HH:MM:SS")
})
// 注入到vue实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
