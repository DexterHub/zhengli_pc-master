import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import Cookies from "js-cookie"
import ElementUI from 'element-ui'
// //开发本地baseUrl
axios.defaults.baseURL = 'http://case.magicalign.com:8605/web' //本地
    // timeout : 20000,

const http = axios.create({
    // withCredentials: false,
    headers: {
        'Content-Type': 'application/json;'
    }
})
const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}
http.interceptors.request.use(config => { //请求之前
    // 拦截重复请求(即当前正在进行的相同请求)
  // let requestData = getRequestIdentify(config, true)
  // removePending(requestData, true)

  // config.cancelToken = new CancelToken((c) => {
  //   pending[requestData] = c
  // })
    config.headers['Authorization'] = Cookies.get('token') // 请求头带上token
    return config
}, error => {
    return Promise.reject(error)
})

// /**
//  * 响应拦截
//  */
http.interceptors.response.use(response => {//请求之后
  // console.log(response)
    if (response.data && response.data.code == 1100) { // 未知错误请联系开发人员
        ElementUI.Message({
            message: response.data.msg,
            type: 'error',
            duration: 2000,
        })
    }
    return response
}, error => {
    // if (!error.response) {//断网的情况
    //     // console.log(axios)
    //     // ElementUI.Message({
    //     //     message: '网络错误',
    //     //     type: 'error',
    //     //     duration: 2000,
    //     // })
    //     // return Promise.reject(new Error(
    //     //     error.response ? error.response.data : '网络错误'
    //     // ))
    // }
    // if (error.response && error.response.status == 500) {//token失效
    //     router.push('/login');
    //     ElementUI.Message({
    //         message:  error.response.data.message,
    //         type:'error',
    //         duration: 2000,
    //     })
    // }
    return new Promise.reject(new Error(
        error.response ? error.response.data : '网络错误'
    ))
})

// /**
//  * 请求地址处理
//  * @param {*} actionName action方法名称
//  */
// http.adornUrl = (actionName) => {
//     // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
//     return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
// }

// /**
//  * get请求参数处理
//  * @param {*} params 参数对象
//  * @param {*} openDefultParams 是否开启默认参数?
//  */
// http.adornParams = (params = {}, openDefultParams = true) => {
//     var defaults = {
//         // 't': new Date().getTime()
//     }
//     return openDefultParams ? merge(defaults, params) : params
// }

// /**
//  * post请求数据处理
//  * @param {*} data 数据对象
//  * @param {*} openDefultdata 是否开启默认数据?
//  * @param {*} contentType 数据格式
//  *  json: 'application/json; charset=utf-8'
//  *  form: 'application/x-www-form-urlencoded; charset=utf-8'
//  */
// http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
//     var defaults = {
//     //     't': new Date().getTime()
//     }
//     data = openDefultdata ? merge(defaults, data) : data
//     return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
// }



// this.$http({
//     url: "/doctor/getYZM",
//     method: "get",
//     params: {
//         'phone': 15673595013,
// }

// }).then(({
//     data
// }) => {


// }).catch(err => {

// })


// this.$http({
//     url: "/staff/findAllStaff",
//     method: "POST",
//     data: {
//         // staffId:
//         accountNumber : '444',
//         password : '444',
//         repeatPassword : '444',
//         doctorNumber : '321',
//         rights : '3'

//     }

// }).then(({data}) => {
//     console.log(data)

// }).catch(err => {
//     console.log(err)
// })
export default http