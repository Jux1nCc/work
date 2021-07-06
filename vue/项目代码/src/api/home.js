import instance from '@/utils/request.js'
function getUserInfo(params) {
    return instance({
        url: "/info",
        method: "get",
        // 注意点get请求是用params这个参数
        params      //params: params   
    })
}
function exitLogin() {
    return instance({
        url: "/logout",
        method: "get"
    })
}
export { getUserInfo, exitLogin }
/*
为什么要写到这里
1：规范，api的东西是出问题最多的
   你这模块用了几个什么接口
   后端 联调
2：request.js为什么要抽离
    后面写一些api,一定要有一个思维，共有的东西能不能批量处理（提取）

*/