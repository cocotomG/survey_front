import { ExtractPropTypes } from 'vue'
import type { InputNumberProps } from 'ant-design-vue/es/input-number'

export const inputMoneyProps = {
  // 双向数据绑定的该组件的值
  value: {
    type: [Number, String],
    // ?? 为什么不可用有 default
  },
}

export type InputMoneyProps = Partial<ExtractPropTypes<typeof inputMoneyProps>> & InputNumberProps