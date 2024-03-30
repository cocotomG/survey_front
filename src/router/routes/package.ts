
import EmptyLayout from '@/views/layouts/empty-layout.vue'
import { CustomRouteRecordRaw } from 'vue-router'

export const packageRoutes: CustomRouteRecordRaw = {
  path: 'package',
  name: 'package',
  component: EmptyLayout,
  meta: {
    title: '套餐管理',
    iconfont: 'icon-folder-5-line',
  },
  children: [
    {
      path: 'back-package',
      name: 'backPackage',
      component: () => import('@/views/package/back-package.vue'),
      meta: {
        title: '背调套餐',
      },
    }
  ],
}