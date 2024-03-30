<template>
  <grid-table v-bind="gridProps" />
</template>
<script lang="ts" setup>
import { mentalApi } from '@/api/mental'
import { useAppStore } from '@/store'
const { getReferenceItems, getReferenceConstantMap } = useAppStore()
const gridProps = ref<IGridTable.Props>({
  title: '报告列表',
  api: {
    getList: mentalApi.getMentalTestReportsList
  },
  columnSchemas: [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '导出数量',
      dataIndex: 'reportCount'
    },
    {
      title: '导出状态',
      dataIndex: 'reportStatus',
      enumSchemas: getReferenceItems('mentalTestReportStatusEnum')
    },
    {
      title: '导出备注',
      dataIndex: 'remark'
    },
    {
      title: '导出人',
      dataIndex: 'reporter.name'
    },
  ],
  rowActions: [
    {
      label: '下载报告',
      click: record => {
        window.open(record.zipPath, '_self')
      },
      isShow: record => getReferenceConstantMap('mentalTestReportStatusEnum').REPORTED.value === record.reportStatus
    }
  ]
})
</script>