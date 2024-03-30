<template>
  <a-input-number
    :value="props.value"
    :precision="2"
    addon-before="￥"
    addon-after="元"
    @update:value="handleChange"
  />
</template>

<script lang="ts" setup name="input-money">
import { inputMoneyProps } from './props'
const props = defineProps(inputMoneyProps)
type EmitEvents = {
  (e:'update:value', value):void
}
const emits = defineEmits<EmitEvents>()

function handleChange(value) {
  emits('update:value', value)
}
</script>
