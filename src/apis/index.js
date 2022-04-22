import axios from 'axios'

import ElementUI from 'element-ui';

import * as apis from './apis.js'

// 读取api.js内部定义的请求方法

// 暴露给外部以便调用，此时所有的api方法整合到了一起形成一个对象命名为apis

// http request拦截器 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {

//   // config.headers['Content-Type'] = "multipart/form-data"
//   // 
//   let token = sessionStorage.getItem("token");

//   if (token) {
//     //将token放到请求头发送给服务器,将tokenkey放在请求头中
//     config.headers["x-auth-token"] = token;
//   }
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// 拦截器
axios.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },
  error => {
    ElementUI.Notification({
      title: '警告',
      message: '出错了~后台小哥哥正在修复中🛠️！',
      type: 'error'
    });
    submitError();
    return Promise.reject(error)
  }
)

export default apis
