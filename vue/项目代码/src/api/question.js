import instance from '@/utils/request.js'
function getQuestionData(params) {
    return instance({
        url: "/question/list",
        method: "get",
        params      //data: data   
    })
}
function addQuestionData(data) {
    return instance({
        url: "/question/add",
        method: "post",
        data      //data: data   
    })
}
function setQuestionStatus(data) {
    return instance({
        url: "/question/status",
        method: "post",
        data      //data: data   
    })
}
function delQuestionData(data) {
    return instance({
        url: "/question/remove",
        method: "post",
        data      //data: data   
    })
}
function editQuestionData(data) {
    return instance({
        url: "/question/edit",
        method: "post",
        data      //data: data   
    })
}
export { getQuestionData, addQuestionData, setQuestionStatus, delQuestionData, editQuestionData }