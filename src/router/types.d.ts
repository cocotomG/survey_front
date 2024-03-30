import type { RouteRecordRaw } from 'vue-router'


declare module 'vue-router' {
  // 定义 meta 类型，罗列可选参数
  interface RouteMeta {
    title?: string; // The locale name show in side menu and breadcrumb
    requiredPermission?: Permission,
    noNeedAuth?: boolean; // Whether login is required to access the current page (every route must declare)
    icon?: string; // The icon show in the side menu
    iconfont?: string; // The icon form iconfont in the side menu
    hideInMenu?: boolean; // If true, it is not displayed in the side menu
    order?: number; // Sort routing menu items. If set key, the higher the value, the more forward it is
    noAffix?: boolean; // if set true, the tag will not affix in the tab-bar
    ignoreCache?: boolean; // if set true, the page will not be cached
    parentName?: string, // 父路由的路由名，自动遍历赋值
    parentNameForBreadcrumb?: string, // 在面包屑导航中，父面包屑对应的路由名，由于面包屑的父子路由可能在路由定义时是平级的，故需要手动维护
    actionRouterName?: string, // 配置hideInMenu，侧边栏没有激活，可手动添加激活菜单,会缓存菜单selectkey在本地，刷新可重新激活菜单
    desc?: string, // 父路由的简介
  }

  // 复写 RouteRecordRaw，添加 meta 的约束条件
  type CustomRouteRecordRaw = RouteRecordRaw & {
    meta?: RouteMeta,
    children?: CustomRouteRecordRaw[],
  }

//  declare type RouteLocationRaw = ''
  interface LocationAsRelativeRaw {
    name?: '222' | RouteRecordName;
    params?: RouteParamsRaw;
  }
}


