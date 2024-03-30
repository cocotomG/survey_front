<style lang="less" scoped>

</style>
<template>
  <div>
    <template v-if="dataSource.length === 0">
      <div
        v-if="props.textKeyMapArray.length > 0"
        class="w-full mb-2 text-center text-red-500 text-l"
      >
        **多sheet导入暂不支持校验数据和预览，请自行核对**
      </div>
      <div class="flex justify-center ">
        <a-upload-dragger
          :file-list="fileList"
          :max-count="1"
          accept=".xlsx, .xls"
          :multiple="false"
          :before-upload="() => false"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <basic-icon
              name="icon-upload_black_24dp"
              class="text-4xl"
            />
            <!-- <inbox-outlined /> -->
          </p>
          <p class="ant-upload-text">
            点击或拖拽文件到此上传
          </p>
          <p class="px-2 ant-upload-hint">
            可直接将文件拖拽到此处进行上传，支持格式: XLS、XLSX，大小不超过5M
          </p>
        </a-upload-dragger>
      </div>
      <Divider class="mt-10" />
      <!-- <div class="flex flex-row-reverse justify-between" /> -->
      <div class="flex justify-between mb-2 text-red-500 ">
        上传前请确认： <span
          v-if="props.showDownloadTmpButton"
          class="text-blue-500 cursor-pointer"
          @click="downloadFile(props.downLoadUrl, {}, props.excelName, 'xlsx')"
        >
          下载模板
        </span>
      </div>
      <div
        v-for="(tip,index) in props.warningTexts"
        :key="index"
        class="text-xs text-gray-500"
      >
        {{ tip }}
      </div>
    </template>

    <!-- 已上传文件，则预览数据 -->
    <div v-if="dataSource.length > 0 ">
      <a-button
        v-if="unValidateNumber.length > 0"
        type="primary"
        class="float-right ml-2 "
        style="margin-top: 2px;"
        @click="downloadError"
      >
        下载错误名单
      </a-button>
      <a-button
        type="primary"
        class="float-right "
        style="margin-top: 2px;"
        @click="toggle"
      >
        全屏预览
      </a-button>
      <div class="flex justify-between mt-5">
        <div>
          检测结果：共导入{{ dataSource.length }}条，<span class="text-green-500">{{ dataSource.length - unValidateNumber.length }}</span>条正常，<span class="text-red-500">{{ unValidateNumber.length }}</span>条异常
        </div>
      </div>
      <a-table
        ref="tableRef"
        :bordered="true"
        :scroll="{
          x: isFullscreen ? 'calc(100vh - 55px)' : tableWidth,
        }"
        :data-source="dataSource"
        :columns="columns"
        :pagination="{
          total:dataSource.length,
          pageSize:size,
          showQuickJumper:true,
          showLessItems:true,
          onShowSizeChange:onShowSizeChange,
          showSizeChanger:true
        }"
      >
        <template
          #bodyCell="{ column, record }"
        >
          <span>
            <div
              v-if="errorMsgReg.test(record[column.dataIndex])"
              class="text-red-500"
            >
              {{ record[column.dataIndex].substring(record[column.dataIndex].search(errorMsgReg),) }}
            </div>
            <div>  {{ record[column.dataIndex]?.replace(errorMsgReg,'') }}</div>
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { useMessage } from '@/hooks/message'
import { downloadFile } from '@/utils/file'
import { exportExcelDetail, getExcelOriginCell, getSheetHeaderAndData, TableHeaderColumn } from '@/utils/xlsx'
import { TableColumnsType, Divider, UploadFile } from 'ant-design-vue'
import { formatToDateTime, formatToDate, formatToMonth, dateFromNow } from '@/utils/date'
import { DateFormat, excelImportProps, ValidateKeyAndType, FilterDependedKeyAndString } from './props'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
import isIdentityCard from 'validator/es/lib/isIdentityCard'
import { parseDotStrObjToObj, transformObjToDotStrObj } from '@/utils/object'
import { cloneDeep, isEmpty, isUndefined, omit } from 'lodash-es'
import { Table } from 'ant-design-vue/es'
import { getRandomName } from './hooks/random-text-key'
const errorMsgReg = /\*\*\*(.*?)\*\*\*/
const fileList = ref<UploadFile []>([])
const dataSource = ref<Recordable[]>([])
let errorList:Recordable[] = []
const columns = ref<TableColumnsType>([])
const unValidateNumber = ref<number[]>([])
const tableRef = ref<InstanceType<typeof Table>>()
const tableWidth = ref(0)
const size = ref(5)
const { toggle, isFullscreen } = useFullscreen(tableRef)
const onShowSizeChange = (current: number, pageSize: number) => {
  size.value = pageSize
}
const downloadError = async () => {
  let textKeyMaps = Object.keys(props.textKeyMap).map(key => ({ [key]: props.textKeyMap[key] }))
  await exportExcelDetail(textKeyMaps, errorList, `${props.excelName}信息有误数据表.xlsx`)
}
// 解决百分比化小数精度问题 （百分比最多三位小数时）
const formatter = value => {
  let v = (parseFloat(value) / 100).toString()
  let vArr = v.split('.')
  if (vArr.length == 2) {
    v = `${vArr[0]}.${vArr[1].substring(0, 5)}`
    v = `${parseFloat(v)}`
  } else if (vArr.length == 1) {
    return `${v}`
  }
  return v
}
type EmitEvents = {
  (e:'update:value', dataSource:Recordable[]):void
}
const emits = defineEmits<EmitEvents>()
const props = defineProps(excelImportProps)
// 重置表格数据
const resetTable = () => {
  fileList.value = []
  dataSource.value = []
  emits('update:value', [])
}
// 格式化日期
const formatDate = (needFormatDataKey: string[], format: DateFormat, cloneItem) => {
  const formatFunctionMap = {
    'YYYY-MM-DD HH:mm': formatToDateTime,
    'YYYY-MM-DD': formatToDate,
    'YYYY-MM': formatToMonth,
    NOW: dateFromNow
  }
  needFormatDataKey.forEach(key => {
    if (key.split('.').length > 1) {
      // 如果是多级表头
      let dotStrItem = transformObjToDotStrObj(cloneItem)
      dotStrItem[key] = dotStrItem[key] && formatFunctionMap[format](dotStrItem[key])
      cloneItem = parseDotStrObjToObj(dotStrItem)
    } else {
      cloneItem[key] = cloneItem[key] && formatFunctionMap[format](cloneItem[key])
    }
  })
  return cloneItem
}
// 去百分号
const removePercentSign = (cloneDataList, needRemovePercentKey: string[], cloneItem, cloneItemindex) => {
  needRemovePercentKey.forEach(key => {
    if (key.split('.').length > 1) {
      // 如果是多级表头
      let dotStrItem = transformObjToDotStrObj(cloneItem)
      dotStrItem[key] = dotStrItem[key] && formatter(dotStrItem[key]) // 百分比化小数
      cloneDataList[cloneItemindex] = parseDotStrObjToObj(dotStrItem)
    } else {
      cloneItem[key] = cloneItem[key] && formatter(cloneItem[key])
    }
  })
  return cloneDataList
}
// 校验数据
const validateData = (validateKeyAndType: ValidateKeyAndType, tempUnValidateNumber, cloneItem, row) => {
  const realNameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  const bankAccountReg = /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/

  /* 错误信息映射 */
  const errorMassageMap = {
    not: '',
    mobilePhone: '手机号格式不对',
    idCard: '身份证号格式不对',
    bankAccount: '银行卡号格式不对',
    realName: '姓名不能为数字或少于2个中文字',
  }
  // 校验函数映射
  const validateFunctionMap = {
    not: item => item,
    mobilePhone: item => isMobilePhone(item || '', 'zh-CN'),
    idCard: item => isIdentityCard(item || '', 'zh-CN'),
    bankAccount: bankAccount => bankAccountReg.test(bankAccount),
    realName: realName => realNameReg.test(realName),
  }
  Object.keys(validateKeyAndType).forEach((key, column) => {
    if (key.split('.').length > 1) {
      console.log('多级')
      // 如果是多级表头
      cloneItem = transformObjToDotStrObj(cloneItem)
    }
    if (validateKeyAndType[key].required) {
      if (isUndefined(cloneItem[key])) {
        cloneItem[key] = '***必填***'
        tempUnValidateNumber.push(row)
        return
      }
      // 关联校验 如果某项必填，另一项也需要必填的关联
      if ((cloneItem[key] === validateKeyAndType[key].associationValidateString) && isUndefined(cloneItem[validateKeyAndType[key].requiredAssociationKey as string])) {
        cloneItem[validateKeyAndType[key].requiredAssociationKey as string] = '***必填***'
        tempUnValidateNumber.push(row)
        return
      }
    }
    if (!validateFunctionMap[validateKeyAndType[key].type](cloneItem[key])) {
      if (isUndefined(cloneItem[key])) {
        return
      }
      // 加上错误信息在具体位置
      cloneItem[key] = cloneItem[key] ? `${cloneItem[key]}***${errorMassageMap[validateKeyAndType[key].type]}***` : `***${errorMassageMap[validateKeyAndType[key].type]}***`
      tempUnValidateNumber.push(row)
    }
  })
  return {
    cloneItem
  }
}
// 过滤数据
const dataFilter = (cloneDataList, filterDependedKeyAndString: FilterDependedKeyAndString) => cloneDataList.filter(item => {

  if (filterDependedKeyAndString.key.split('.').length > 1) {
    // 如果是多级
    item = transformObjToDotStrObj(item)
  }
  return item[filterDependedKeyAndString.key] === filterDependedKeyAndString.dependedString
})

