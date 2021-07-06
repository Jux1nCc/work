//  导入axios副本
import instance from '@/utils/request'
// 封装发获取用户信息请求方法
function getUserInfo(params) {
    return instance({
        url: '/info',
        method: 'get',
        params,
    })
}

function userQuit(params){
    return instance({
        url: '/logout',
        method: 'get',
        params,
    })
}

export { getUserInfo, userQuit };