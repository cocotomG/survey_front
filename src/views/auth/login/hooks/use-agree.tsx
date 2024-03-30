/** 是否同意协议 */
import { useMessage } from '@/hooks/message'
import { Checkbox } from 'ant-design-vue'
export const isAgree = ref(true)

export function checkIsAgree() {
  if (!isAgree.value) {
    useMessage.error('请先勾选用户协议')
    return false
  }
  return true
}

export const CheckAgree = defineComponent(() => {
  return () => <Checkbox
      v-model:checked={isAgree.value}
      class=" mb-4  text-gray-400"
    >
      我已阅读并同意
    <span class="text-right text-primaryColor-default  text-sm -mt-4 mb-16 cursor-pointer">
        &nbsp;yukces服务协议
        {/* <a
          href="https://lanxin-1301695016.cos.ap-guangzhou.myqcloud.com/web/service-agreement.pdf"
          target="_blank"
        >
          《人事saas协议》</a>， */}
        {/* <a
          href="https://lanxin-1301695016.cos.ap-guangzhou.myqcloud.com/web/privacy-agreement.pdf"
          target="_blank"
        >隐私政策</a> */}
      </span>
    </Checkbox>
})
