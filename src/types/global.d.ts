// 定义 vue 的模块声明文件，在 ts 中 import 内容时，默认只识别 ts 文件，在此定义，来让 ts 识别 vue 模块
// 网络上有两种写法，为什么使用这一种，详情可查看 https://juejin.cn/post/6968364365237993479
declare module '*.vue' {
  import type { DefineComponent, Ref as _Ref } from 'vue'

  // 重写 Vue module 的 ts 定义，将部分 类型定义，提升为全局类型
  global {
    type Ref<T> = _Ref<T>
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  XLS: any;
}

// 权限枚举，罗列所有的权限类型
declare type Permission = keyof Reference.ClientPermissions


// 响应数据的页码信息
declare interface responsePagination {
  currentPage: number // 当前的页码，与请求参数保持一致
  pageSize: number // 当前每页的数量，与请求参数保持一致
  totalCount: number // 总条目数
  totalPage: number // 总页数
}

// 接口响应数据结构
declare interface responseData {
  data: any // 业务数据
  code: number // 业务状态吗
  msg: string // 信息
  pagination?: responsePagination
}


