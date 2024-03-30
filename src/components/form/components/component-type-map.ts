// ant-design 库组件
import Input, { InputProps } from 'ant-design-vue/es/input'
import InputNumber, { InputNumberProps } from 'ant-design-vue/es/input-number'
import TimePicker, { TimePickerProps } from 'ant-design-vue/es/time-picker'
import Switch, { SwitchProps } from 'ant-design-vue/es/switch'
import Radio, { RadioProps } from 'ant-design-vue/es/radio'
import Select, { SelectProps } from 'ant-design-vue/es/select'
import Cascader, { CascaderProps } from 'ant-design-vue/es/cascader'
import Checkbox, { CheckboxProps } from 'ant-design-vue/es/checkbox'
import { DatePickerProps, MonthPickerProps, WeekPickerProps, RangePickerProps } from 'ant-design-vue/es/date-picker'
import { TreeSelectProps } from 'ant-design-vue/es/tree-select'
import Tree, { TreeProps } from 'ant-design-vue/es/tree'
// 若从 es 模块中引用 datePicker，将导致 datePicker 样式丢失，无法正常显示，故在此通过 ant-design-vue 中导入
import { DatePicker, TreeSelect } from 'ant-design-vue'


// 业务无关自定义通用组件
import InputMobile, { InputMobileProps } from './common-components/input-mobile'
import InputMoney, { InputMoneyProps } from './common-components/input-money'
import RegionSelect, { RegionSelectProps } from './common-components/region-select'
import PureDisplay, { PureDisplayProps } from './common-components/pure-display'
import CustomApiSelect, { CustomApiSelectProps } from './common-components/custom-api-select'
import InputTextArea, { InputTextAreaProps } from './common-components/input-textarea'

// 业务组件
import Upload, { UploadProps } from './business-components/upload'
import InputCaptcha, { InputCaptchaProps } from './business-components/input-captcha'
import ReferenceSelect, { ReferenceSelectProps } from './business-components/reference-select'
import CommonApiSelect, { CommonApiSelectProps } from './business-components/common-api-select'
import AdminUserApiSelect, { AdminUserApiSelectProps } from './business-components/admin-user-api-select'
import CompanyApiSelect, { CompanyApiSelectProps } from './business-components/company-api-select'
import ActivityApiSelect, { ActivityApiSelectProps } from './business-components/activity-api-select'
import TreeApiSelect, { TreeApiSelectProps } from './business-components/tree-api-select'
import ExcelImport, { ExcelImportProps } from './business-components/excel-import'
import WangEditor, { WangEditorProps } from './business-components/wang-editor'
export const componentTypeMap = {
  Input,
  InputPassword: Input.Password,
  InputSearch: Input.Search,
  InputNumber,
  Cascader,
  Select,
  DatePicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  DateRangePicker: DatePicker.RangePicker,
  TimePicker,
  Switch,
  Radio,
  RadioGroup: Radio.Group,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
  TreeSelect,
  Tree,

  // 自定义通用组件
  InputMobile,
  InputMoney,
  RegionSelect,
  PureDisplay,
  CustomApiSelect,
  InputTextArea,

  // 业务组件，调用特定业务接口
  Upload,
  InputCaptcha,
  ReferenceSelect,
  CommonApiSelect,
  AdminUserApiSelect,
  CompanyApiSelect,
  ActivityApiSelect,
  TreeApiSelect,
  // SocialTableForm,
  ExcelImport,
  WangEditor
}

export type ComponentType = keyof typeof componentTypeMap |

  /** 页面传入的自定义组件 */
  'Custom'


export type ComponentProp<T extends ComponentType> = {
  'Input': InputProps,
  'InputPassword': InputProps,
  'InputSearch': InputProps,
  'InputNumber': InputNumberProps,
  'DatePicker': DatePickerProps,
  'MonthPicker': MonthPickerProps,
  'WeekPicker': WeekPickerProps,
  'DateRangePicker': RangePickerProps,
  'TimePicker': TimePickerProps,
  'Switch': SwitchProps,
  'Radio': RadioProps,
  'Select': SelectProps,
  'Cascader': CascaderProps,
  'Checkbox': CheckboxProps,
  'TreeSelect': TreeSelectProps,
  'Tree':TreeProps,

  // 自定义通用组件
  'CustomApiSelect': CustomApiSelectProps,
  'InputMobile': InputMobileProps,
  'InputMoney': InputMoneyProps,
  'RegionSelect': RegionSelectProps,
  'InputTextArea': InputTextAreaProps,
  'PureDisplay': PureDisplayProps,


  // 业务组件，调用特定业务接口
  'Upload': UploadProps,
  'InputCaptcha': InputCaptchaProps,
  'ReferenceSelect': ReferenceSelectProps,
  'CommonApiSelect': CommonApiSelectProps,
  'AdminUserApiSelect': AdminUserApiSelectProps,
  'CompanyUserApiSelect': CompanyApiSelectProps,
  'ActivityApiSelect': ActivityApiSelectProps,
  'TreeApiSelect': TreeApiSelectProps,
  'ExcelImport': ExcelImportProps,
  'WangEditor':WangEditorProps
  [K: string]: any,
}[T]