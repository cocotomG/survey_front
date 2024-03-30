<template>
  <div class="p-2 border border-solid border-gray-300">
    <template v-if="dataSource.length === 0">
      <div class="flex justify-between">
        <div class="text-gray-500">
          上传表格
        </div>
        <div
          class="text-blue-500 cursor-pointer"
          @click="downloadFile(props.downLoadUrl, {}, props.excelName, 'xlsx')"
        >
          下载模板
        </div>
      </div>
      <div class="mt-8 text-red-500">
        *上传前请确认
      </div>
      <div class="text-gray-500">
        1、仅支持excel文件（格式为.xlsx和.xls），数据必须放在第一个sheet；
      </div>
      <div class="text-gray-500">
        2、上传表格支持范围: 不超过500行，且大小不超过5M的文件；
      </div>
      <div class="pt-8 pb-6 flex justify-center">
        <a-upload
          accept=".xlsx, .xls"
          :file-list="[]"
          :before-upload="() => false"
          @change="handleChange"
        >
          <a-button type="primary">
            上传文件
          </a-button>
        </a-upload>
      </div>
      <div class="text-center text-gray-500">
        可直接将文件拖拽到此处进行上传，支持格式: XLS、XLSX
      </div>
    </template>
    <!-- 已上传文件，则预览数据 -->
    <div v-show="dataSource.length > 0">
      <a-table
        :bordered="true"
        :scroll="{ x: 4000 }"
        :data-source="dataSource"
        :columns="columns"
        :pagination="false"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMessage } from '@/hooks/message'
import { downloadFile } from '@/utils/file'
import { getExcelOriginCell, getSheetHeaderAndData } from '@/utils/xlsx'
import { TableColumnsType } from 'ant-design-vue'
const dataSource = ref<Recordable[]>([])
const columns = ref<TableColumnsType>([])
type EmitEvents = {
  (e:'update:value', dataSource:Recordable[]):void
}
const emits = defineEmits<EmitEvents>()
interface ItextKeyMap {
  [key:string] :string
}
const props = defineProps<{
  textKeyMap: ItextKeyMap,
  maxImportNum: number,
  downLoadUrl: string,
  excelName:string
}>()
async function handleChange({ file }) {
  const sheetList = await getExcelOriginCell(file) // 获取 excel 表所有 sheet 所有单元格数据
  const { headerColumns, dataList, dataSourceList } = getSheetHeaderAndData(sheetList[0], props.textKeyMap)
  console.log('dataList', dataList) // 传递给后端的数据
  console.log('headerColumns', headerColumns) // table 表头结构
  console.log('dataSourceList', dataSourceList) // table 表格数据
  columns.value = headerColumns
  try {
    dataSource.value = dataSourceList
    if (dataSource.value.length === 0) {
      useMessage.error('表格不能为空，请填入信息')
    } else if (dataSource.value.length > props.maxImportNum) {
      useMessage.error('表格上传不能超过500条数据')
    } else {
      emits('update:value', dataList)
    }
  } catch (error) {
    useMessage.error('表格数据不正确，请重新检查')
    console.log(error)
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
