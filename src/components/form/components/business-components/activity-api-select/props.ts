import { PropType, ExtractPropTypes } from 'vue'
import { Required } from 'utility-types'
import type { SelectProps } from 'ant-design-vue/es/select'
export const activityApiSelectProps = {
  apiParams: {
    type: Object,
    default: () => ({}),
  }
}

export type ActivityApiSelectProps = Partial<ExtractPropTypes<typeof activityApiSelectProps>> & SelectProps