<style lang="less" scoped>
:deep(.ant-input-affix-wrapper) {
  border-radius: 5px;
  padding-left: 26px;
  background: #F5F7F9;

  input {
    appearance: none;

    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px #F5F7F9 inset !important; // 默认浏览器填充背景色
      // -webkit-text-fill-color: red !important; // 默认浏览器填充文字颜色
    }
  }
}

:deep(.ant-form-item-explain-error) {
  padding-top: 4px;
  padding-left: 26px;
}

:deep(.ant-input-affix-wrapper-focused) {
  box-shadow: none !important;
}

.disabled-button {
  border-color: #70B0FF;
  background: #70B0FF;
}
</style>

<template>
  <div>
    <a-form ref="formRef" :model="loginDate" :rules="rules">
      <!-- 账号输入框 -->
      <a-form-item name="mobile" default-value="15625056985" class="mb-8" required>
        <div class="mb-2 font-bold">
          手机号：
        </div>
        <a-input v-model:value="loginDate.mobile" placeholder="请输入手机号" class="h-10 rounded-md" type="number"
          :bordered="false" allow-clear />
      </a-form-item>

      <!-- 验证码输入框 -->
      <div class="relative">
        <a-form-item class="w-4/6 mb-10 auth-code " name="captcha" default-value="123456" required>
          <div>
            <div class="mb-2 font-bold">
              验证码：
            </div>
            <a-input v-model:value="loginDate.captcha" type="number" allow-clear :bordered="false"
              class="h-10 rounded-md" placeholder="请输入验证码" />
          </div>
        </a-form-item>
        <div>
          <a-button v-if="captchaCountdown === 0" type="primary" class="absolute z-10 rounded cursor-pointer right-2"
            style="top: 30px;" size="large" @click="sendCaptcha">
            获取验证码
          </a-button>
          <a-button v-else class="absolute z-10 transition-opacity rounded cursor-pointer right-2 disabled-button"
            style="top: 30px;" size="large" type="primary">
            {{ captchaCountdown }} 秒重新获取
          </a-button>
          <!-- <div
            v-if="captchaCountdown === 0"
            class="absolute z-10 font-bold cursor-pointer right-2 bottom-2 text-primaryColor-default"
            @click="sendCaptcha"
          >
            获取验证码
          </div>
          <div
            v-else
            class="absolute right-0 z-10 text-gray-200 bottom-1"
          >
            剩余 {{ captchaCountdown }} 秒可重新获取
          </div> -->
        </div>
      </div>
    </a-form>

    <!-- <div class="mb-16 -mt-4 text-sm font-bold text-right text-blue-400 opacity-0 cursor-pointer">
      纯粹占位，与账号登录保存一致
    </div> -->

    <div class="flex items-center justify-between">
      <check-agree />

      <div class="mb-4 text-sm text-right cursor-pointer text-primaryColor-default" @click="$emit('resetPassword')">
        忘记密码
      </div>
    </div>
    <a-button :loading="loading" class="w-full h-12 rounded-md " type="primary" @click="handleLogin">
      登录
    </a-button>

    <!-- <div
      class="pb-5 mt-16 font-bold text-center cursor-pointer text-primaryColor-default"
      @click="$emit('loginByAccount')"
    >
      密码登录
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { FormExpose } from 'ant-design-vue/es/form/Form'
import type { Rule } from 'ant-design-vue/es/form'
import { onKeyStroke } from '@vueuse/core'
import { useSiteConfig } from '@/hooks/site-config'
import { useUserStore } from '@/store'
import { useMessage } from '@/hooks/message'
import { useCaptcha } from '@/hooks/captcha'
import { omit } from 'lodash-es'
import { authApi } from '@/api/auth'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
import { checkIsAgree, CheckAgree } from '../hooks/use-agree'

const { siteName } = useSiteConfig
const userStore = useUserStore()
const loading = ref(false)
const formRef = ref<FormExpose>()
const { captchaCountdown, getCaptcha } = useCaptcha()


type EmitEvents = {
  (e: 'loginSuccess'): void
  (e: 'loginByAccount'): void
}
const emits = defineEmits<EmitEvents>()

// 登录信息
const loginDate = reactive({

  /** 账户 */
  mobile: '',

  /** 验证码 */
  captcha: '',

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
    }
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
    }
  ],
}

// 添加键盘操作，回车登录
onKeyStroke('Enter', handleLogin)


// 发送验证码
async function sendCaptcha() {
  if (!isMobilePhone(loginDate.mobile.trim(), 'zh-CN')) {
    return useMessage.error('请输入正确的手机号')
  }
  await getCaptcha(loginDate.mobile)
}

// 登录回调
async function handleLogin() {
  if (!checkIsAgree()) {
    return
  }

  loading.value = true
  try {
    await formRef.value?.validate()
    // const { token } = await authApi.loginByMobile(omit(toRaw(loginDate), ['agree']))
    // await userStore.loginSuccess(token)
    // emits('loginSuccess')
  } finally {
    loading.value = false
  }
}


</script>
