import EmptyLayout from '@/views/layouts/empty-layout.vue'
import { CustomRouteRecordRaw } from 'vue-router'

export const workbenchRoutes: CustomRouteRecordRaw = {
  path: 'workbench',
  name: 'workbench',
  component: () => import('@/views/workbench/workbench.vue'),
  meta: {
    title: '工作台',
    iconfont: 'icon-computer-line',
  },
}
