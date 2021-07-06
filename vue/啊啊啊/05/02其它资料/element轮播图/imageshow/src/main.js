import Vue from 'vue'
import App from './App.vue'
// 导入elementui组件
import ElementUI from 'element-ui';
// 导入element需要的css
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
// 注册elementui
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
