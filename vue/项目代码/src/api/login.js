import instance from '@/utils/request.js'
function toLogin(data) {
    return instance({
        url: "/login",
        method: "post",
        data      //data: data   
    })
}
export { toLogin }