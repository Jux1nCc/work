import instance from '@/utils/request'

function getUserInfo(){
    return instance({
        url: '/info',
    })
}
function quit(){
    return instance({
        url: '/logout'
    })
}

export { getUserInfo, quit }