//  导入axios副本
import instance from '@/utils/request'
// 封装发获取用户数据请求方法
function getUserData(params) {
    return instance({
        url: '/user/list',
        method: 'get',
        params,
    })
}
//  更改状态
function setUserStatus(data) {
    return instance({
        url: '/user/status',
        method: 'post',
        data,
    })
}
//  删除数据
function removeUserData(data) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data,
    })
}

// 增加数据
function addUserData(data) {
    return instance({
        url: '/user/add',
        method: 'post',
        data,
    })
}
// 编辑数据
function editUserData(data) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data,
    })
}



export { getUserData, setUserStatus, removeUserData, addUserData, editUserData };