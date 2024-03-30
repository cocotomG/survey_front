import type { CustomRouteRecordRaw, RouteLocationRaw } from 'vue-router'
import { useSiteConfig } from '@/hooks/site-config'
import BackendLayout from '@/views/layouts/backend-layout.vue'
import { workbenchRoutes } from './workbench'
import { systemRoutes } from './system'

const { backendPrefix } = useSiteConfig

export const appRoutes: CustomRouteRecordRaw[] = [
  workbenchRoutes,
  systemRoutes,
]

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/',
    name: 'OffcailWeb',
    redirect: { name: 'login' },
  },
  {
    path: `${backendPrefix}login`,
    name: 'login',
    component: () => import('@/views/auth/login/login.vue'),
    meta: {
      title: '账号登录',
      noNeedAuth: true,
    },
  },
  {
    path: backendPrefix,
    name: 'root',
    component: BackendLayout,
    redirect: { name: 'workbench' },
    children: appRoutes,
  },
  {
    path: '/:patchMatch(.*)*',
    name: 'notFound',
    redirect: { name: 'root' },
    // component: () => import('@/views/404.vue'),
    // meta: {
    //   title: '页面不存在',
    //   noNeedAuth: true,
    // },
  },
]

// 获取父路由的名字
function setParentName(routeList, parentNameList) {
  routeList.forEach(route => {
    route.meta = route.meta || {}
    route.meta.parentName = parentNameList
    route.children?.length
      && setParentName(route.children, [...parentNameList, route.name])
  })
}
setParentName(routes, [])

export default routes


export function redirectF(children): RouteLocationRaw {


  for (let i = 0; i < children.length; i++) {
    console.log(children[i])
    // if (flatRoutes.includes(children[i].name)) {
    //   return { name: children[i].name }
    // }
  }
  return { name: 'projectList' }
}