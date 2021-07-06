import instance from '@/utils/request'
// 封装发获取学科数据请求方法
function getSubjectData(params) {
    return instance({
        url: '/subject/list',
        method: 'get',
        params,
    })
}
//  更改状态
function setSubjectStatus(data) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data,
    })
}
//  删除数据
function removeSubjectData(data) {
    return instance({
        url: '/subject/remove',
        method: 'post',
        data,
    })
}

// 增加数据
function addSubjectData(data) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data,
    })
}
// 编辑数据
function editSubjectData(data) {
    return instance({
        url: '/subject/edit',
        method: 'post',
        data,
    })
}



export { getSubjectData, setSubjectStatus, removeSubjectData, addSubjectData, editSubjectData };