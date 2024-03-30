import { PropType, ExtractPropTypes } from 'vue'
import { Required } from 'utility-types'

type SelectorTypes = keyof Reference.SelectorTypes

export const commonApiSelectProps = {
  commonApiSelectType: {
    type: String as PropType<SelectorTypes>,
    required: true
  },
  elseApiParams: {
    type: Object,
    default: () => ({})
  },
  searchKey: {
    type: String,
    default: '',
  },
  // value: {
  //   type: [Array, String],
  //   default: ''
  // },
}

export type CommonApiSelectProps = Required<Partial<ExtractPropTypes<typeof commonApiSelectProps>>, 'commonApiSelectType'>