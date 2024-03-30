<template>
  <div>
    <a-textarea
      ref="aTextArea"
      v-bind="bindAttrs"
      :class=" bindAttrs.showCount?'mb-5':''"
    />
    <div v-if="props.tips">
      {{ props.tips }}
    </div>
    <div v-if="props.options && props.options.length > 0">
      <i
        v-for="option in props.options"
        :key="option"
        class=" select-none inline-block mr-2 cursor-pointer rounded-sm bottom-0 bg-gray-100 text-gray-400 px-2 mt-2"
        @click="setValue(option)"
      >{{ option }}</i>
    </div>
  </div>
</template>

<script lang="ts" setup name="input-textProps">
import { InputTextAreaProps, inputTextAreaProps } from './props'
const attrs = useAttrs() as InputTextAreaProps
const props = defineProps(inputTextAreaProps)

type EmitEvents = {
  (e:'update:value', value):void
}
const emits = defineEmits<EmitEvents>()

const bindAttrs = computed(() => ({
  value: unref(props.value),
  'onUpdate:value': newValue => emits('update:value', newValue),
  ...attrs,
}))

function setValue(value: string) {
  let newStr = (attrs.value || '') + value
  if (attrs.maxlength && (attrs.maxlength < newStr.length)) {
    emits('update:value', newStr.substring(0, attrs.maxlength))
  } else {
    emits('update:value', newStr)
  }
}
</script>
