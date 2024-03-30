import { ExtractPropTypes, PropType } from 'vue'
import type { TextAreaProps } from 'ant-design-vue/es/input'

export const inputTextAreaProps = {
  tips: {
    type: String,
  },
  options: {
    type: Array as PropType<string[]>,
  },
}

export type InputTextAreaProps = Partial<ExtractPropTypes<typeof inputTextAreaProps>> & TextAreaProps