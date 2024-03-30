import { PropType, ExtractPropTypes } from 'vue'
import { Required } from 'utility-types'
import { SelectProps } from 'ant-design-vue/es/select'

// type SelectorTypes = keyof Reference.SelectorTypes

export const adminUserApiSelectProps = {
  apiParams: {
    type: Object,
    default: () => ({})
  }
}

export type AdminUserApiSelectProps = Partial<ExtractPropTypes<typeof adminUserApiSelectProps>> & SelectProps