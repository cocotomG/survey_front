import EmptyLayout from '@/views/layouts/empty-layout.vue'
import { CustomRouteRecordRaw } from 'vue-router'

export const mentalRoutes: CustomRouteRecordRaw = {
  path: 'mental',
  name: 'mental',
  component: EmptyLayout,
  redirect: { name: 'workbench' },
  meta: {
    title: '心理测评',
    iconfont: 'icon-database',
  },
  children: [
    {
      path: 'mental-test-list',
      name: 'mentalTestList',
      component: () => import('@/views/mental/mental-test-list.vue'),
      meta: {

        title: '测试套餐',
      },
    },
    {
      path: 'mental-test-create',
      name: 'mentalTestCreate',
      component: () => import('@/views/mental/mental-test-create.vue'),
      meta: {
        hideInMenu: true,
        title: '新增测试套餐',
      },
    },
    {
      path: 'mental-test-edit/:id',
      name: 'mentalTestEdit',
      component: () => import('@/views/mental/mental-test-edit.vue'),
      meta: {
        hideInMenu: true,
        title: '测评测试套餐',
      },
    },
    {
      path: 'pay-log',
      name: 'payLog',
      component: () => import('@/views/mental/pay-log.vue'),
      meta: {
        title: '下单记录',
      },
    },
    {
      path: 'mental-test-report',
      name: 'mentalTestReport',
      component: () => import('@/views/mental/mental-test-report.vue'),
      meta: {
        title: '报告列表',
      },
      // props: {
      //   type: 2
      // }
    },
  ],
}
