import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, removeToken } from './token.js'
import router from '@/router/router.js'
//  创建axios副本
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true   //携带cookie
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //  设置请求头token
    if (getToken()) {
        config.headers.token = getToken();
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // return response;
    if (response.data.code == 200) {
        return response.data;
    // }else if(response.data.code == 202){
    //     Message.error(response.data.message);
    //     return Promise.reject('error');
    }else if(response.data.code == 206){
        // Message.error(response.data.message);
        router.push('/');
        removeToken();
        return Promise.reject('error');
    } else {
        // 提示错误
        Message.error(response.data.message);
        return Promise.reject(response.data.message);
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;