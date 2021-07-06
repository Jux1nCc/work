//  导入axios副本
import instance from '@/utils/request'

// 封装发送获取手机验证码请求
function getPhoneCode(data) {
    return instance({
        url: "/sendsms",
        method: 'post',
        data,
    })
}
// 封装发送注册请求
function register(data) {
    return instance({
        url: "/register",
        method: "post",
        data,
    })
}

export { getPhoneCode, register }