<template>
  <custom-api-select
    :api="adminApi.getAdmins"
    :api-params="apiParams"
    :immediate="true"
    value-field="id"
    label-field="name"
  />
</template>
<script lang="ts" setup>
import { adminApi } from '@/api/system'
import { adminUserApiSelectProps } from './props'
const props = defineProps(adminUserApiSelectProps)
const { apiParams } = props
</script>
