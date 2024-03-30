import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { LocationQueryRaw, Router, CustomRouteRecordRaw } from 'vue-router'
import { useUserWithoutStore } from '@/store'
import { appRoutes } from '../routes'

NProgress.configure({ showSpinner: false })

// 设置路由守卫，进入每个路由前的操作
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {


    // todo，添加备注，优化代码
    function findFirstPermissionRoute() {
      const cloneRouters = [...appRoutes]
      while (cloneRouters.length) {
        const routeConfig = cloneRouters.shift() as CustomRouteRecordRaw
        if (userStore.hasPermission(routeConfig.meta?.requiredPermission)) {
          if (routeConfig?.children?.length) {
            cloneRouters.push(...routeConfig.children)
          } else {
            return { name: routeConfig.name }
          }
        }
      }
      return null
    }

    // 检查用户是否有权限进入页面
    function checkRoutePermission() {
      if (
        to.meta.noNeedAuth
        || userStore.hasPermission(to.meta?.requiredPermission)
      ) {
        next()
      } else {
        const destination = findFirstPermissionRoute() || { name: 'notFound' }

        next(destination)
      }
      NProgress.done()
    }

    // 跳转到登录页面
    function goLogin() {
      next({
        replace: true,
        name: 'login',
        query: {
          refererUrl: encodeURIComponent(to.fullPath),
        } as LocationQueryRaw,
      })
      NProgress.done()
    }

    NProgress.start()

    const userStore = useUserWithoutStore()

    // 进入无需登录的页面
    if (to.meta.noNeedAuth) {

      next()
      NProgress.done()
      return
    }

    // 未登录，跳转登录页
    if (!userStore.isLogin) {

      goLogin()
      return
    }

    // 有用户信息，校验权限
    if (userStore.user) {

      checkRoutePermission()
      return
    }

    // 无用户信息，调用接口获取
    try {

      await userStore.afterLogin()
      checkRoutePermission()
    } catch (error) {

      goLogin()
    }
  })
}
