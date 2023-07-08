import qs from 'qs'
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

let isRefreshing = false //是否正在刷新token
let retryRequests = [] //重新请求接口数组
const fetch = (url, options) => {
  return useFetch(url, {
    //请求拦截
    onRequest({ options }) {
      console.log('res:', options.baseURL, options.secret)
      options.baseURL = options.baseURL === '/' ? import.meta.env.VITE_BASEURL : options.baseURL //默认baseURL
      options.headers = { 'content-type': 'application/x-www-form-urlencoded' }

      const body = { ...options.body, ...commonParameters() }
      const secret = options.secret ?? import.meta.env.VITE_BASE_SECRET
      body.ts = Math.round(new Date().valueOf() / 1000)
      body.sign = sign(body, secret)
      options.body = qs.stringify(body)
    },
    // 错误请求
    onRequestError({ request, options, error }) {
      console.error(error)
    },
    // 响应拦截
    onResponse({ response, options }) {
      const { code } = response._data
      if (code === 1003) {
        //token过期
        if (!isRefreshing) {
          isRefreshing = true
          let params = {
            token: storage.getItem('accessToken') || ''
          }
          return refreshToken(params)
            .then((res) => {
              const { token } = res.data
              storage.setItem('accessToken', token)

              let body = qs.parse(options.body)
              body.token = token
              options.body = body

              retryRequests.forEach((cb) => cb(token))
              retryRequests = []

              return fetch(url, options)
            })
            .catch((res) => {
              storage.setItem('accessToken', '')
              storage.setItem('syUserInfo', {})
              window.location.reload()
            })
            .finally(() => {
              isRefreshing = false
            })
        } else {
          return new Promise((resolve) => {
            retryRequests.push((token) => {
              let body = qs.parse(options.body)
              body.token = token
              options.body = body

              resolve(request(options))
            })
          })
        }
      } else if (code === 1006) {
        //token非法，神仙也救不了了，跳转到首页重新登录吧
        console.log('token illegal =>', response)
        storage.setItem('syToken', '')
        storage.setItem('syUserInfo', {})
        // 清除登录信息
        window.location.reload()
      }
    },
    // 响应错误
    onResponseError({ response, error }) {
      if (process.client) {
        message.error('系统繁忙，请稍后重试~')
      }
      console.log('err' + error)
      return Promise.reject(error)
    },
    ...options
  })
}

// 自动导出
export const useHttp = {
  get: (url, option) => {
    return fetch(url, { ...option, method: 'GET' })
  },

  post: (url, option) => {
    return fetch(url, { ...option, method: 'POST' })
  },

  put: (url, option) => {
    return fetch(url, { ...option, method: 'PUT' })
  },

  delete: (url, option) => {
    return fetch(url, { ...option, method: 'DELETE' })
  }
}
