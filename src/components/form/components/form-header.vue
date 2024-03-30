<template>
  <div class="g-title">
    {{ props.title }}
    <div
      v-if="props.isFoldable"
      class=" inline-block ml-2"
      @click="emits('setFold', !props.isFold )"
    >
      <down-outlined
        class="transition-transform cursor-pointer"
        :style="{transform: `rotate(${isFold ? 0 : '180deg'})`}"
      />
    </div>
    <template v-if="isDateUpdateForm">
      <a-button
        v-if="props.isEditing"
        :loading="isUpdating"
        type="link"
        class=" absolute right-14 -top-2 p-0"
        @click="cancelEditForm"
      >
        取消
      </a-button>

      <a-button
        :loading="isUpdating"
        type="link"
        class=" absolute !important right-0 -top-2 p-0"
        @click="() => props.isEditing ? updateForm(): editForm()"
      >
        {{ props.isEditing ? '保存' : '编辑' }}
      </a-button>
    </template>
  </div>
</template>

<script lang="ts" setup>

/**
 * 数据暂存与恢复
 */
import { useFormContext } from '../hooks/context'
import { useMessage } from '@/hooks/message'
import { PropType } from 'vue'
import { cloneDeep, isFunction } from 'lodash-es'

const formContext = useFormContext()

type EmitEvents = {
  (e: 'setFold', isFold: boolean): void
  (e: 'setReadOnly', isReadOnly: boolean): void
}

const emits = defineEmits<EmitEvents>()
const props = defineProps({

  /** 表格标题 */
  title: {
    type: String,
    required: true,
  },

  /** 编辑中 */
  isEditing: {
    type: Boolean,
    required: true,
  },

  /** 是否启用表格头部的折叠功能 */
  isFoldable: {
    type: Boolean,
    default: false,
  },

  /** 当前是否折叠状态 */
  isFold: {
    type: Boolean,
    default: false,
  },

  /** 数据更新函数 */
  updateFun: {
    type: Function as PropType<Fn<any, Promise<string | void>>>,
    default: undefined
  },
})

/** 是否数据更新 form，启用编辑、保存功能 */
let isDateUpdateForm = computed(() => {
  formContext.setProps({ actionable: false })
  return isFunction(props.updateFun)
})

/** 临时存储 form 中 model 的数据，当取消编辑时使用 */
let tempModelData = {}

/** 是否数据保存中 */
let isUpdating = ref(false)

/** 开启编辑表单 */
function editForm() {
  tempModelData = cloneDeep(toRaw(formContext.formModel))
  emits('setReadOnly', false)
  emits('setFold', false)
}

/** 取消编辑表单 */
function cancelEditForm() {
  formContext.setFormModel(tempModelData)
  formContext.clearValidate()
  emits('setReadOnly', true)
}

/** 更新表单 */
async function updateForm() {
  isUpdating.value = true
  const formData = await formContext.submit()
  useMessage.success(await props.updateFun!(formData) || '保存成功')
  emits('setReadOnly', true)
  isUpdating.value = false
}

</script>
