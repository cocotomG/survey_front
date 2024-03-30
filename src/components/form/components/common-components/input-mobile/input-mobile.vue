<template>
  <a-input
    :value="props.value"
    :maxlength="11"
    @update:value="handleChange"
  />
</template>

<script lang="ts" setup name="input-mobile">
import { inputMobileProps } from './props'

const props = defineProps(inputMobileProps)
type EmitEvents = {
  (e:'update:value', value:string):void
}
const emits = defineEmits<EmitEvents>()

function handleChange(value) {
  const v = value.replace(/[^0-9]/gi, '')
  emits('update:value', v)
}
</script>
