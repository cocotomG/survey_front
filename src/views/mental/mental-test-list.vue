<template>
  <grid-table
    v-bind="gridProps"
    ref="gridTableEl"
  />
</template>
<script lang="ts" setup>
import { router } from '@/router'
import { mentalApi } from '@/api/mental'
import { useAppStore } from '@/store'
const { getReferenceItems } = useAppStore()
const gridProps = computed((): IGridTable.Props => ({
  title: '套餐列表',
  deleteable: true,
  api: {
    getList: mentalApi.getMentalTetList,
    del: async id => {
      await mentalApi.delMentalTest({ id })
    }
  },
  columnSchemas: [
    {
      title: '套餐名称',
      dataIndex: 'name'
    },
    {
      title: '套餐题数',
      dataIndex: 'mentalQuestionsCount',
      customRender: ({ record }) => `${record.mentalQuestionsCount}题`
    },
    {
      title: '套餐类型',
      dataIndex: 'type',
      enumSchemas: getReferenceItems('mentalTestTypeEnum')
    },
    {
      title: '套餐耗时',
      dataIndex: 'description'
    },
    {
      title: '原价',
      dataIndex: 'amount',
      customRender: ({ record }) => `￥${record.amount}`
    },
    {
      title: '折扣价',
      dataIndex: 'discountAmount',
      customRender: ({ record }) => `￥${record.discountAmount}`
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt'
    },
    {
      title: '操作人',
      dataIndex: 'createAdmin.account'
    },
    {
      title: '状态',
      dataIndex: 'isEnable',
      enumSchemas: getReferenceItems('enableEnum')
    }
  ],
  rowActions: [
    {
      label: '编辑',
      click: record => router.push({
        name: 'mentalTestEdit',
        params: { id: record.id },
      })
      // click: record => {
      //   console.log(record)

      // }
    }
  ],
  tableActions: [
    {
      label: '新增套餐',
      type: 'primary',
      click: () => router.push({
        name: 'mentalTestCreate',
      })
    }
  ],
  searchSchemas: [
    {
      label: '套餐名称',
      field: 'name',
      component: 'Input'
    } as IForm.Schema<'Input'>,
    {
      label: '修改时间',
      field: 'updatedAt',
      componentProps: {
        valueFormat: 'YYYY-MM-DD'
      },
      component: 'DateRangePicker'
    } as IForm.Schema<'DateRangePicker'>
  ]
}))
</script>