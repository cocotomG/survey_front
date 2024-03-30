import EmptyLayout from '@/views/layouts/empty-layout.vue'
import { CustomRouteRecordRaw } from 'vue-router'

export const exampleRoutes: CustomRouteRecordRaw = {
  path: 'example',
  name: 'example',
  component: EmptyLayout,
  meta: {
    title: 'Excel导入/导出示例',
    icon: 'laptop-outlined',
  },
  children: [
    {
      path: 'example-list',
      name: 'exampleList',
      component: () => import('@/views/example/Import.vue'),
      meta: {
        title: '导入/导出示例',
      },
    },

  ],
}