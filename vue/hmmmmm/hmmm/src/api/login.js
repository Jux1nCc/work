import instance from '@/utils/request'

function Login(data){
    return instance({
        url : '/login',
        method : 'post',
        data,
    })
}

export {Login}