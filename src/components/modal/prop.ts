import { ExtractPropTypes } from 'vue'
import { ModalProps } from 'ant-design-vue/es'

export const basicModalProps = {

  /** 标题 */
  title: {
    type: String,
  },

  /** 紧接着标题的提示语 */
  warning: {
    type: String,
  },

  /** 是否显示 */
  visible: {
    type: Boolean,
    default: false,
  },

  /** 是否显示 loading 状态 */
  loading: {
    type: Boolean,
    default: false,
  },

  /** 模态框宽度 */
  width: {
    type: [String, Number],
    default: 480,
  },

  /** 模态框高度 */
  height: {
    type: [String, Number],
    // default: 480,
  },

  /** 是否全屏 */
  fullScreen: {
    type: Boolean,
    default: false,
  },

  /** 是否显示全屏 */
  showFullScreen: {
    type: Boolean,
    default: true,
  },

  /** 关闭模态框是否销毁子元素 */
  destroyOnClose: {
    type: Boolean,
    default: false,
  }
}

export type BasicModalProps = Partial<ExtractPropTypes<typeof basicModalProps>> & ModalProps
