import { ColProps } from 'ant-design-vue/es'
import { PropType, ExtractPropTypes } from 'vue'
import { DraftType } from '@/hooks/draft-box'
import { basicModalProps, BasicModalProps } from '@/components/modal/prop'
import type { ButtonType } from 'ant-design-vue/es/button/buttonTypes'

export const basicFormProps = {

  /** 配置列表 */
  schemas: {
    type: Array as PropType<IForm.Schema[]>,
  },

  /** 配置项基础占用列 */
  baseItemCol: {
    type: Object as PropType<ColProps>,
  },

  /** 提交文字 */
  submitText: {
    type: String,
    default: '提交',
  },

  /** 重置文字 */
  resetText: {
    type: String,
    default: '重置',
  },

  /** 点击重置时，是否执行一次 submit 操作，为了在 table 页面中，点击重置，调用接口，刷新 table 数据 */
  resetDoSubmit: {
    type: Boolean,
    default: false,
  },
  loading: { //
    type: Boolean,
    default: false,
  },

  /** 是否显示表单操作按钮 */
  actionable: {
    type: Boolean,
    default: true,
  },

  /** 是否可折叠 */
  collapsible: {
    type: Boolean,
    default: false,
  },

  /** 操作按钮对齐方式 */
  actionAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },

  /** 是否 table 的搜索栏表单 */
  isSearchForm: {
    type: Boolean,
    default: false,
  },

  /** 是否只读 */
  isReadOnly: {
    type: Boolean,
    default: false,
  },

  /** 表格头部标题，只有设置了表格头部，才能开启折叠与编辑保存功能 */
  formHeadTitle: {
    type: String,
    default: '',
  },

  /** 是否启用表格头部的折叠功能 */
  isFoldable: {
    type: Boolean,
    default: false,
  },

  /** 配置该属性才会显示编辑保存按钮 数据更新表格，点击保存时的回调函数，使用该函数，会将 actionable 自动设置为 false */
  dataEditFromUpdateFun: {
    type: Function as PropType<Fn<any, Promise<string | void>>>,
  },
  // 提交按钮文字
  okText: {
    type: String,
    default: '提交'
  },
  okType: {
    type: [] as ButtonType[]
    //  type: String as PropType<ButtonType>,
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  cancelType: {
    type: [] as ButtonType[]
    // type: String as PropType<ButtonType>,
  },
}

export const modalFormProps = Object.assign({

  /** 是否启用草稿功能 */
  draftable: {
    type: String as PropType<DraftType>,
  },

  /** 调用接口 */
  /** api: Function as PropType<(formModel: Recordable) => string>, */
  api: Function as PropType<(formModel: Recordable) => Promise<string | void> | void>,

  /** 配置列表 */
  schemas: Array as PropType<IForm.Schema[]>,

  /** 表单模型 */
  model: Object,

  /** 弹窗属性 */
  modalProp: Object as PropType<BasicModalProps>,

  /** 表单属性 */
  formProp: Object as PropType<IForm.Props>,

  /** 接口调用成功回调 */
  successCallback: Function,

  /** 模态框关闭销毁元素 */
  destroyOnClose: {
    type: Boolean,
    default: false,
  },

  /** 数据是否只读 */
  isReadOnly: {
    type: Boolean,
    default: false,
  }
}, basicModalProps)
export type ModelFormProp = Partial<ExtractPropTypes<typeof modalFormProps>> & BasicModalProps