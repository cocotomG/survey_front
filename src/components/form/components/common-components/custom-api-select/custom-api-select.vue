<template>
  <a-select
    v-bind="bindAttrs"
    @dropdownVisibleChange="handleFetch"
  >
    <template
      v-if="loading"
      #suffixIcon
    >
      <loading-outlined spin />
    </template>
    <template
      v-if="loading"
      #notFoundContent
    >
      <span>
        <loading-outlined
          spin
          class="mr-1"
        />
        暂无数据
      </span>
    </template>
  </a-select>
</template>
<script lang="ts" setup>
import { computed, unref, useAttrs } from 'vue'
import { get, isFunction, isArray } from 'lodash-es'
import { getCacheApi } from './api-cache'
import { customApiSelectProps } from './props'
import { parseDotStrObjToObj, transformObjToDotStrObj } from '@/utils/object'

const props = defineProps(customApiSelectProps)
type EmitEvents = {
  (e:'change', ...value):void
  (e:'update:value', ...value):void
  (e:'options-change', options:Recordable[]):void
}
const emits = defineEmits<EmitEvents>()
const attrs = useAttrs()
const loading = ref(false)
const isFetched = ref(false)
const options = ref<Recordable[]>([])
const value = computed(() => (props.value === 0 && props.zeroToUndefined ? undefined : props.value))

onMounted(() => {
  props.immediate && fetch()
})

async function handleFetch() {
  if (!isFetched.value) {
    await fetch()
  }
}

async function fetch() {
  const { api, apiParams, resultField, labelField, valueField, numberToString } = props
  if (!api || !isFunction(api)) {
    return
  }

  loading.value = true
  const res = await getCacheApi(api, apiParams)
  let optionData = isArray(res) ? res : get(res, resultField)
  options.value = optionData?.map(item => {
    const optionValue = transformObjToDotStrObj(item)[valueField]
    return {
      label: isFunction(labelField) ? labelField(item) : transformObjToDotStrObj(item)[labelField as string],
      value: numberToString ? `${optionValue}` : optionValue,
    }
  })
  isFetched.value = true
  emits('options-change', options.value)
  loading.value = false
}

const bindAttrs = computed(() => ({
  dropdownStyle: { maxHeight: '280px' },
  optionFilterProp: 'label',
  showSearch: true,
  value: unref(value),
  options: unref(options),
  onChange: (...newValue) => emits('change', ...newValue),
  'onUpdate:value': (...newValue) => emits('update:value', ...newValue),
  ...attrs,
}))
</script>
