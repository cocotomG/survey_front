import { ExtractPropTypes } from 'vue'

export const inputCaptchaProps = {
  mobile: {
    type: String,
    default: ''
  }
}

export type InputCaptchaProps = Partial<ExtractPropTypes<typeof inputCaptchaProps>>