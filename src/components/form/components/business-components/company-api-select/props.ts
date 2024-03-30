import { PropType, ExtractPropTypes } from 'vue'
import { Required } from 'utility-types'
import type { SelectProps } from 'ant-design-vue/es/select'
// type SelectorTypes = keyof Reference.SelectorTypes

export const companyApiSelectProps = {
  apiParams: {
    type: Object,
    default: () => ({}),
  }
}

export type CompanyApiSelectProps = Partial<ExtractPropTypes<typeof companyApiSelectProps>> & SelectProps