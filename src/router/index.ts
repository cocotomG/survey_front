import { useEnv } from '../hooks/env'
import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import createRouteGuard from './guards'

const router = createRouter({
  history: createWebHistory(useEnv.publicPath),
  routes,
})

createRouteGuard(router)

// 获取路由 name 到配置项的映射
const nameToRouterConfigMap: Recordable = {}
function getNameRouterConfigMap(routeConfigList) {
  routeConfigList.forEach(routeConfig => {
    if (routeConfig.children) {
      getNameRouterConfigMap(routeConfig.children)
    } else {
      nameToRouterConfigMap[routeConfig.name!] = routeConfig
    }
  })
}
getNameRouterConfigMap(routes)

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export { router, nameToRouterConfigMap }
