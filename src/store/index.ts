import { createPinia } from 'pinia'
import { App } from 'vue'
import { useAppStore } from './modules/app'
import { useUserStore } from './modules/user'

const store = createPinia()

// 使用状态管理包
export function setupStore(app: App<Element>) {
  app.use(store)
}

function useUserWithoutStore() {
  return useUserStore(store)
}

export { store, useAppStore, useUserStore, useUserWithoutStore }
