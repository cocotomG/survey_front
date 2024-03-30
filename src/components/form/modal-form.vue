<template>
  <basic-modal v-bind="bindModalAttrs" @ok="handleConfirm" @cancel="handleCancel" @save-draft="handleSaveDraft"
    @load-draft="handleLoadDraft">
    <basic-form ref="formRef" v-bind="bindFormProps" />
  </basic-modal>
</template>

<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { pick } from 'lodash-es'
import { modalFormProps } from './props'
import { useMessage } from '@/hooks/message'
import { DraftItem, useDraftBox } from '@/hooks/draft-box'
import { Modal } from 'ant-design-vue/es'

const props = defineProps(modalFormProps)
const { saveDraft, getDraftList, setKey } = useDraftBox()
type EmitEvents = {
  (e: 'cancel'): void
  (e: 'ok'): void
}
const emits = defineEmits<EmitEvents>()
const loading = ref(false)
const formRef = ref<IForm.Expose>()

const bindModalAttrs = computed(() => ({
  maskClosable: false,
  ...props.modalProp,
  ...pick(props, ['title', 'width', 'visible', 'draftable', 'height']),
  confirmLoading: unref(loading),
  draftList: unref(getDraftList),
}))

const bindFormProps = computed(() => ({
  actionable: false,
  ...props.formProp,
  ...pick(props, ['schemas', 'model']),
} as IForm.Props))

watch(
  () => props.draftable,
  key => {
    if (key) {
      setKey(key)
    }
  },
)
function handleSaveDraft() {
  const model = toRaw(unref(formRef.value?.formModel))
  saveDraft(model!)
}

function handleLoadDraft(item: DraftItem) {
  const { record, title, saveAt } = item
  Modal.confirm({
    title: `使用 ${saveAt} 保存的草稿【${title}】`,
    content: '草稿将会覆盖现在的表单项，请谨慎使用!',
    okText: '确定使用',
    onOk: async () => {
      await formRef.value?.setFormModel(record)
      useMessage.success('使用草稿成功')
    },
    zIndex: 1002,
  })
}

async function handleConfirm() {
  try {
    loading.value = true
    const values = await formRef.value?.submit()
    if (values) {
      // 兼容 field 中传入点字符串分隔的对象，自动结构为对应的对象
      const resultTips = await props?.api?.(values)
      if (props.successCallback) {
        await props.successCallback(values)
      }
      formRef.value?.resetFields()
      useMessage.success(resultTips || '操作成功')
      emits('ok')
    }
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  loading.value = false
  formRef.value?.resetFields()
  emits('cancel')
}

defineExpose({
  formRef,
})
</script>
