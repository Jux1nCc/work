import Vue from 'vue'
import App from './App.vue'
// 是否显示提示信息
Vue.config.productionTip = false

new Vue({
  // 渲染  createElement创建标签用于替换当前使用范围的html,css,js
  //App.vue替换了id为app的标签
  // 将index.html与App.vue建立 联系
  render: createElement => createElement(App) //  function (createElement){createElement(App)}
}).$mount('#app')
