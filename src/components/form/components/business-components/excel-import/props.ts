/* ************************************************
【】 校验是否选择了错误表格是在单sheet导入的时候是通过表头的名字来进行判断的只需要对应好表头就可以了
【】 在多sheet表格导入时，时通过表格底部的sheet来进行判断的，需要配置  sheetNames
  ************************************************
*/
import { TextKeyMap } from '@/utils/xlsx'
import { ExtractPropTypes, PropType } from 'vue'
export type DateFormat = 'YYYY-MM-DD HH:mm' |
  'YYYY-MM-DD' | 'YYYY-MM' | 'NOW'
type ValidateType = 'mobilePhone' | 'idCard' | 'bankAccount' | 'realName' | 'not'
export type ValidateKeyAndType = {
  [key: string]: {
    required: boolean, // 校验是否必填
    type: ValidateType, // 校验类型 not 是不校验
    requiredAssociationKey?: string, // 校验关联的另一个字段key
    associationValidateString?: string // 校验的字段填什么会影响到另一个字段

  }
}
type TextKeyMapArray = {
  // 需要去 % 的key
  needRemovePercentKey?: string[],
  // 菜单映射
  textKeyMap: TextKeyMap,
  // 是否过滤数据
  isFilter?: boolean,
  // 过滤数据依赖的key和指定的字符 key===String 过滤掉整条数据
  filterDependedKeyAndString?: FilterDependedKeyAndString
}
export type FilterDependedKeyAndString = {
  key: string,
  dependedString: string
}
export const excelImportProps = {
  // 是否过滤数据
  isFilter: {
    type: Boolean,
    default: false
  },
  // 过滤数据依赖的key和指定的字符,  key===String 过滤掉整条数据
  filterDependedKeyAndString: {
    type: Object as PropType<FilterDependedKeyAndString>,
    default: {}
  },
  // 多sheet导入时，不需要解析的sheet
  notResolvedSheetIndex: {
    type: Array<number>,
    default: []
  },
  // 多sheet导入时，用来判断是否导错模板
  sheetNames: {
    type: Array<string>,
    default: [],
  },
  // 多sheet导入菜单映射
  textKeyMapArray: {
    type: Array<TextKeyMapArray>,
    default: []
  },
  // 菜单映射
  textKeyMap: {
    type: Object as PropType<any>,
    default: {}
  },
  // // 最大excel导入数据条数
  maxImportNum: {
    type: Number,
    default: 500
  },
  // 模板下载链接
  downLoadUrl: {
    type: String,
  },
  // 是否隐藏下载模版按钮
  showDownloadTmpButton: {
    type: Boolean,
    default: true
  },
  // 下载模板表名
  excelName: {
    type: String,
    default: '默认表格'
  },
  // 想要转换的格式
  format: {
    type: String as PropType<DateFormat>,
    default: 'YYYY-MM-DD'
  },
  // 需要转换日期格式的key
  needFormatDataKey: {
    type: Array<string>,
    default: []
  },
  // 提示文字
  warningTexts: {
    type: Array<string>,
    default: [
      '1、仅支持excel文件（格式为.xlsx和.xls），数据必须放在第一个sheet；',
      '2、上传表格支持范围: 不超过500行，且大小不超过5M的文件；'
    ]
  },
  // 需要去 % 的key（会转成小数）
  needRemovePercentKey: {
    type: Array<string>,
    default: []
  },
  // 需要校验的key和校验规则
  validateKeyAndType: {
    type: Object as PropType<ValidateKeyAndType>,
    default: {}
  },
}
export type ExcelImportProps = Partial<ExtractPropTypes<typeof excelImportProps>>