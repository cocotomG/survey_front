<style lang="less" scoped>
:deep(.ant-input-affix-wrapper) {
  border-radius: 5px;
  padding-left: 26px;
  // border: 0;
  // border-bottom: 1px solid #BCBCBC;
  // padding-left: ;
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
</style>

<template>
  <div>
    <a-form ref="formRef" :model="loginDate" :rules="rules">
      <!-- 账号输入框 -->
      <a-form-item name="userName" default-value="admin" class="mb-5" required>
        <div class="mb-2 font-bold">
          账号：
        </div>
        <a-input v-model:value="loginDate.userName" class="h-9 rounded-md" placeholder="请输入账户" :bordered="false"
          allow-clear />
      </a-form-item>

      <!-- 密码输入框 -->
      <a-form-item name="password" default-value="123456" type="password" required class="mb-5">
        <div class="mb-2 font-bold">
          登陆密码：
        </div>
        <a-input-password v-model:value="loginDate.password" class="h-9 rounded-md" :bordered="false"
          placeholder="请输入密码" allow-clear />
      </a-form-item>
      <!-- 验证码 -->
      <a-form-item name="code" default-value="123456" type="password" required class="mb-5">
        <div class="mb-2 font-bold">
          验证码：
        </div>
        <a-input v-model:value="loginDate.code" class="h-9 w-60 rounded-md" :bordered="false" placeholder="请输入验证码"
          allow-clear />
        <img :src="captchaImg" @click="getCaptcha()" class="ml-5" />
      </a-form-item>
    </a-form>


    <div class="flex items-center justify-between">
      <check-agree />

      <div class="mb-4 text-sm text-right cursor-pointer text-primaryColor-default" @click="$emit('resetPassword')">
        忘记密码
      </div>
    </div>


    <a-button :loading="loading" class="w-full h-10 rounded-md" type="primary" @click="handleLogin">
      登录
    </a-button>

    <!-- <div
      class="pb-5 mt-16 font-bold text-center cursor-pointer text-primaryColor-default"
      @click="$emit('loginByMobile')"
    >
      手机号登录
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { FormExpose } from 'ant-design-vue/es/form/Form'
import type { Rule } from 'ant-design-vue/es/form'
import { onKeyStroke } from '@vueuse/core'
import { useSiteConfig } from '@/hooks/site-config'
import { useUserStore } from '@/store'
import { omit, cloneDeep } from 'lodash-es'
import { authApi } from '@/api/auth'
import md5 from 'crypto-js/md5'
import { checkIsAgree, CheckAgree } from '../hooks/use-agree'

type EmitEvents = {
  (e: 'loginSuccess'): void
  (e: 'loginByMobile'): void
  (e: 'resetPassword'): void
}
const emits = defineEmits<EmitEvents>()
const userStore = useUserStore()
const loading = ref(false)
const formRef = ref<FormExpose>()
const captchaImg = ref("")


onMounted(() => {
  getCaptcha()
  console.log(captchaImg.value)
})


async function getCaptcha() {
  const { uuid, img } = await authApi.getCaptcha()
  captchaImg.value = "data:image/gif;base64," + img
  loginDate.uuid = uuid

}
// 登录信息
const loginDate = reactive({

  /** 账户 */
  userName: 'admin',

  /** 密码 */
  password: '2511277pp4',

  /** 图片验证码 */
  code: '',

  uuid: '',

  // /** 账户 */
  // account: '',

  // /** 密码 */
  // password: '',

  // /** 图片验证码 */
  // captcha: '',
})

// form 表单校验规则
const rules: Record<string, Rule[]> = {
  userName: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: Rule, value: string) => {
        if (!value.trim()) {
          return Promise.reject(new Error('账户不能为空'))
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
        return Promise.resolve()
      },
    },
  ],
  code: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: Rule, value: string) => {
        if (!value.trim()) {
          return Promise.reject(new Error('验证码不能为空'))
        }
        return Promise.resolve()
      },
    },
  ],
}

// 添加键盘操作，回车登录
onKeyStroke('Enter', handleLogin)

// 登录回调
async function handleLogin() {
  if (!checkIsAgree()) {
    return
  }

  loading.value = true
  try {
    console.log(1, "=============")
    await formRef.value?.validate()
    const loginDataValue = cloneDeep(omit(toRaw(loginDate), ['agree']))

    // loginDataValue.password = md5(loginDataValue.password).toString()
    console.log(loginDataValue)
    const { token } = await authApi.loginByAccount(loginDataValue)
    await getCaptcha()
    await userStore.loginSuccess(token)
    emits('loginSuccess')
  } finally {
    loading.value = false
  }
}
</script>
