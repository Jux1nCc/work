/*
接口调用；
1：安装axios   npm i axios
2:导入axios    import axios from 'axios
3:使用axios调用接口
*/

import axios from 'axios'
import { Message } from 'element-ui';
// 导入token和清理token清理方法
import { getToken, removeToken } from './token.js'
import router from "@/router/router.js"


var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,   //设置基地址
    withCredentials: true //跨域照样协带cookie
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 首先得有token我们才加，
    if (getToken()) {
        config.headers.token = getToken()
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
        // 因为返回数据里面axios帮我们额外的包了一层data但实际我们基本不用，所以我们把它干掉
        return response.data;
    } else if (response.data.code == 206) {
        // token出错处理
        Message.error("登陆超时了！")
        // 清理掉token
        removeToken()
        // 跳至登陆页
        router.push("/")
        return Promise.reject("error");

    } else {
        // 提示用户错误
        // 出错了我们还有必要返回数据出去吗？
        //抛出一个错误，不要让后面代码执行
        //只要return了一个Promise.reject("error")后面的接口的.then就不会执行了
        Message.error(response.data.message)
        return Promise.reject("error");
    }
    // switch (response.data.code) {
    //     case 200:
    //         return response;
    //     case 201:

    //         Message.error(response.data.message)
    //         // 出错了我们还有必要返回数据出去吗？
    //         //抛出一个错误，不要让后面代码执行
    //         window.console.log("抛错误前处理:", response)
    //         return Promise.reject("error");

    // }

    // return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance