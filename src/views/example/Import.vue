<template>
  <grid-table v-bind="tableAttrs" />
</template>

<script lang='ts' setup>import globalModelForm from '@/hooks/global-model-form'
import ExcelImport from './component/excel-import.vue'
import { useAppStore, useUserStore } from '@/store'
import { toStyleXlsx, transformDataToSheetCells } from '@/utils/xlsx'
import { utils } from 'xlsx'
const useStore = useUserStore()
const { getReferenceItems, getReferenceConstantMap } = useAppStore()
// 自定义 Excel 数据导出示例
function exportExcel() {
  // 测试数据，需要提前转化好对应的所需格式，枚举值的，则需要提前转义为对应的中文
  const dataList = [
    {
      project: '正常工资薪金',
      month2: '4208.20',
      month: {
        income: {
          fee: '11.00',
          freeIncome: '12.00'
        },
        cut: '5000.00',
        specialCut: {
          forOld: '13.00',
          forMedical: '14.00'
        }
      },
      rate: '100%'
    },
    {
      project: '正常工资薪金',
      month2: '6342.10',
      month: {
        income: {
          fee: '21.00',
          freeIncome: '22.00'
        },
        cut: '5000.00',
        specialCut: {
          forOld: '23.00',
          forMedical: '24.00'
        }
      },
      rate: '100%'
    },
    {
      project: '正常工资薪金',
      month2: '6789.10',
      month: {
        income: {
          fee: '31.00',
          freeIncome: '32.00'
        },
        cut: '5000.00',
        specialCut: {
          forOld: '33.00',
          forMedical: '34.00'
        }
      },
      rate: '100%'
    }
  ]

  // // 三级菜单中文与数据结构的映射
  const textKeyMaps:Recordable[] = [
    { 所得项目: 'project' },
    { '本月（次）情况.收入额计算.收入': 'month2' },
    { '本月（次）情况.收入额计算.费用': 'month.income.fee' },
    { '本月（次）情况.收入额计算.免税收入': 'month.income.freeIncome' },
    { '本月（次）情况.减除费用': 'month.cut' },
    { '本月（次）情况.专项扣除.基本养老保险费': 'month.specialCut.forOld' },
    { '本月（次）情况.专项扣除.基本医疗保险费': 'month.specialCut.forMedical' },
    { 减按计税比例: 'rate' },
  ]

  // 二级菜单中文与数据结构的映射
  // const textKeyMaps:Recordable[] = [
  //   { 所得项目: 'project' },
  //   { '收入额计算.收入': 'month2' },
  //   { '收入额计算.费用': 'month.income.fee' },
  //   { '收入额计算.免税收入': 'month.income.freeIncome' },
  //   { '本月（次）情况.减除费用': 'month.cut' },
  //   { '本月（次）情况.基本养老保险费': 'month.specialCut.forOld' },
  //   { '本月（次）情况.基本医疗保险费': 'month.specialCut.forMedical' },
  //   { 减按计税比例: 'rate' },
  // ]

  // // 一级菜单中文与数据结构的映射
  // const textKeyMaps:Recordable[] = [
  //   { 所得项目: 'project' },
  //   { 收入: 'month2' },
  //   { 费用: 'month.income.fee' },
  //   { 免税收入: 'month.income.freeIncome' },
  //   { 减除费用: 'month.cut' },
  //   { 基本养老保险费: 'month.specialCut.forOld' },
  //   { 基本医疗保险费: 'month.specialCut.forMedical' },
  //   { 减按计税比例: 'rate' },
  // ]

  const { headerMerges, cells } = transformDataToSheetCells(dataList, textKeyMaps)
  const worksheet = utils.aoa_to_sheet(cells)

  worksheet['!merges'] = headerMerges

  // 所有单元格居中显示
  Object.values(worksheet).forEach(cell => {
    if (cell.v) {
      cell.s = {
        alignment: {
          horizontal: 'center',
          vertical: 'center',
        },
      }
    }
  })
  toStyleXlsx({
    filename: 'filename.xlsx',
    worksheet
  })
}
const tableAttrs = ref<IGridTable.Props>({
  title: '发薪单',
  selectable: true,
  exportable: true,
  tableActions: [
    {
      label: '自定义 Excel 导出示例',
      click: exportExcel,
      type: 'primary',
    },
    {
      label: '导入',
      click: () =>
        new Promise(resolve => {
          globalModelForm.init({
            width: '500px',
            title: '批量导入入职/离职名单',
            okType: 'primary',
            okText: '确认导入',
            schemas: [
              {
                field: 'workerList',
                component: 'ExcelImport',
                componentProps: {
                  excelName: '员工花名册模板',
                  maxImportNum: 500,
                  downLoadUrl: 'https://lanxin-1301695016.cos.ap-guangzhou.myqcloud.com/web/hr/%E8%8A%B1%E5%90%8D%E5%86%8C%E6%A8%A1%E6%9D%BF.xlsx',
                  // isFormatDate: true,
                  format: 'YYYY-MM-DD',
                  needFormatDataKey: ['probationEndAt', 'probationStartAt', 'staffEndedAt', 'staffStartedAt', 'entryDate'],
                  textKeyMap: {
                    姓名: 'realname',
                    证件类型: 'idcardType',
                    证件号码: 'idcard',
                    手机号码: 'mobile',
                    性别: 'sex',
                    部门: 'departmentName',
                    岗位: 'jobname',
                    合同主体: 'contractCompanyId',
                    入职日期: 'entryDate',
                    合同开始日: 'staffStartedAt',
                    合同结束日: 'staffEndedAt',
                    试用期开始日: 'probationStartAt',
                    试用期结束日: 'probationEndAt',
                    开户银行: 'bankName',
                    银行支行: 'bankBranchInfo',
                    银行账号: 'bankCard',
                    开户行省市: 'bankCity',
                    户籍地址: 'houseAddress',
                    现住址: 'currentLiveAddress',
                    紧急联系人: 'urgentContacts',
                    紧急联系人电话: 'urgentContactsPhone',
                    是否购买社保: 'isBuySocial',
                    是否购买公积金: 'isBuyProvident',
                    购买社保时间: 'socialAddMonth',
                    购买公积金时间: 'providentAddMonth',
                    工作地: 'workCityName',
                    学历: 'education',
                    电子签: 'isElectronicSignature',
                    备注: 'remark',
                    婚育情况: 'marry',
                    用工类型: 'staffType',
                  },
                }
              } as IForm.Schema<'ExcelImport'>
            ],
            api: async params => {
              if (!params.workerList || params.list?.workerList === 0) {
                useMessage.error('请先上传表格')
                return Promise.reject()
              }
              await workApi.batchImportWorker({
                projectId,
                data: [params.workerList][0]
              })
              resolve('')
              return '批量导入成功'
            },
          })
        }),
      needReload: true
    },
  ],
  exportHandler: ({ tableData, tableHeader, filename, apiData }) => new Promise(resolve => {
    let sumMoney = 0
    apiData.forEach(data => {
      sumMoney += Number(data.money)
    })

    const xlsxData: any[] = []

    xlsxData.push(['商户转账批次明细'])
    xlsxData.push(['基本信息'])
    xlsxData.push(['商户名称', useStore.client?.company])
    xlsxData.push(['汇总金额', sumMoney.toFixed(2)])
    xlsxData.push(['商户转账批次明细情况'])
    xlsxData.push(tableHeader)
    xlsxData.push(...tableData)
    const columnLength = tableData[0].length - 1
    const worksheet = utils.aoa_to_sheet(xlsxData)

    worksheet['!merges'] = [
      // 【商户转账批次明细】单元格合并
      {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: columnLength
        }
      },
      // 【基本信息】单元格合并
      {
        s: {
          r: 1,
          c: 0
        },
        e: {
          r: 1,
          c: columnLength
        }
      },
      // 【商户名称】单元格合并
      {
        s: {
          r: 2,
          c: 1
        },
        e: {
          r: 2,
          c: columnLength
        }
      },
      // 【汇总金额】单元格合并
      {
        s: {
          r: 3,
          c: 1
        },
        e: {
          r: 3,
          c: columnLength
        }
      },
      // 【商户转账批次明细情况】单元格合并
      {
        s: {
          r: 4,
          c: 0
        },
        e: {
          r: 4,
          c: columnLength
        }
      },
    ];


    // 单元格水平居中
    ['A1', 'A2', 'B3', 'B4', 'A5'].forEach(element => {
      worksheet[element].s = {
        alignment: {
          horizontal: 'center',
        },
      }
    })
    toStyleXlsx({
      filename,
      worksheet
    })
    resolve()
  }),
  api: {
    // getList: payBillApi.getPayBillMembers,
  },
  getListApiParams: {
    // type: BillTypes.SELF.value
  },
  columnSchemas: [
    {
      title: '订单编号',
      dataIndex: 'billWithCompany.sn',
    },
    {
      title: '订单名称',
      dataIndex: 'billWithCompany.title',
    },
    {
      title: '用工单位',
      dataIndex: 'billWithCompany.company.title',
    },
    {
      title: '员工姓名',
      dataIndex: 'realname',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '身份证号码',
      dataIndex: 'idcard',
    },
    {
      title: '总出勤工时',
      dataIndex: 'workingHour',
    },
    {
      title: '工时单价',
      dataIndex: 'unitMoney',
    },
    {
      title: '其他工资',
      dataIndex: 'otherMoney',
    },
    {
      title: '实发工资',
      dataIndex: 'money',
    },
    {
      title: '发放状态',
      dataIndex: 'status',
      enumSchemas: getReferenceItems('billStatuses'),
    },
    {
      title: '发放失败原因',
      dataIndex: 'memo',
    },
    {
      title: '发放时间',
      dataIndex: 'completedAt',
    },
    {
      title: '备注',
      dataIndex: 'billWithCompany.remark',
    },
  ],

})
</script>

