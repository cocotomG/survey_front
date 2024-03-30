import { ExtractPropTypes, PropType } from 'vue'
import { DescriptionsProps } from 'ant-design-vue/es'

export const basicDescriptionProps = {
  // 数据模型
  schemas: {
    type: Array as PropType<IGridTable.ColumnProps[]>
  },

  // 数据
  model: {
    type: Object as PropType<Recordable>
  },

  // 下内边距
  paddingBottom: {
    type: Number
  },

  // 是否要 0 值转变 --
  zeroToLine: {
    type: Boolean,
    default: true
  }
}

export interface DescItem {
  label: string;
  value: string | number;
}

export type BasicDescriptionProps = Partial<ExtractPropTypes<typeof basicDescriptionProps>> & DescriptionsProps