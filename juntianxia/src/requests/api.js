//引入axios
import axios from 'axios'
// import local from "@/utils/local";

//设置请求的服务器目录
axios.defaults.baseURL = "http://47.108.70.59:80"; //接口地址

// axios请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token);
    // config.headers.authorization = `${token}`;
  config.headers.token = `${token}`;

  return config;
})

//导出请求的对象
export default {

    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
            .then(response => {
                resolve(response.data) //成功
            })
            .catch(err => {
                reject(err) //失败
            })
        })
    },
    //post方式
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                     reject(err)
                })
        })
    },
    //put方式
    put(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, params)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    //DELETE方式
    delete(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                params
            })
                .then(response => {
                    resolve(response.data) //成功
                })
                .catch(err => {
                    reject(err) //失败
                })
        })
    },
}
