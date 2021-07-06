// 导入vue
import Vue from 'vue';
// 导入login
import login from '@/view/login/login.vue';
import layout from '@/view/home/layout.vue';
// 导入home下的子组件
import chart from '@/view/home/chart/chart.vue';
import business from '@/view/home/business/business.vue';
import question from '@/view/home/question/question.vue';
import userList from '@/view/home/userList/userList.vue';
import subject from '@/view/home/subject/subject.vue';
// 导入路由
import VueRouter from 'vue-router';
// 注册路由
Vue.use(VueRouter);
// 路由重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 实例化路由
let router = new VueRouter({
    // 配置路由
    routes: [
        {
            path: '/',
            component: login,
            meta: {
                //路由元信息，它是一个让我们自己随便定义的一个对象
                title: "登陆",
                rules: ["超级管理员", "管理员", "老师", "学生"]
            }
        },
        {
            path: '/home',
            redirect: '/home/subject',
            component: layout,
            children: [
                {
                    path: 'chart',
                    component: chart,
                    meta: {
                        //路由元信息，它是一个让我们自己随便定义的一个对象
                        title: "数据概览",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: 'el-icon-pie-chart'
                    }
                },
                {
                    path: 'userList',
                    component: userList,
                    meta: {
                        //路由元信息，它是一个让我们自己随便定义的一个对象
                        title: "用户列表",
                        rules: ["超级管理员", "管理员"],
                        icon: 'el-icon-user'
                    }
                    
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        //路由元信息，它是一个让我们自己随便定义的一个对象
                        title: "题库列表",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: 'el-icon-edit-outline'
                    }
                },
                {
                    path: 'business',
                    component: business,
                    meta: {
                        //路由元信息，它是一个让我们自己随便定义的一个对象
                        title: "企业列表",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: 'el-icon-office-building'
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        //路由元信息，它是一个让我们自己随便定义的一个对象
                        title: "学科列表",
                        rules: ["超级管理员", "管理员", "老师", "学生"],
                        icon: 'el-icon-notebook-2'
                    }
                }
            ]
        }
    ]
})
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store/index.js';
import { Message } from 'element-ui';
import { removeToken } from '@/utils/token.js';
// 导航守卫(路由拦截)
router.beforeEach((to, from, next) => {
    // window.console.log('to',to);
    // window.console.log('from',from);
    Nprogress.start();
    if (to.meta.rules.includes(store.state.role)) {
        next();
    } else {
        Message.warning('您无权访问该页面!')
        removeToken();
        next('/');
    }
})
router.afterEach((to) => {
    Nprogress.done();
    document.title = to.meta.title;
    // window.console.log('进入路由了')
})
//  输出路由
export default router;