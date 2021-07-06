// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
import login from '@/view/login/login'
import layout from '@/view/home/layout'
import chart from '@/view/home/chart/chart'
import userList from '@/view/home/userList/userList'
import question from '@/view/home/question/question'
import business from '@/view/home/business/business'
import subject from '@/view/home/subject/subject'
// 使用vue-router
Vue.use(VueRouter)
// 解决路由重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: login,
            meta: {
                title: '登录',
                rules: ['超级管理员', '管理员', '老师', '学生']
            }
        },
        {
            path: '/home',
            component: layout,
            redirect: '/home/subject',
            children: [
                {
                    path: 'chart',
                    component: chart,
                    meta: {
                        title: '数据概览',
                        icon: 'el-icon-pie-chart',
                        rules: ['超级管理员', '管理员', '老师']
                    }
                },
                {
                    path: 'userList',
                    component: userList,
                    meta: {
                        title: '用户列表',
                        icon: 'el-icon-user',
                        rules: ['超级管理员', '管理员']
                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        title: '题库列表',
                        icon: 'el-icon-edit-outline',
                        rules: ['超级管理员', '管理员', '老师']
                    }
                },
                {
                    path: 'business',
                    component: business,
                    meta: {
                        title: '企业列表',
                        icon: 'el-icon-office-building',
                        rules: ['超级管理员', '管理员', '老师']
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        title: '学科列表',
                        icon: 'el-icon-notebook-2',
                        rules: ['超级管理员', '管理员', '老师', '学生']
                    }
                }
            ]
        }
    ]
})

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { removeToken} from '@/utils/token'
import store from '@/store/index'

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta.rules.includes(store.state.role)) {
        next()
    }else {
        Message.warning('您无权访问该页面!')
        removeToken();
        next('/');
    }
})

router.afterEach((to) => {
    NProgress.done()
    document.title = to.meta.title;
})
//导出router
export default router