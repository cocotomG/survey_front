<style lang='less' scoped>
.right-box {
  padding: 10px;
  flex: 1;
}
</style>
<template>
  <div class="flex">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      id="dddddd"
      :style="menuStyle"
      mode="inline"
      @click="handleClick"
    >
      <a-menu-item
        v-for="helpItem in helpList"
        :key="helpItem.id"
      >
        {{ helpItem.title }}
      </a-menu-item>
    </a-menu>
    <div
      v-html="innerContent"
      class="right-box"
    />
  </div>
</template>
<script lang='ts' setup>
import { MenuProps } from 'ant-design-vue'
import { helpApi } from '@/api/system'
import { CSSProperties } from '@vue/runtime-dom'
import { defineEmits } from 'vue'
const emits = defineEmits<{(e: 'change', value: string): void}>()
interface HelpList {
  content:string,
  createdAt:string
  createdByAdminId:number
  id:number
  isValid:number
  title:string
  updatedAt:string
  updatedByAdminId:number
}
const menuStyle = computed((): CSSProperties => ({
  position: 'sticky',
  top: 0,
  height: 'calc(100vh - 156px)',
  minWidth: '200px',
  maxWidth: '200px',
}))
const helpList = ref<HelpList[]>([])
const innerContent = ref<string>('<div>暂无信息</div>')
const getHelpList = async () => {
  let res = await helpApi.getHelpArticleList({
    isPage: 1,
    page: 1,
    pageSize: 5000
  })
  helpList.value = res.items
  selectedKeys.value = [helpList.value[0].id]
  innerContent.value = helpList.value.filter((helpItem:HelpList) => helpItem.id === selectedKeys.value[0])[0].content
}
getHelpList()
const selectedKeys = ref<number[]>([])
const openKeys = ref<string[]>(['sub1'])
const handleClick: MenuProps['onClick'] = e => {
  const { content, updatedAt } = helpList.value.filter((helpItem:HelpList) => helpItem.id == e.key)[0]
  innerContent.value = content
  emits('change', updatedAt)
}
</script>