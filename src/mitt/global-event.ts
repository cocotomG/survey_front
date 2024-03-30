import mitt from 'mitt'

/** 强制刷新当前路由，解决 params 修改时，vue 无法重新触发声明周期的问题 */
export const FORCE_REFRESH_ROUTE = Symbol('FORCE_REFRESH_ROUTE')

// 定义 emitt 事件枚举，key 为 emitt 监听的事件。value 为该事件监听时，及事件发送时，应该携带的参数
type Events = {
  // 因为事件名为 symbol 类型，所以需要通过字面量（中括号）方式传入，否则会被当做字符串
  // 使用 symbol 类型，一方面是避免变量名重复的冲突，一方面是强制通过 import 导入数据，强制定义该事件，明确事件的作用，避免 emit 的随意引用
  [FORCE_REFRESH_ROUTE]: undefined,
}

export const emitter = mitt<Events>()