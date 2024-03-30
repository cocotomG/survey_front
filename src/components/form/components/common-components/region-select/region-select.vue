<template>
  <div>
    <Cascader
      :value="value"
      :options="options"
      placeholder="请选择"
      change-on-select
      @update:value="handleChange"
    />
  </div>
</template>
<script lang="ts" setup name="region-picker">
import { ref } from 'vue'
import { Cascader, CascaderProps } from 'ant-design-vue'
import { province, city } from './data'
import { regionSelectProps } from './props'
import { isArray } from 'lodash-es'
type EmitEvents = {
  (e:'update:value', value):void
}
const emits = defineEmits<EmitEvents>()
const props = defineProps(regionSelectProps)
const value = computed(() => {
  if (isArray(props.value)) {
    return props.value?.map(v => (props.needChineseValue ? v : Number(v)))
  } else {
    return []
  }
})

const options = ref(province.map(p => ({
  value: props.needChineseValue ? p.name : p.id,
  label: p.name,
  key: p.id,
  children: city[p.id].map(i => ({
    value: props.needChineseValue ? i.name : i.id,
    label: i.name,
  })),
  isLeaf: false,
})))


// const loadData = selectedOptions => {
//   const { length } = selectedOptions
//   const targetOption = selectedOptions[length - 1]
//   targetOption.loading = true
//   switch (length) {
//     case 1:
//       targetOption.children = city[targetOption.key].map(i => ({
//         value: i.id,
//         label: i.name,
//       }))
//       break
//     // case 2:
//     //   targetOption.children = county[targetOption.key].map(i => ({
//     //     value: i.name,
//     //     label: i.name,
//     //     key: i.id,
//     //   }))
//     //   break
//     default:
//       break
//   }
//   targetOption.loading = false
//   options.value = [...options.value]
// }

function handleChange(value) {
  emits('update:value', value)
}
</script>