async function handleChange({ file }) {

  unValidateNumber.value = []
  if (file.status === 'removed') {
    console.log('removed')
    resetTable()
    return
  }
  // 单个sheet导入
  const singleSheet = sheetList => {
    console.log(sheetList, 'sheetList')
    let { headerColumns, dataList, dataSourceList } = getSheetHeaderAndData(sheetList[0], props.textKeyMap)
    const headerColumnsTextKey = headerColumns.map(i => i.title)
    const textKey = Object.keys(props.textKeyMap)

    /* 处理除配置以外的表头数据 生成随机的字段用于展示*/
    const excessTextKey = getRandomName(headerColumnsTextKey.length - textKey.length)
    console.log(excessTextKey, '随机key')
    excessTextKey.forEach((key, index) => {
      headerColumns[textKey.length + index].dataIndex = key
    })
    dataList = dataList.map(i => {
      let excessKeyAndValue: { key: string, value: string, label: string }[] = []
      let excessKeyAndValue1 = {}
      let needOmitKey: string[] = []
      excessTextKey.forEach((key, index) => {
        needOmitKey.push(headerColumns[textKey.length + index].title!)
        excessKeyAndValue1[headerColumns[textKey.length + index].title!] = i[headerColumns[textKey.length + index].title!]
        excessKeyAndValue.push({
          label: headerColumns[textKey.length + index].title!,
          value: i[headerColumns[textKey.length + index].title!],
          key: headerColumns[textKey.length + index].dataIndex!
        })
        i[headerColumns[textKey.length + index].dataIndex!] = i[headerColumns[textKey.length + index].title!]
      })
      i.feildList = excessKeyAndValue1
      console.log(excessKeyAndValue, 'excessKeyAndValue')
      return omit(i, ...needOmitKey)
    })
    let status = true
    // 单sheet导入通过判断配置的表头名字来验证是否选错导入表格(为了可以自定义表头导入，只要选择的表头包含了配置的表头既正确)
    textKey.forEach(key => {
      status = headerColumnsTextKey.includes(key)
    })
    let errorAndOriginalDataList: Recordable[] = []
    let tempUnValidateNumber: number[] = []
    let cloneDataList = cloneDeep(dataList)
    cloneDataList.forEach((item, index) => {
      // 是否去掉百分号
      if (props.needRemovePercentKey.length) {
        dataList[index] = removePercentSign(cloneDataList, props.needRemovePercentKey, item, index)
      }
      // 先格式化再验证，不会显示invalid date
      // 是否格式化日期
      if (props.needFormatDataKey.length) {
        dataList[index] = formatDate(props.needFormatDataKey, props.format, item)
      }
      // 是否校验数据
      if (!isEmpty(props.validateKeyAndType)) {
        let { cloneItem } = validateData(props.validateKeyAndType, tempUnValidateNumber, item, index)
        errorAndOriginalDataList.push(cloneItem)
      }

    })
    unValidateNumber.value = Array.from(new Set(tempUnValidateNumber)) // 去除重复索引
    // 过滤出没通过校验的数据
    let unValiDateDataList = errorAndOriginalDataList.filter((item, index) => unValidateNumber.value.includes(index))
    //  过滤出通过校验的数据
    let valiDateDataList = cloneDataList.filter((item, index) => !unValidateNumber.value.includes(index))
    console.log(valiDateDataList, '通过校验的数据', unValiDateDataList, '错误的数据')

    // 是否过滤数据
    if (props.isFilter) {
      valiDateDataList = dataFilter(valiDateDataList, props.filterDependedKeyAndString!)
    }
    return {
      headerColumns,
      errorAndOriginalDataList,
      valiDateDataList,
      unValiDateDataList,
      status
    }
  }
  // 多个sheet导入
  const multipleSheets = (sheetList: string[][][], sheetNames:string[]) => {
    let excelList = [] as Array<{ headerColumns: TableHeaderColumn[]; dataList: Recordable<any>[]; dataSourceList: Recordable<any>[]; }>
    let status = true
    // 多sheet导入通过判断sheet的名字来验证是否选错导入表格
    if (sheetNames.join(',') !== props.sheetNames.join(',')) {
      status = false
      resetTable()
      return {
        excelList,
        status
      }
    }
    for (let i = 0; i < sheetList.length; i++) {
      if (props.notResolvedSheetIndex.includes(i)) { // 跳过不需要解析的sheet
        continue
      }
      let { headerColumns, dataList, dataSourceList } = getSheetHeaderAndData(sheetList[i], props.textKeyMapArray[i].textKeyMap)
      // 是否去掉百分号
      if (props.textKeyMapArray[i].needRemovePercentKey) {
        let cloneDataList = cloneDeep(dataList)
        cloneDataList.forEach((item, index) => {
          item = removePercentSign(cloneDataList, props.textKeyMapArray[i].needRemovePercentKey!, item, index)
        })
        dataList = cloneDataList
      }
      // 是否过滤数据
      if (props.textKeyMapArray[i].isFilter) {
        dataList = dataFilter(dataList, props.textKeyMapArray[i].filterDependedKeyAndString!)
      }
      excelList.push({
        headerColumns,
        dataList,
        dataSourceList
      })
    }
    return {
      excelList,
      status
    }
  }

  const { excelData: sheetList, sheetNames } = await getExcelOriginCell(file) // 获取 excel 表所有 sheet 所有单元格数据
  if ((props.maxImportNum <= sheetList.reduce((sum, sheet) => sum + sheet.length, 0) || props.maxImportNum <= sheetList[0].length)) {
    console.log(`最多导入${props.maxImportNum}条`)
    useMessage.error(`最多导入${props.maxImportNum}条`)
    resetTable()
    return
  }
  if (props.textKeyMapArray.length > 0) {
    const { excelList, status } = multipleSheets(sheetList, sheetNames)
    if (!status) {
      useMessage.error('模板错误，请选择正确模板')
      return
    }
    try {
      if (excelList.length === 0) {
        useMessage.error('没有通过校验的信息，请核对')
      } else {
        emits('update:value', excelList)
        fileList.value = [file]
      }
    } catch (error) {
      useMessage.error('表格数据不正确，请重新检查')
      console.log(error)
    }
  } else {
    const { headerColumns, unValiDateDataList, errorAndOriginalDataList, valiDateDataList, status } = singleSheet(sheetList)
    if (!status) {
      useMessage.error('模板错误，请选择正确模板')
      return
    }
    console.log('headerColumns', headerColumns) // table 表头结构
    console.log('errorAndOriginalDataList', errorAndOriginalDataList) // table 表格数据
    console.log('valiDateDataList', valiDateDataList) // 传递给后端的数据
    tableWidth.value = headerColumns.length * 110
    columns.value = headerColumns
    dataSource.value = errorAndOriginalDataList
    errorList = unValiDateDataList
    try {
      if (valiDateDataList.length === 0) {
        useMessage.error('没有通过校验的信息，请核对')
      } else if (valiDateDataList.length > props.maxImportNum) {
        useMessage.error(`表格上传不能超过${props.maxImportNum}条数据`)
      } else {
        emits('update:value', valiDateDataList)
        fileList.value = [file]
      }
    } catch (error) {
      useMessage.error('表格数据不正确，请重新检查')
      console.log(error)
    }
  }


}


