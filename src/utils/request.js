import axios from 'axios'
// 做好的弹窗
import { MessageBox, Message } from 'element-ui'
// 暂时认识的stort是用来存全局变量的
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:9090/file_service',
  //   静态变量声明
  //   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  // 默认不是这个不能用json
  headers: { 'Content-Type': 'application/json' }
})

// request interceptor 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // 判断token是否存在 存在就在headers中增加
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    // ？？
    // Promise 查到 是一个对象，它代表了一个异步操作的最终完成或者失败。
    return Promise.reject(error)
  }
)

// response interceptor 回复响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    //  是不是有问题判断
    if (res.code !== 20000) {
      // 是不是认证没通过判断
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // 对话框 有选项和相应的处理
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // 先清空cookie 再跳去登录
          store.dispatch('user/resetToken').then(() => {
            // 类似于你浏览器上的刷新页面按钮
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

// 待使用  ：响应拦截器即异常处理
// axios.interceptors.response.use(response => {
//   return response
// }, err => {
//   if (err && err.response) {
//     switch (err.response.status) {
//       case 400:
//         console.log('错误请求')
//         break
//       case 401:
//         console.log('未授权，请重新登录')
//         break
//       case 403:
//         console.log('拒绝访问')
//         break
//       case 404:
//         console.log('请求错误,未找到该资源')
//         break
//       case 405:
//         console.log('请求方法未允许')
//         break
//       case 408:
//         console.log('请求超时')
//         break
//       case 500:
//         console.log('服务器端出错')
//         break
//       case 501:
//         console.log('网络未实现')
//         break
//       case 502:
//         console.log('网络错误')
//         break
//       case 503:
//         console.log('服务不可用')
//         break
//       case 504:
//         console.log('网络超时')
//         break
//       case 505:
//         console.log('http版本不支持该请求')
//         break
//       default:
//         console.log(`连接错误${err.response.status}`)
//     }
//   } else {
//     console.log('连接到服务器失败')
//   }
//   return Promise.resolve(err.response)
// })
