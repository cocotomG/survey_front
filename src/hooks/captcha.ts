import { useUserStore } from '@/store'
import { useMessage } from '@/hooks/message'
import { authApi } from '@/api/auth'
// 倒计时操作
function useCaptcha() {
  const { user } = useUserStore()

  /** 倒计时秒数 */
  const countdown = ref(0)

  /** 计时器 */
  let timer = -1

  onBeforeUnmount(() => {
    clearTimeout(timer)
  })

  // 倒计时函数
  function countdownFun() {
    countdown.value = countdown.value - 1
    if (countdown.value > 0) {
      clearTimeout(timer)
      // 因 setTimeout 默认会进入到 node 的函数，返回的是 node 的Timeout 类型，无法正确推导返回 number 类型
      timer = window.setTimeout(countdownFun, 1000)
    }
  }

  /** 获取验证码 */
  async function getCaptcha(mobile?: string | number) {
    countdown.value = 61 // 因调用倒计时函数会自动第一时间减去 1s，故设置倒计时时间为 61 秒
    countdownFun()
    await authApi.getCaptcha({ mobile: mobile || user?.mobile })
    useMessage.success('验证码发送成功')
  }

  return {

    /** 验证码倒计时，剩余时间数 */
    captchaCountdown: countdown,

    /** 获取验证码函数 */
    getCaptcha,
  }
}

export { useCaptcha }
