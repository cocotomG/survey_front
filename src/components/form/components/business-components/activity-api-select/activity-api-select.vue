<template>
  <custom-api-select
    :api="distributeApi.getActivityList"
    :api-params="apiParams"
    :immediate="true"
    value-field="id"
    label-field="name"
  />
  <!-- disabled-field="isAvailable" -->
</template>
<script lang="ts" setup>
import { distributeApi } from '@/api/distribute'
import { activityApiSelectProps } from './props'
const props = defineProps(activityApiSelectProps)
const { apiParams } = props
</script>
