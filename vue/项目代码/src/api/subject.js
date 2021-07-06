import instance from '@/utils/request.js'
function getSubjectData(params) {
    return instance({
        url: "/subject/list",
        method: "get",
        params      //data: data   
    })
}
function setSubjectStatus(data) {
    return instance({
        url: "/subject/status",
        method: "post",
        data      //data: data   
    })
}
function delSubjectData(data) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data      //data: data   
    })
}
function addSubjectData(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data      //data: data   
    })
}
function editSubjectData(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data      //data: data   
    })
}
export { getSubjectData, setSubjectStatus, delSubjectData, addSubjectData, editSubjectData }