// 导入vuex
import Vuex from 'vuex';
// 导入vue
import Vue from 'vue';
//  注册vuex
Vue.use(Vuex);
// 实例化
const store = new Vuex.Store({
    // 共享数据
    state : {
        userInfo: '',
        roleObj: {
            1: '超级管理员',
            2: '管理员',
            3: '老师',
            4: '学生'
        },
        role: '超级管理员'
    }
})
export default store;