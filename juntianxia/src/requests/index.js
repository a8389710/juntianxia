// import axios from 'axios'
// import {
//     Toast
//   } from 'vant';
// import router from '../router/routes'
//
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//   let ret = ''
//   for (let it in data) {
//     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//   }
//   return ret
// }]
//
// const ajax = axios.create({
//   baseURL: 'http://47.108.70.59:80'
// })
//
//
// ajax.interceptors.request.use((config)=>{
//     Toast.loading({
//         message: 'Loading...',
//         duration: 0,
//         forbidClick: true,
//         loadingType: 'spinner'
//       })
//       console.log(config)
//       return config
// })
//
// ajax.interceptors.response.use((resp)=>{
//     Toast.clear()
//     console.log(resp)
//     return resp
// })
//
//
// export const login=(req)=>{
//     return ajax.post('/api/user/login',req);
// }
//
// export const getMobileCode=(req)=>{
//   return ajax.post('/api/index/getMobileCode',req);
// }
//
// export const getMyIndex=(req)=>{
//   return ajax.get('/api/user/myIndex',req);
// }