// 一级菜单映射
// const textKeyMap = {
//   姓名: 'data.realname',
//   证件类型: 'data.mobile', // todo
//   证件号码: 'data.idcard',
//   手机号码: 'data.mobile',
//   性别: 'data.sex',
//   部门: 'data.departmentName',
//   岗位: 'data.jobName',
//   合同主体: 'data.staffContractName',
//   入职日期: 'data.entryDate',
//   合同开始日: 'data.staffStartedAt',
//   合同结束日: 'data.staffEndedAt',
//   试用期开始日: 'data.probationStartAt',
//   试用期结束日: 'data.probationEndAt',
//   开户银行: 'data.bankName',
//   银行支行: 'data.bankBranchInfo',
//   银行账号: 'data.bankCard',
//   开户行省市: 'data.bankCity',
//   户籍地址: 'data.houseAdress',
//   现住址: 'data.currentLiveAddress',
//   紧急联系人: 'data.urgentContacts',
//   紧急联系人电话: 'data.urgentContactsPhone',
//   是否购买社保: 'data.isBuySocial',
//   是否购买公积金: 'data.isBuyProvident',
//   购买社保时间: 'data.socialAddMonth',
//   购买公积金时间: 'data.providentAddMonth',
//   工作地: 'data.workCityName',
//   学历: 'data.education',
//   电子签: 'data.isElectronicSignature',
//   备注: 'data.remark',
//   婚育情况: 'data.marry',
//   用工类型: 'data.staffType',
// }

