import { PropType, ExtractPropTypes } from 'vue'
import type { UploadProps as AUploadProps } from 'ant-design-vue/es/upload'

export const wangEditorProps = {
  value: String as PropType<string>,
}

export type WangEditorProps = Partial<ExtractPropTypes<typeof wangEditorProps>>