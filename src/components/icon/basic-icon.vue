<template>
  <icon-font :type="name" />
</template>
<script lang="ts" setup>
import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3730450_igopskq2n38.js',
})

defineProps({
  name: {
    type: String,
    required: true,
  },
})

</script>
