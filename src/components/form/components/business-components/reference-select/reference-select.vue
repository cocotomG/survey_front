<template>
  <a-select v-bind="bindAttrs" />
</template>
<script lang="ts" setup>
import { computed, unref, useAttrs } from 'vue'
import { useAppStore } from '@/store'
import { referenceSelectProps } from './props'

const { getReferenceItems } = useAppStore()
const props = defineProps(referenceSelectProps)
type EmitEvents = {
  (e:'change', ...value):void
  (e:'update:value', ...value):void
}
const emits = defineEmits<EmitEvents>()
const attrs = useAttrs()

const value = computed(() => (props.value === 0 && props.zeroToUndefined ? undefined : props.value))

const getOptions = computed(() => {
  const { filter, referenceKey, numberToString, valueField, labelField } = props

  let optionData: any = attrs.options ?? getReferenceItems(referenceKey)
  if (filter) {
    optionData = optionData?.filter(i => {
      const rs = Object.keys(filter).reduce((flag, key) => flag && i[key] === filter[key], true)
      return rs
    })
  }
  const options = optionData?.map(item => {
    const optionValue = item[valueField]
    return {
      label: item[labelField],
      value: numberToString ? `${optionValue}` : optionValue,
    }
  })

  return options
})

const bindAttrs = computed(() => ({
  dropdownStyle: { maxHeight: '280px' },
  optionFilterProp: 'label',
  showSearch: true,
  ...attrs,
  value: unref(value),
  options: unref(getOptions),
  onChange: (...value) => emits('change', ...value),
  'onUpdate:value': (...value) => emits('update:value', ...value),
}))
</script>