// 二级菜单映射
// const textKeyMap = {
//   '*姓名': 'user.realname',
//   '*手机号': 'user.mobile',
//   '*身份证号': 'user.idcard',
//   '*员工状态': 'employee.status',
//   '*员工类型': 'employee.type',
//   '*学历': 'employee.education',
//   '*应聘职位': 'employee.jobName',
//   '*性别': 'employee.sex',
//   '*户籍地址': 'employee.nativeAddress',
//   '*期望薪资（元/月）': 'employee.jobSalary',
//   '*现居住地址': 'employee.presentAddress',
//   '*用工单位': 'employee.companyName',
//   '*身高（cm）': 'employee.height',
//   '紧急联系人.*联系人姓名': 'employee.emergencyName',
//   '紧急联系人.*关系': 'employee.emergencyType',
//   '紧急联系人.*联系人电话': 'employee.emergencyMobile',
//   '紧急联系人.通讯地址': 'employee.emergencyAddress',

//   '主要工作经历1.*公司名称': 'workExperience1.companyName',
//   '主要工作经历1.*开始日期': 'workExperience1.startedAt',
//   '主要工作经历1.*结束日期': 'workExperience1.endedAt',
//   '主要工作经历1.*部门': 'workExperience1.departmentName',
//   '主要工作经历1.*职位': 'workExperience1.jobName',
//   '主要工作经历1.证明人': 'workExperience1.referenceName',
//   '主要工作经历1.电话': 'workExperience1.referenceMobile',

