//  导入axios副本
import instance from '@/utils/request'
// 封装发获取学科数据请求方法
function getBusinessData(params) {
    return instance({
        url: '/enterprise/list',
        method: 'get',
        params,
    })
}
//  更改状态
function setBusinessStatus(data) {
    return instance({
        url: '/enterprise/status',
        method: 'post',
        data,
    })
}
//  删除数据
function removeBusinessData(data) {
    return instance({
        url: '/enterprise/remove',
        method: 'post',
        data,
    })
}

// 增加数据
function addBusinessData(data) {
    return instance({
        url: '/enterprise/add',
        method: 'post',
        data,
    })
}
// 编辑数据
function editBusinessData(data) {
    return instance({
        url: '/enterprise/edit',
        method: 'post',
        data,
    })
}



export { getBusinessData, setBusinessStatus, removeBusinessData, addBusinessData, editBusinessData };