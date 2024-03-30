<style lang="less" scoped>
.basic-form {
  overflow: hidden;
  transition: all 0.3s;
  transform: rotate();

  :deep(.ant-form-item) {
    margin-bottom: 0 !important;
  }
}
</style>

<template>
  <div
    class="w-full basic-form"
    :style="{ maxHeight : isFold ? '34px' : '900vh'}"
  >
    <form-header
      v-if="props.formHeadTitle"
      :title="props.formHeadTitle"
      :is-editing="!isReadOnly"
      :is-fold="isFold"
      :is-foldable="props.isFoldable"
      :update-fun="props.dataEditFromUpdateFun"
      @setFold="setFold"
      @setReadOnly="setReadOnly"
    />

    <!-- 为 form 添加动态 name，使得 form item 中的 item 的 id 的以唯一区分，解决多个 form 表单，使用了统一 id 的问题 -->
    <a-form
      ref="formElRef"
      :name="`base-form-${new Date().getTime().toString()}`"
      v-bind="bindAttrs"
    >
      <a-row :gutter="[20, 10]">
        <form-item
          v-for="schema in getSchemas"
          :key="schema.field"
          :schema="schema"
          :form-props="propsRef"
          :collapsed="collapsed"
        />
        <form-action
          v-if="propsRef.actionable"
          :form-props="propsRef"
          :span="propsRef.isSearchForm ? actionSpan : 24"
          :align="propsRef.actionAlign"
          :collapsible="collapsible"
          :collapsed="collapsed"
          :toggle-collapse="toggleCollapse"
          :reset-do-submit="props.resetDoSubmit"
          @toggle-collapse="emits('toggleCollapse')"
        />
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { parseDotStrObjToObj } from '@/utils/object'
import { NamePath, ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { omit, isString } from 'lodash-es'
import FormHeader from './components/form-header.vue'
import FormAction from './components/form-action.vue'
import FormItem from './components/form-item.vue'
import { createFormContext } from './hooks/context'
import { useModel } from './hooks/model'
import { useSchema } from './hooks/schema'
import { basicFormProps } from './props'
import { useMessage } from '@/hooks/message'

const attrs = useAttrs()
// const emits = defineEmits<{(event: 'reset'): void
//                           (event:'toggleCollapse'):void}>()
const emits = defineEmits(['submit', 'reset', 'toggleCollapse'])
const formElRef = ref<IForm.Expose>()
const props = defineProps(basicFormProps)
const dynamicProps = ref<Partial<IForm.Props>>()
const isReadOnly = ref(props.isReadOnly) // 因 props 的变更会导致整个 form 数据重置，外部不可通过修改 props 的 isReadOnly 来修改状态，只能通过内部变量来控制是否编辑
const isFold = ref(false)
const propsRef = computed(() => ({
  ...attrs,
  ...props,
  ...unref(dynamicProps),
} as IForm.Props))

const {
  getSchemas,
  insertSchema,
  appendSchema,
  updateSchema,
  deleteSchema,
  collapsed,
  collapsible,
  toggleCollapse,
  actionSpan
} = useSchema(propsRef)
const { formModel, initFormModel, setFormModel } = useModel(propsRef)

const bindAttrs = computed(() => ({
  colon: true,
  ...unref(propsRef),
  model: unref(formModel),
  validateTrigger: '',
} as IForm.Props))

function validate(nameList?: NamePath[]) {
  return unref(formElRef)?.validate(nameList)
}

function clearValidate(nameList?: string | string[]) {
  return unref(formElRef)?.clearValidate(nameList)
}

async function submit() {
  try {

    // 去除输入框中的空格
    Object.keys(formModel).forEach(modelKey => {
      if (isString(formModel[modelKey])) {
        formModel[modelKey] = formModel[modelKey].trim()
      }
    })

    const values = await validate()
    emits('submit', toRaw(unref(parseDotStrObjToObj(formModel))))
    return parseDotStrObjToObj(values)
  } catch (error) {
    console.log('base form validate error', error)
    useMessage.error((error as ValidateErrorEntity).errorFields[0].errors[0])
  }
}

function setProps(newProps: Partial<IForm.Props>) {
  dynamicProps.value = {
    ...unref(dynamicProps),
    ...newProps
  }
}

// 设置表单只读
function setReadOnly(newValue: boolean) {
  isReadOnly.value = newValue
}

// 设置折叠
function setFold(newValue: boolean) {
  console.log('new', newValue)
  isFold.value = newValue
}

// 重置各个表单项内容，在取消弹窗 pop model 时执行
async function resetFields() {
  await clearValidate()
  initFormModel()
  emits('reset')
}

const methods:IForm.Expose = {
  formModel,
  submit,
  validate,
  setFormModel,
  setReadOnly,
  setProps,
  setFold,
  resetFields,
  insertSchema,
  appendSchema,
  updateSchema,
  deleteSchema,
  clearValidate,
}

defineExpose(methods)
createFormContext(Object.assign({}, omit(methods, 'setReadOnly'), {
  isReadOnly,
}))
</script>
