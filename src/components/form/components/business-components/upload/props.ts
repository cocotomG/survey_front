import { PropType, ExtractPropTypes } from 'vue'
import type { UploadProps as AUploadProps } from 'ant-design-vue/es/upload'

export const uploadProps = {
  // 文件最大大小
  maxSize: {
    type: Number,
    default: 2,
  },
  // 最大文件数
  maxNum: {
    type: Number,
    default: 1,
  },

  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  accept: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  acceptType: {
    type: String as PropType<'img' | 'file' | 'zip' | 'doc'>,
    default: 'file',
  },

  buttonType: {
    type: String,
  },

  ghost: {
    type: Boolean,
    default: false
  },

  // 上传组件提示信息
  remindInfo: {
    type: String
  }
}

export type UploadProps = Partial<ExtractPropTypes<typeof uploadProps>> & AUploadProps