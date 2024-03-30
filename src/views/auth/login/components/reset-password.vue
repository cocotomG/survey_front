<style lang="less" scoped>
// :deep(.ant-input-affix-wrapper) {
//   border: 0;
//   border-bottom: 1px solid #BCBCBC;
//   padding-left: 0;
// }

:deep(.ant-input-affix-wrapper-focused) {
  box-shadow: none !important;
}

:deep(.auth-code .ant-input-suffix) {
  display: none;
}
</style>

<template>
  <div>
    <a-form
      ref="formRef"
      :model="loginDate"
      :rules="rules"
    >
      <!-- 账号输入框 -->
      <a-form-item
        name="mobile"
        default-value="15625056985"
        required
      >
        <div class="mb-2 text-primaryColor-default">
          手机号：
        </div>
        <a-input
          v-model:value="loginDate.mobile"
          placeholder="请输入手机号"
          class="rounded-md h-10"
          type="number"
          allow-clear
        />
      </a-form-item>

      <!-- 验证码输入框 -->
      <a-form-item
        class="auth-code"
        name="captcha"
        required
      >
        <div class="mb-2 text-primaryColor-default">
          验证码：
        </div>
        <a-input
          v-model:value="loginDate.captcha"
          :maxlength="6"
          type="number"
          allow-clear
          placeholder="请输入验证码"
          class="rounded-md h-10"
        />
        <div
          v-if="captchaCountdown === 0"
          class=" absolute right-2 bottom-2 z-10 text-primaryColor-default font-bold cursor-pointer"
          @click="sendCaptcha"
        >
          获取验证码
        </div>
        <div
          v-else
          class="absolute right-0 bottom-1 z-10 text-gray-200"
        >
          剩余 {{ captchaCountdown }} 秒可重新获取
        </div>
      </a-form-item>

      <a-form-item
        name="password"
        default-value="15625056985"
        required
      >
        <div class="mb-2 text-primaryColor-default">
          密码：
        </div>
        <a-input-password
          v-model:value="loginDate.password"
          placeholder="请输入 6-20 位密码"
          class="rounded-md h-10"
          type="number"
          allow-clear
        />
      </a-form-item>

      <a-form-item
        name="passwordConfirmation"
        default-value="15625056985"
        required
      >
        <div class="mb-2 text-primaryColor-default">
          二次确认密码：
        </div>
        <a-input-password
          v-model:value="loginDate.passwordConfirmation"
          placeholder="请再次输入 6-20 位密码"
          class="rounded-md h-10"
          type="number"
          allow-clear
        />
      </a-form-item>
    </a-form>

    <a-button
      :loading="loading"
      class="w-full h-12 rounded-md"
      type="primary"
      @click="resetPassword"
    >
      确定
    </a-button>

    <div
      class="text-center mt-16 text-primaryColor-default font-bold cursor-pointer pb-5"
      @click="$emit('loginByAccount')"
    >
      返回登录
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormExpose } from 'ant-design-vue/es/form/Form'
import type { Rule } from 'ant-design-vue/es/form'
import { useSiteConfig } from '@/hooks/site-config'
import { useMessage } from '@/hooks/message'
import { useCaptcha } from '@/hooks/captcha'
import { authApi } from '@/api/auth'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
const { siteName } = useSiteConfig
const loading = ref(false)
const formRef = ref<FormExpose>()
const { captchaCountdown, getCaptcha } = useCaptcha()

type EmitEvents = {
  (e:'loginByAccount'):void
}
const emits = defineEmits<EmitEvents>()

// 登录信息
const loginDate = reactive({

  /** 手机号 */
  mobile: '',

  /** 验证码 */
  captcha: '',

  /** 密码 */
  password: '',

  /** 二次确认密码 */
  passwordConfirmation: '',
})

// form 表单校验规则
const rules: Record<string, Rule[]> = {
  mobile: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: Rule, value: string) => {
        if (!value.trim()) {
          return Promise.reject(new Error('手机号不能为空'))
        }
        if (!isMobilePhone(value.trim(), 'zh-CN')) {
          return Promise.reject(new Error('手机号不正确'))
        }
        return Promise.resolve()
      },
    },
  ],
  captcha: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: Rule, value: string) => {
        if (!value.trim()) {
          return Promise.reject(new Error('验证码不能为空'))
        }
        if (value.trim().length !== 6) {
          return Promise.reject(new Error('请输入 6 位验证码'))
        }
        return Promise.resolve()
      },
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: Rule, value: string) => {
        if (!value.trim()) {
          return Promise.reject(new Error('密码不能为空'))
        }

        if (value.trim().length < 8 || value.trim().length > 15) {
          return Promise.reject(new Error('密码长度不正确，请输入 8-15 位密码'))
        }

        return Promise.resolve()
      },
    },
  ],
  passwordConfirmation: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: Rule, value: string) => {
        if (!value.trim()) {
          return Promise.reject(new Error('两次输入密码不能为空'))
        }

        if (value.trim() !== loginDate.password) {
          return Promise.reject(new Error('两次输入密码不一致'))
        }
        return Promise.resolve()
      },
    },
  ],
}

// 发送验证码
async function sendCaptcha() {
  if (!isMobilePhone(loginDate.mobile.trim(), 'zh-CN')) {
    return useMessage.error('请输入正确的手机号')
  }
  await getCaptcha(loginDate.mobile)
}

// 登录回调
async function resetPassword() {
  loading.value = true
  try {
    await formRef.value?.validate()
    await authApi.resetPassword(toRaw(loginDate))
    useMessage.success('密码重置成功，请使用最新密码登录')
    emits('loginByAccount')
  } finally {
    loading.value = false
  }
}
</script>
