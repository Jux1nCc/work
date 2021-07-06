import instance from '@/utils/request.js'
function getUserData(params) {
    return instance({
        url: "/user/list",
        method: "get",
        params
    })
}
function addUserData(data) {
    return instance({
        url: "/user/add",
        method: "post",
        data
    })
}
function delUserData(data) {
    return instance({
        url: "/user/remove",
        method: "post",
        data
    })
}
function setUserStatus(data) {
    return instance({
        url: "/user/status",
        method: "post",
        data
    })
}
function editUserData(data) {
    return instance({
        url: "/user/edit",
        method: "post",
        data
    })
}
export { getUserData, addUserData, delUserData, setUserStatus, editUserData }