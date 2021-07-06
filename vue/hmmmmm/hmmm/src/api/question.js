//  导入axios副本
import instance from '@/utils/request'
// 封装发获取题库数据请求方法
function getQuestionData(params) {
    return instance({
        url: '/question/list',
        method: 'get',
        params,
    })
}
//  更改状态
function setQuestionStatus(data) {
    return instance({
        url: '/question/status',
        method: 'post',
        data,
    })
}
//  删除数据
function removeQuestionData(data) {
    return instance({
        url: '/question/remove',
        method: 'post',
        data,
    })
}

// 增加数据
function addQuestionData(data) {
    return instance({
        url: '/question/add',
        method: 'post',
        data,
    })
}
// 编辑数据
function editQuestionData(data) {
    return instance({
        url: '/question/edit',
        method: 'post',
        data,
    })
}
// 获取单个题目接口
function getOneData(data){
    return instance({
        url: '/question/one',
        method: 'post',
        data
    })
}
// 上传文件
function uploadQuestion(data){
    return instance({
        url: '/question/upload',
        method: 'post',
        data
    })
}



export { getQuestionData, setQuestionStatus, removeQuestionData, addQuestionData, editQuestionData, getOneData, uploadQuestion };