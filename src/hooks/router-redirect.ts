import { useUserStore } from '@/store'
import { cloneDeep } from 'lodash-es'
import { RouteLocationRaw } from 'vue-router'

export const redirectRouter = (childrenRoutes): RouteLocationRaw => {
  const { flatRoutes } = useUserStore()
  let childrenRoutesTmp = cloneDeep(childrenRoutes)
  // 过滤hideMenu true 的菜单
  let listRoutes = childrenRoutesTmp.filter(r => !r.meta?.hideInMenu)
  // 重定能访问的数组第一个路由
  return redirectF(flatRoutes, listRoutes)
}

export function redirectF(flatRoutes, children): RouteLocationRaw {
  for (let i = 0; i < children.length; i++) {
    if (flatRoutes.includes(children[i]?.meta?.requiredPermission)) {
      return { name: children[i].name }
    }
  }
  return { name: 'root' }
}