//   '主要工作经历2.公司名称': 'workExperience2.companyName',
//   '主要工作经历2.开始日期': 'workExperience2.startedAt',
//   '主要工作经历2.结束日期': 'workExperience2.endedAt',
//   '主要工作经历2.部门': 'workExperience2.departmentName',
//   '主要工作经历2.职位': 'workExperience2.jobName',
//   '主要工作经历2.证明人': 'workExperience2.referenceName',
//   '主要工作经历2.电话': 'workExperience2.referenceMobile',

//   '主要工作经历3.公司名称': 'workExperience3.companyName',
//   '主要工作经历3.开始日期': 'workExperience3.startedAt',
//   '主要工作经历3.结束日期': 'workExperience3.endedAt',
//   '主要工作经历3.部门': 'workExperience3.departmentName',
//   '主要工作经历3.职位': 'workExperience3.jobName',
//   '主要工作经历3.证明人': 'workExperience3.referenceName',
//   '主要工作经历3.电话': 'workExperience3.referenceMobile',
// }

// 三级菜单中文与数据结构的映射
// const textKeyMap = {
//   所得项目: 'project',
//   '本月（次）情况.收入额计算.收入': 'month.income.income',
//   '本月（次）情况.收入额计算.费用': 'month.income.fee',
//   '本月（次）情况.收入额计算.免税收入': 'month.income.freeIncome',
//   '本月（次）情况.减除费用': 'month.cut',
//   '本月（次）情况.专项扣除.基本养老保险费': 'month.specialCut.forOld',
//   '本月（次）情况.专项扣除.基本医疗保险费': 'month.specialCut.forMedical',
//   减按计税比例: 'rate',
// }

</script>
