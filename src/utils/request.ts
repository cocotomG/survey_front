/* eslint-disable no-magic-numbers */
import { debounce } from 'lodash-es'
import { Modal } from 'ant-design-vue'
import { useMessage } from '@/hooks/message'
import { useUserStore } from '@/store'
import { useEnv } from '@/hooks/env'
import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import { setItem, STORAGE_KEY_TOKEN } from '@/utils/storage'
import { string } from 'vue-types'

const canMock = true // 是否开启 mock 功能，提供全局关闭功能
const loadingApi: { [key: string]: boolean } = {} // 加载中的 Api 接口，对非幂等接口，进行统一接口节流

// 自定义 axios 配置项
type CustomAxiosRequestConfig = AxiosRequestConfig & {
  mock?: boolean; // 是否使用 yapi 接口模拟功能
  withLoading?: boolean; // 该接口调用时，添加 loading 效果
  returnRes?: boolean; // 返回原始 resp 响应信息，用于获取 http 原信息，如 status code 等
  withoutCheck?: boolean; // 直接返回接口结果，不经过全局处理器
}


// 业务全局状态码
export const enum ProjectCode {
  Success = 200, // 业务接口正常
  TokenExpired = 2, // token 过期
}
// http 状态码
export const enum HttpCode {
  NO_EXIST = 404, // token 过期
  TokenExpired = 401, // token 过期
}

// 重新登录提示，使用防抖函数，避免并发接口调用时，多次触发重新登录弹窗
export const reLoginTips = debounce(() => {
  Modal.confirm({
    title: '登录失效',
    content: '您的账号登录信息已失效，请重新登录！',
    okText: '重新登录',
    onOk: () =>
      useUserStore().logout(false, location.pathname + location.search),
  })
}, 2000)

class Request {
  private axiosInstance: AxiosInstance

  constructor(opt: AxiosRequestConfig) {
    this.axiosInstance = axios.create(opt)
    // todo interceptors 和前面的配置重复，在同一一个地方配置即可
    this.axiosInstance.interceptors.request.use(config => {
      const { token } = useUserStore()
      if (token && config.headers && !['/captcha', 'auth/login', "/reference"].includes(config.url!)) {
        // config.headers.Authorization = `Bearer ${token}`
        config.headers.token = `${token}`
      }

      //  由于移动端导入页面后端接口需要做区分，该处判断接口是移动端接口将baseUrl替换一下
      if (['api/staffUser/search', 'api/staffUser'].includes(config.url!)) {
        config.baseURL = 'api/'
      }
      return config
    })
  }

  // todo 合并
  get<T = any>(
    url: string,
    params?: Recordable,
    otherConfig?: CustomAxiosRequestConfig
  ): Promise<T> {
    return this.request(url, 'GET', params, otherConfig)
  }

  post<T = any>(
    url: string,
    params?: Recordable,
    otherConfig?: CustomAxiosRequestConfig
  ): Promise<T> {
    return this.request(url, 'POST', params, otherConfig)
  }

  put<T = any>(
    url: string,
    params?: Recordable,
    otherConfig?: CustomAxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(url, 'PUT', params, otherConfig)
  }

  delete<T = any>(
    url: string,
    params?: Recordable,
    otherConfig?: CustomAxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(url, 'DELETE', params, otherConfig)
  }

  upload<T = any>(
    url: string,
    params?: Recordable,
    otherConfig?: CustomAxiosRequestConfig
  ): Promise<T> {
    const headers = { 'Content-Type': 'multipart/form-data' }
    const formData = new FormData()
    params
      && Object.keys(params).map(key => formData.append(key, params[key]))
    return this.request(url, 'POST', formData, {
      headers,
      ...otherConfig,
    })
  }

  blog<T = any>(
    url: string,
    params?: Recordable,
    otherConfig?: CustomAxiosRequestConfig
  ): Promise<T> {
    const headers = { responseType: 'blob' }
    return this.request(url, 'POST', params, {
      headers,
      ...otherConfig,
    })
  }


  request<T = any>(
    url: string,
    method: Method,
    params?: Recordable,
    otherConfig?: CustomAxiosRequestConfig
  ): Promise<T> {
    const config: CustomAxiosRequestConfig = {
      url:
        otherConfig?.mock && canMock && useEnv.isDevelopment
          ? `https://yapi.gzhclw.com/mock/82/${url}`
          : url, // 是否使用模拟接口
      method,
      params,
      ...otherConfig,
    }

    return new Promise((resolve, reject) => {
      // 统一节流，post put 接口请求正在调用，则不可重复发起请求
      if (loadingApi[url]) {
        useMessage.loading('网络请求中，请稍后')
        reject('网络请求中，请稍后')
        return
      }

      // 适配器，统一 get 和 post 的使用方式
      if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
        loadingApi[url] = true
        config.data = config.params
        config.params = {}
      }

      if (
        // 强制设置 loading
        config.withLoading === true
        // 未设置 false 强制关闭，则默认 post 类型请求添加loading
        || (config.withLoading !== false
          && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT'))
      ) {
        useMessage.loading('网络请求中...')
      }

      this.axiosInstance
        .request(config)
        // http code 状态码返回 200，接口调用正常，业务报错通过 data 中的 code 业务状态码进行标识
        .then(res => {
          delete loadingApi[url]

          // 不需要校验及解析，直接返回整个 res 对象
          if (config.returnRes) {
            return resolve(res as any)
          }

          // 不需要校验，直接返回整个 data 数据对象
          if (config.withoutCheck) {
            return resolve(res.data)
          }

          // 后端告知需要刷新 token
          if (res.headers['refresh-token']) {
            useUserStore().token = res.headers['refresh-token']
            setItem(STORAGE_KEY_TOKEN, useUserStore().token)
          }

          // 解析数据
          const { code, data, msg, pagination }: responseData = res.data
          // todo
          const dataNew = pagination
            ? {
              items: data,
              pagination,
            }
            : data

          switch (code) {
            case ProjectCode.Success:
              resolve(dataNew as T)
              break
            case ProjectCode.TokenExpired:
              reLoginTips()
              break
            default:
              useMessage.error(msg || '系统错误')
              reject(msg)
              break
          }
        })
        // todo 检查该分支
        // http 状态码返回 非 200，非业务报错，一般情况不会出现
        .catch(error => {
          delete loadingApi[url]
          if (error?.response?.status === HttpCode.TokenExpired) {
            reLoginTips()
            return
          }
          if (error?.response?.status === HttpCode.NO_EXIST) {
            useMessage.error('非法访问，查看的资源不存在！')
            reject(error)
            return
          }
          console.error('axios error', error)
          console.dir(error)
          useMessage.error('系统错误，请联系管理员')
          reject(error)
        })
        .finally(() => {
          useMessage.hideLoading()
        })
    })
  }
}

export const request = new Request({
  baseURL: useEnv.baseApiUrl,
  timeout: 10 * 1000,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
})
