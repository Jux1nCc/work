
/*
/*路由基本使用
1：安装vue-router   npm i vue-router
2:导入vue-router    import VueRouter from 'vue-router'
3:注册              Vue.use(VueRouter)
4:实例化VueRouter   const router=new VueRouter({routes:[//写相应的路由配制]})
   输出 该路由实例化对象   export default router
5：注入到vue实例   
   导入路由实例化对象
   import router from "路径"
   new Vue({router})  
6:来一个路由出口   router-view

*/
// 导入路由
import VueRouter from "vue-router"
// 导入登陆组件
import login from '@/view/login/login.vue'
import layout from '@/view/home/layout.vue'
import chart from "@/view/home/chart/chart.vue"
import userList from "@/view/home/userList/userList.vue"
import question from "@/view/home/question/question.vue"
import business from "@/view/home/business/business.vue"
import subject from "@/view/home/subject/subject.vue"
// 注册
import Vue from 'vue'
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    // 路由配制
    routes: [
        {
            path: "/",
            component: login,
            meta: {
                //路由元信息，它是一个让我们自己随便定义的一个对象
                title: "登陆",
                rules: ["超级管理员", "管理员", "老师", "学生"]
            }
        },
        {
            path: "/home",
            redirect: "/home/subject",
            component: layout,
            children: [
                {
                    path: "chart",
                    component: chart,
                    meta: {
                        title: "数据概览",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-pie-chart"
                    }
                },
                {
                    path: "userList",
                    component: userList,
                    meta: {
                        title: "用户列表",
                        rules: ["超级管理员", "管理员"],
                        icon: "el-icon-user"
                    }
                },
                {
                    path: "question",
                    component: question,
                    meta: {
                        title: "题库列表",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-edit-outline"
                    }
                },
                {
                    path: "business",
                    component: business,
                    meta: {
                        title: "企业列表",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-office-building"
                    }
                },
                {
                    path: "subject",
                    component: subject,
                    meta: {
                        title: "学科列表",
                        rules: ["超级管理员", "管理员", "老师", "学生"],
                        icon: "el-icon-notebook-2"
                    }
                },
            ]
        }
    ]
})
// 路由导航守卫 
// 进入前守卫
// 导入nprogress   start()开启    done()结束
import NProgress from 'nprogress'
// 导入nprogress对应css
import 'nprogress/nprogress.css'
// css需要导入
import { Message } from 'element-ui';
import { removeToken } from "@/utils/token.js"
import store from "@/store/index.js"
router.beforeEach((to, from, next) => {
    // 进度条开启
    NProgress.start()
    /*
    to:到哪个路由去
    from:从哪里过来的
    next:  next() 正常通过
          next("path")把你甩到其它地方去    
    */
    //to.meta.rules.includes(this.$store.state.role))
    if (to.meta.rules.includes(store.state.role)) {
        next()
    } else {
        // 弹出提示
        Message.warning("您无权访问该页面！")
        // 清除token
        removeToken()
        next("/")
    }
})
// 进入后守卫
router.afterEach((to) => {
    // 进度条结束
    NProgress.done()
    document.title = to.meta.title    //to就相当于当前的$route信息
})
// 输出 出去
export default router











