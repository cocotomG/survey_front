import { ExtractPropTypes, PropType } from 'vue'
import type { SelectProps } from 'ant-design-vue/es/select'
import { Required } from 'utility-types'

export const customApiSelectProps = {
  // 双向数据绑定的该组件的值
  value: {
    type: [Number, String, Array] as PropType<number | string | (number | string)[]>,
    default: undefined,
  },
  // 该 picker 获取数据调用的 api
  api: {
    type: Function,
    required: true,
  },
  immediate: Boolean,
  apiParams: {
    type: Object,
    default: () => ({}),
  },
  valueField: {
    type: String,
    default: 'value',
  },
  labelField: {
    type: [String, Function],
    default: 'label',
  },
  resultField: {
    type: String,
    default: 'records',
  },
  zeroToUndefined: {
    type: Boolean,
    default: false,
  },
  numberToString: {
    type: Boolean,
    default: false,
  },
}

export type CustomApiSelectProps = Required<Partial<ExtractPropTypes<typeof customApiSelectProps>>, 'api'> & SelectProps