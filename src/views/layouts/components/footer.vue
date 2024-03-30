<style scoped>
</style>

<template>
  <div class="text-center">
    {{ useSiteConfig.copyright }}
  </div>
</template>

<script setup lang="ts">
import { useSiteConfig } from '@/hooks/site-config'
</script>
