import { PropType, ExtractPropTypes } from 'vue'
import { Required } from 'utility-types'
import { TreeProps } from 'ant-design-vue/es/tree'

// type SelectorTypes = keyof Reference.SelectorTypes

export const treeApiSelectProps = {
  // 双向数据绑定的该组件的值
  value: {
    type: Array as PropType<(number | string)[]>,
    default: undefined,
  },
  api: {
    type: Function,
    required: true,
  },
  apiParams: {
    type: Object,
    default: () => ({})
  },
  checkStrictly: {
    type: Boolean,
    default: true
  },
  valueToString: {
    type: Boolean,
    default: false
  },
}

export type TreeApiSelectProps = Required<Partial<ExtractPropTypes<typeof treeApiSelectProps>>, 'api'> & TreeProps