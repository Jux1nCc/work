// vuex使用
/*
1：安装  npm i vuex
2:导入
3:注册
4：实例化
   输出 出去
5：注入到main.js的vue实例
使用  this.$store.state.值

*/
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    // ...
    state: {
        //共享数据
        userInfo: "",   //用户信息
        roleObj: {
            1: "超级管理员",
            2: "管理员",
            3: "老师",
            4: "学生"
        },
        role: "超级管理员" //默认先给最大权限让它进来再说，在获取到真实角色 时会处理
    }
})
export default store