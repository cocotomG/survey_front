<template>
  <a-card
    :tab-list="tabList"
    @tabChange="key => onTabChange(key)"
  >
    <grid-table
      v-bind="gridProps"
      ref="gridTableEl"
    />
  </a-card>
</template>
<script lang="tsx" setup>
import { useAppStore } from '@/store'
import { mentalApi } from '@/api/mental'
// import { previewFromUrl } from '@/utils/file'
const { getReferenceItems, getReferenceConstantMap } = useAppStore()
const mentalAnswerStatusEnum = getReferenceConstantMap('mentalAnswerStatusEnum')
interface TabList {
  key: string,
  tab: string
}
const tabList = reactive<TabList[]>([])
const status = ref(undefined)
const gridTableEl = ref()
const gridProps = computed((): IGridTable.Props => ({
  title: '下单记录',
  columnSchemas: needSchemas.value,
  api: {
    getList: mentalApi.getMentalAnswererList
  },
  getListApiParams: {
    answerStatus: status.value
  },
  rowActions: [
    // {
    //   label: '撤销',
    //   // needReload: true,
    //   isShow: record => record.backStatus !== getReferenceConstantMap('backSystemStatusEnum').CANCEL.value && record.backStatus !== getReferenceConstantMap('backSystemStatusEnum').DONE.value,
    //   confirm: '确定撤销吗?',
    //   click: async record => {
    //     await backOrderApi.cancel({ id: record.id })
    //     gridTableEl.value.reload()
    //   }
    // },
    // {
    //   label: '测评报告',
    //   // isShow: record => record.backStatus === getReferenceConstantMap('backSystemStatusEnum').DONE.value,
    //   click: async record => {
    //     // let url = await backOrderApi.downloadPdf({ id: record.id })
    //     // previewFromUrl(url)
    //   }
    // },
    {
      label: '测评报告',
      isShow: record => record.answerStatus === getReferenceConstantMap('mentalAnswerStatusEnum').FINISHED.value,
      click: record => {
        window.open(record.filePath)
      }
    }
  ],
  searchSchemas: [
    {
      label: '下单时间',
      field: 'createdAt',
      component: 'DateRangePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD'
      }
    } as IForm.Schema<'DateRangePicker'>,
    {
      label: '下单部门',
      field: 'siteTeamId',
      component: 'CommonApiSelect',
      componentProps: {
        commonApiSelectType: 'companyTeam',
      }
    } as IForm.Schema<'CommonApiSelect'>,
    {
      label: '姓名',
      field: 'name',
      component: 'Input',
    } as IForm.Schema<'Input'>,
    {
      label: '手机号',
      field: 'mobile',
      component: 'Input',
    } as IForm.Schema<'Input'>,
    {
      label: '订单号',
      field: 'sn',
      component: 'Input',
    } as IForm.Schema<'Input'>,
    {
      label: '答题状态',
      field: 'answerStatus',
      component: 'ReferenceSelect',
      componentProps: {
        referenceKey: 'mentalAnswerStatusEnum'
      }
    } as IForm.Schema<'ReferenceSelect'>
  ]
}))

const needSchemas = computed(() => {
  const schemas: IGridTable.ColumnProps[] = [
    {
      title: '客户名称',
      dataIndex: 'company.name',
    },
    {
      title: '测试套餐',
      dataIndex: 'mentalTest.name',
    },
    {
      title: '候选人',
      dataIndex: 'joiner.realname',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '提交时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '背调方式',
      dataIndex: 'mentalOrder.mentalTestChannel',
      enumSchemas: getReferenceItems('mentalTestChannelEnum')
    },
    {
      title: '报告结论',
      dataIndex: 'answerResultStr',
    }
  ]
  if (status.value == undefined) {
    schemas.push({
      title: '任务状态',
      dataIndex: 'answerStatus',
      enumSchemas: getReferenceItems('mentalAnswerStatusEnum')
    })
  }
  return schemas
})
const onTabChange = (value: string) => {
  status.value = value
  gridProps.value.getListApiParams = { answerStatus: status.value }
  gridTableEl.value.setColumns(needSchemas.value)
  // gridTableEl.value?.reload()
}
interface Statistic {
  all: string | number,
  cancel: string | number,
  finished: string | number,
  notStarted: string | number,
  underway: string | number
}
const statistic = ref<Statistic>()
// 获取记录数据数量
const getBackOrderStatistic = async () => {
  statistic.value = await mentalApi.getStatisticAnswerStatusCount()
  getTabList(getReferenceItems('mentalAnswerStatusEnum'))
  console.log(statistic.value, tabList, '5555')
}
// 整理数据
function getTabList(list) {
  tabList.push({
    key: undefined,
    tab: `全部测评(${statistic.value?.all})`,
  })
  list.forEach(item => {
    switch (item.value) {
      case mentalAnswerStatusEnum.NOT_STARTED.value:
        tabList.push({
          key: `${item.value}`,
          tab: `${item.label}(${statistic.value?.notStarted})`
        })
        break
      case mentalAnswerStatusEnum.UNDERWAY.value:
        tabList.push({
          key: `${item.value}`,
          tab: `${item.label}(${statistic.value?.underway})`
        })
        break
      case mentalAnswerStatusEnum.FINISHED.value:
        tabList.push({
          key: `${item.value}`,
          tab: `${item.label}(${statistic.value?.finished})`
        })
        break
      case mentalAnswerStatusEnum.CANCEL.value:
        tabList.push({
          key: `${item.value}`,
          tab: `${item.label}(${statistic.value?.cancel})`
        })
        break
      default:
        break
    }
  })
}
getBackOrderStatistic()
</script>