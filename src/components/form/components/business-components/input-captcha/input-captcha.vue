<style lang="less">
.box {
  display: flex;
  justify-content: space-between;

  .ant-input-group {
    width: 100%;
    text-align: left;

    input {
      width: calc(100% - 96px) !important;
    }
  }
}
</style>

<template>
  <div class="box w-full">
    <a-input-group
      compact
      class="w-full"
    >
      <a-input
        style="width: calc(100% - 192px);"
        @update:value="handleChange"
      />
      <a-button
        type="primary"
        class="w-24"
        :disabled="!!captchaCountdown"
        @click="sendCaptcha"
      >
        {{ captchaCountdown ? `剩余 ${ captchaCountdown } 秒` : '获取验证码' }}
      </a-button>
    </a-input-group>
  </div>
</template>
<script lang="ts" setup>
import { useFormContext } from '../../../hooks/context'
import { useCaptcha } from '@/hooks/captcha'
import { useUserStore } from '@/store'
import { inputCaptchaProps } from './props'

// useFormContext 内部使用了 inject，而 inject 仅能在 setup 顶部调用，故不可在 函数中再调用
// https://v3.cn.vuejs.org/api/composition-api.html#provide-inject
const formContext = useFormContext()

const { captchaCountdown, getCaptcha } = useCaptcha()

const props = defineProps(inputCaptchaProps)

type EmitEvents = {
  (e:'update:value', value):void
}
const emits = defineEmits<EmitEvents>()

function handleChange(value) {
  emits('update:value', value)
}

async function sendCaptcha() {
  formContext.setFormModel({
    code: await getCaptcha(props.mobile),
    mobile: props.mobile || useUserStore().user?.mobile,
  })
}


</script>
