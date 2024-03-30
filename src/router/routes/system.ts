import EmptyLayout from '@/views/layouts/empty-layout.vue'
import { CustomRouteRecordRaw } from 'vue-router'

export const systemRoutes: CustomRouteRecordRaw = {
  path: 'system',
  name: 'system',
  redirect: { name: 'menuList' },
  component: EmptyLayout,
  meta: {
    title: '系统管理',
    iconfont: 'icon-settings-line',
  },
  children: [
    {
      path: 'user-list',
      name: 'userList',
      component: () => import('@/views/system/user-list.vue'),
      meta: {
        title: '用户列表',
      },
    },
    {
      path: 'menu-list',
      name: 'menuList',
      component: () => import('@/views/system/menu-list.vue'),
      meta: {
        title: '菜单列表',
      },
    },
    {
      path: 'role-list',
      name: 'roleList',
      component: () => import('@/views/system/role-list.vue'),
      meta: {
        title: '角色列表',
      },
    },
  ],
}
