import { provide, inject } from 'vue'

const key = Symbol('BasicForm')

// 提供给子组件数据
export function createFormContext(context: Partial<IForm.Content>) {
  provide(key, context)
}

// 获取给父组件数据
export function useFormContext(): IForm.Content {
  return inject(key) as IForm.Content
}
