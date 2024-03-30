import { ExtractPropTypes, PropType } from 'vue'

export const regionSelectProps = {
  // 双向数据绑定的该组件的值
  value: {
    type: Array as PropType<string[]>,
    default: undefined,
  },
  // 是否直接要名字
  needChineseValue: {
    type: Boolean,
    default: false
  },
}

export type RegionSelectProps = ExtractPropTypes<typeof regionSelectProps>


