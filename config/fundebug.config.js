import * as fundebug from 'fundebug-javascript'
import FundebugVue from 'fundebug-vue'
import { useEnv } from '@/hooks/env'

// 过滤常见无关错误
const filterMessages = [
  // ant-design 内部错误项信息，可忽略 https://github.com/ant-design/ant-design/issues/27359
  'ResizeObserver loop completed with undelivered notifications',
  // ant-design 内部错误项信息，可忽略 https://github.com/ant-design/ant-design/issues/15075
  // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
  'ResizeObserver loop limit exceeded',
  '用户名不存在',
  '密码错误',
]

// fundebug 配置项文档 https://docs.fundebug.com/notifier/javascript/customize/
export function setFunDebug(app) {
  // 因为 fundebug 是通过 import * as fundebug 导入的，是 export 的顶层元素，原则上应该为只读属性，不应该覆写，故改用 init 函数配置方式书写
  fundebug.init({
    apikey: '78c4e132eae2b5955cd3ee33c0a976680a1fd5fbb5e57a5378bac8a2c96ea6f0',
    releasestage: useEnv.appEnv,
    appversion: new Date().toLocaleString(),
    silentDev: true, // 不收集开发环境的错误，当 URL 中含有 localhost 或者 IP 时，判断为开发环境
    silentConsole: useEnv.isDevelopment, // 在开发环境，不重写 console 方法，避免 vue warn 信息多次打印，造成开发时卡死
    monitorHttpBody: true, // 开启 http 请求 body 数据收集
    monitorHttpResponse: true, // 开启 http 返回 body 数据收集
    filters: [ // 忽略特定错误
      { // 因数据量太大，不收集 reference 接口数据
        req: {
          method: /^GET$/,
          url: /global\/reference/
        },
        // hack 此处存在一个坑，在过滤接口请求时，需要结合 req 及 res 两个参数同时使用，否则过滤效果无效
        res: {
          status: /^200$/
        }
      },
      {
        message: new RegExp(`(${filterMessages.join('|')})`)
      },
      {
        req: {
          method: /^GET$/
        },
        res: {
          status: /^401$/
        }
      },
      {
        req: {
          method: /^POST$/
        },
        res: {
          status: /^401$/
        }
      }
    ]
  })
  app.use(new FundebugVue(fundebug))
}