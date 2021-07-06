import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  // 渲染了App.vue
  render: h => h(App),   //function (h){return h(App)}
})