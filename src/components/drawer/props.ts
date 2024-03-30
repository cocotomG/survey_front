import { PropType, ExtractPropTypes, Component } from 'vue'
import { DrawerProps } from 'ant-design-vue/es'

export const basicDrawerProps = {
  title: String as PropType<string>,
  slug: String as PropType<string>,
  visible: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  width: {
    type: Number as PropType<number | string>,
    default: 600,
  },

  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  reloadable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  showFooter: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  showConfirm: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  onConfirm: {
    type: Function as PropType<Fn>,
    default: () => { }
  },
  // 显示取消按钮
  showCancel: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // 取消自动隐藏窗口
  autoCancelVisible: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  onCancel: {
    type: Function as PropType<Fn>,
    default: () => { }
  },
  showClose: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  confirmText: {
    type: String as PropType<string>,
    default: '确定',
  },
  cancelText: {
    type: String as PropType<string>,
    default: '取消',
  },

}

export const descDrawerProps = {
  ...basicDrawerProps,
  schemas: {
    type: Array as PropType<IGridTable.ColumnProps[]>,
  },
  model: {
    type: Object as PropType<Recordable>,
  },
  flowable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  tabs: Array as PropType<Component[]>,
}

export type BasicDrawerProps = Partial<ExtractPropTypes<typeof basicDrawerProps>> & DrawerProps
