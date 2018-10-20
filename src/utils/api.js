import axios from 'axios'
import Qs from 'qs'
import {Message} from 'element-ui'

axios.defaults.timeout = 6000

axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (config.method === 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, err => {
  Message.error({message: '请求错误!'})
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({message: data.data.msg})
    return
  }
  return data
}, err => {
  Message.error({message: '服务器错误!'})
  return Promise.resolve(err)
})

let base = 'local'

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    params: params,
    url: `${base}${url}`,
    paramsSerializer: function (params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    }
  })
}
