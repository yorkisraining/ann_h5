/*
 * 请求封装公共方法
 */
import axios from 'axios'
import store from '@/vuex'
import { Toast } from 'vant'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(config => {
    let token = sessionStorage.getItem('token') || store.state.homeModule.token;
    if (token) {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        config.headers.cvsToken = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

// 发送请求及接收后处理
export const ajaxPost = (url, params, callback, errorCallback) => {
    axios.post(url, params)
        .then(function(response) {
            if (response.data.code == 500) {
                Toast('服务器错误');
            }
            if(10000 == response.data.result.code){
              callback(response.data.result.data);
            }else{
              Toast(response.data.result.message);
              if (errorCallback) {
                errorCallback()
              }
            }
        })
        .catch(function(error) {
            if (errorCallback) {
                errorCallback(error)
            }
            Toast('服务器错误');
        })
}

export const ajaxGet = (url, params, callback, errorCallback) => {
    axios.get(url, {
            params: params
        })
        .then(function(response) {
            if (response.data.code == 500) {
                Toast('服务器错误');
            }
            if(10000 == response.data.result.code){
              callback(response.data.result.data);
            }else{
              Toast(response.data.result.message);
              if (errorCallback) {
                errorCallback()
              }
            }
        })
        .catch(function(error) {
            if (errorCallback) {
                errorCallback(error)
            }
            console.log(error)
            Toast('服务器错误');
        })
}
