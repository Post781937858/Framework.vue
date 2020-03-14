import axios from 'axios'
import Vue from 'vue'
const _apiUrl = {

  Login: '/api/Login',

  LoginGetToken: '/api/Login/GetToken',

  Menus: '/api/Menu',

  MenusAll: '/api/Menu/All',

  MenusPower: '/api/Menu/Power',

  MenusUserPower: '/api/Menu/UserPower',

  SaveRolePower: '/api/PowerRole/SaveRolePower',

  Power: '/api/PowerRole',

  PowerAll: '/api/PowerRole/All',

  User: '/api/User',

  operatingLog: '/api/operatingLog',

  CodeCreate: '/api/CodeCreate',

  GetTemplateConfig: '/api/CodeCreate/GetTemplateConfig',

  UserImg: '/images/uploader/UserIcon/',

  UserImgupload: '/api/User/Icon'
}

let base = ''
// 如果是IIS部署，用这个，因为 IIS 只能是 CORS 跨域，不能代理
// base = process.env.NODE_ENV === 'production' ? 'http:/127.0.0.1:5000' : '' 118.31.71.216
base = 'http://127.0.0.1:5001'
// 请求发送拦截，把数据发送给后台之前做些什么......
axios.interceptors.request.use((request) => {
  request.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
  return request
}, function (error) {
  let message = '请求异常'
  messageBox(message, false)
  return Promise.reject(error)
})
// 请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  let message = '请求异常'
  if (error.response) {
    switch (error.response.status) {
      case 500:
        message = '服务器错误'
        break
      case 401:
        message = '很抱歉，您没有此操作的权限'
        break
      case 403:
        message = '您的权限等级不够，请联系管理员'
        break
    }
  } else {
    message = error
  }
  messageBox(message, false)
  return Promise.reject(error)
})

const api = {}

api.base = base
api.apiUrl = _apiUrl

// function GetTime () {
//   var nowDate = new Date()
//   var year = nowDate.getFullYear()
//   var month = nowDate.getMonth() + 1
//   var today = nowDate.getDate()
//   var hours = nowDate.getHours()
//   var minutes = nowDate.getMinutes()
//   var seconds = nowDate.getSeconds()

//   if (month >= 1 && month <= 9) {
//     month = '0' + month
//   }
//   if (today >= 1 && today <= 9) {
//     today = '0' + today
//   }
//   var currentdate = year + '-' + month + '-' + today + ' ' + hours + ':' + minutes + ':' + seconds
//   return new Date(currentdate.replace(new RegExp('-', 'gm'), '/')).getTime()
// }

api.Query = (url, succeed, parameters, error) => {
  return axios.get(`${base}${url}`, { params: parameters })
    .then(res => res.data)
    .then(data => { succeed(data) }).catch(_error => { error(_error) })
}

api.update = (url, succeed, parameters, error) => {
  return axios.put(`${base}${url}`, parameters)
    .then(res => res.data)
    .then(data => { succeed(data) }).catch(_error => { error(_error) })
}

api.delete = (url, succeed, parameters, error) => {
  return axios.delete(`${base}${url}`, { data: parameters })
    .then(res => res.data)
    .then(data => { succeed(data) }).catch(_error => { error(_error) })
}

api.add = (url, succeed, parameters, error) => {
  return axios.post(`${base}${url}`, parameters)
    .then(res => res.data)
    .then(data => { succeed(data) }).catch(_error => { error(_error) })
}

api.GetImg = (filename) => {
  // + '?v=' + GetTime() + Math.floor(Math.random() * 10 + 1)
  return `${base}${_apiUrl.UserImg}` + filename
}

api.UserUpload = () => {
  return `${base}${_apiUrl.UserImgupload}`
}

let messageBoxnotify = function (msg, state = true) {
  Vue.prototype.$notify({
    title: '提示',
    message: msg,
    duration: 2000,
    type: !state ? 'error' : 'success'
  })
}
let messageBox = function (msg, state = true) {
  Vue.prototype.$message({
    message: msg,
    type: !state ? 'error' : 'success'
  })
}
// const Qs = require('qs')

api.getPage = (url, parameters, succeed, error) => {
  return axios.get(`${base}${url}?Pageindex=${parameters.page.Pageindex}&PageSize=${parameters.page.PageSize}`, { params: parameters.data })
    .then(res => res.data)
    .then(data => { succeed(data) }).catch(_error => {
      messageBoxnotify(_error, false)
      error(_error)
    })
}
api.get = (url, parameters, succeed, error) => {
  return axios.get(`${base}${url}`, { params: parameters })
    .then(res => res.data)
    .then(data => { succeed(data) }).catch(_error => { error(_error) })
}

api.put = (url, parameters, succeed, error) => {
  return axios.put(`${base}${url}`, parameters)
    .then(res => res.data)
    .then(data => {
      messageBoxnotify(data.msg, data.state === 200)
      succeed(data)
    }).catch(_error => {
      messageBoxnotify(_error, false)
      error(_error)
    })
}

api.deletes = (url, parameters, succeed, error) => {
  return axios.delete(`${base}${url}`, { data: parameters })
    .then(res => res.data)
    .then(data => {
      messageBoxnotify(data.msg, data.state === 200)
      succeed(data)
    }).catch(_error => {
      messageBoxnotify(_error, false)
      error(_error)
    })
}

api.post = (url, parameters, succeed, error) => {
  return axios.post(`${base}${url}`, parameters)
    .then(res => res.data)
    .then(data => {
      messageBoxnotify(data.msg, data.state === 200)
      succeed(data)
    }).catch(_error => {
      messageBoxnotify(_error, false)
      error(_error)
    })
}

export default api
