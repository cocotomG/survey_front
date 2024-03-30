<template>
  <custom-api-select
    :api="getSelectorOptions"
    :immediate="!searchKey"
    :search-key="searchKey"
    value-field="value"
    label-field="label"
  />
</template>
<script lang="ts" setup>
import { globalApi } from '@/api/global'
import { commonApiSelectProps } from './props'

/* data 数据 */
const props = defineProps(commonApiSelectProps)

/* logics 逻辑 */

/* methods 方法 */
function getSelectorOptions(otherApiParams) {
  // 因为 type 约束的是 ts 常量，是大写，而 api 传入的是小写，故需要转义成小写
  const apiParams = Object.assign({ type: props.commonApiSelectType }, otherApiParams)
  return globalApi.getSelectorOptions({
    ...apiParams,
    ...props.elseApiParams
  })
}
</script>
