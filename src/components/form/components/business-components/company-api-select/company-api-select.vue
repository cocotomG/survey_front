<template>
  <custom-api-select
    :api="companyApi.getCompanyList"
    :api-params="apiParams"
    :immediate="true"
    value-field="id"
    label-field="name"
  />
</template>
<script lang="ts" setup>
import { companyApi } from '@/api/company'
import { companyApiSelectProps } from './props'
const props = defineProps(companyApiSelectProps)
const { apiParams } = props
</script>
