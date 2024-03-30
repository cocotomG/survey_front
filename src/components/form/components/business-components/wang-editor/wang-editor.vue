<template>
  <div>
    <div ref="instanceElRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, useAttrs } from 'vue'
import Editor from 'wangeditor'

import WangEditor from 'wangeditor'
import { useUserStore } from '@/store/modules/user'
import { useEnv } from '@/hooks/env'
import { wangEditorProps } from './props'
import { useMessage } from '@/hooks/message'
const userStore = useUserStore()
const instanceElRef = ref<HTMLElement>()
const emits = defineEmits(['change', 'update:value', 'blur'])
const attrs = useAttrs()
const props = defineProps(wangEditorProps)
let editor: Editor

onMounted(setup)

watch(
  () => props.value,
  val => {
    if (!val) {
      editor.txt.clear()
    }
  },
)

function setup() {
  editor = new WangEditor(instanceElRef.value)
  editor.config.placeholder = (attrs.placeholder ?? '请输入内容') as unknown as string
  editor.config.excludeMenus = ['todo', 'video']
  editor.config.menuTooltipPosition = 'down'
  editor.config.uploadImgServer = useEnv.uploadApiUrl
  editor.config.uploadImgHeaders = {
    Authorization: `Bearer ${userStore.token}`,
  }
  editor.config.uploadFileName = 'file'
  editor.config.uploadImgParams = {
    type: 'img',
    // fileable_field: 'editor',
  }

  // 自定义插入图片
  editor.config.uploadImgHooks = {
    customInsert(insertImg, result:any) {
      if (result.code !== 200) {
        return useMessage.error('上传出错')
      }
      let url = result.data.url
      // 插入图片
      insertImg(url)
    }
  }
  editor.config.onchange = function(value) {
    emits('change', value)
    emits('update:value', value)
  }
  editor.config.onchangeTimeout = 500
  editor.config.height = 730
  editor.create()
  if (props.value) {
    editor.txt.html(props.value)
  }
}
</script>
