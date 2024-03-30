import { PropType, ExtractPropTypes } from 'vue'
import type { SelectProps } from 'ant-design-vue/es/select'
import type { Required } from 'utility-types'

export const referenceSelectProps = {
  value: {
    type: [Number, String, Array],
    default: () => [],
    required: true,
  },
  referenceKey: {
    type: String as PropType<Reference.ReferenceKey>,
    default: () => ''
  },
  filter: {
    type: [Object, undefined],
    default: undefined
  },
  valueField: {
    type: String,
    default: 'value',
  },
  labelField: {
    type: String,
    default: 'label',
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

export type ReferenceSelectProps = Required< Partial<ExtractPropTypes<typeof referenceSelectProps>>, 'referenceKey'> & SelectProps