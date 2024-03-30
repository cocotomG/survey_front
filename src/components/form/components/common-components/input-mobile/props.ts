import { ExtractPropTypes } from 'vue'
import type { InputProps } from 'ant-design-vue/es/input'

export const inputMobileProps = {
  // 双向数据绑定的该组件的值
  value: {
    type: [Number, String],
    // ?? 为什么不可用有 default
  },
}

export type InputMobileProps = Partial<ExtractPropTypes<typeof inputMobileProps>> & InputProps