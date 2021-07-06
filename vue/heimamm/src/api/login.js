//  导入axios副本
import instance from '@/utils/request'
// 封装发送登录请求方法
function login(data){
    return instance({
        url: '/login',
        method: 'post',
        data,
    })
}   

export {login};