<template>
  <a-col
    v-bind="actionCol"
    class="text-right"
  >
    <a-form-item :style="{ 'text-align': align }">
      <a-space>
        <a-button
          v-if="collapsible"
          class=" pl-0"
          type="link"
          size="small"
          @click="handleToggle"
        >
          <template v-if="collapsed">
            展开<down-outlined />
          </template>
          <template v-else>
            收起<up-outlined />
          </template>
        </a-button>
        <a-button
          type="default"
          @click="handleReset"
        >
          {{ formProps?.resetText }}
        </a-button>
        <a-button
          type="primary"
          :loading="formProps?.loading"
          @click="handleSubmit"
        >
          {{ formProps?.submitText }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-col>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

import { UpOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useFormContext } from '../hooks/context'
const formContext = useFormContext()
type EmitEvents = {
  (e:'toggleCollapse'):void
}
const emits = defineEmits<EmitEvents>()
const props = defineProps({
  formProps: {
    type: Object as PropType<IForm.Props>,
    required: true,
  },
  collapsible: {
    type: Boolean,
    default: true,
  },
  collapsed: {
    type: Boolean,
    default: true,
  },
  resetDoSubmit: { // 点击重置时，是否执行一次 submit 操作，为了在 table 页面中，点击重置，调用接口，刷新 table 数据
    type: Boolean,
    default: false,
  },
  span: {
    type: Number,
    default: 6,
  },
  toggleCollapse: {
    type: [Function, undefined] as PropType<Fn | undefined>,
    default: undefined
  },
  align: {
    type: String as PropType<'left' | 'right' | 'center' | 'justify'>,
    default: 'left',
  },
})

const actionCol = computed(() => ({
  span: props.span,
}))

function handleSubmit() {
  formContext.submit()
}

function handleReset() {
  formContext.resetFields()
  props.resetDoSubmit && formContext.submit()
}

function handleToggle() {
    props?.toggleCollapse!()
    emits('toggleCollapse')
}
</script>
