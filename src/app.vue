

<template>
  <a-config-provider
    :locale="zhCN"
    :transform-cell-text="({ text }) => text ? text : '--'"
  >
    <div>
      <router-view />
      <modal-form
        v-if="globalModelForm._isRender"
        v-bind="(globalModelForm.modelFormAttr as Readonly<ExtractPropTypes<typeof modalFormProps>>)"
        :ref="el => globalModelForm.modelFromRef = el"
        :visible="globalModelForm.visible"
        @ok="() => globalModelForm.visible = false"
        @cancel="() => globalModelForm.visible = false"
      />
    </div>
  </a-config-provider>
</template>
<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import { modalFormProps } from '@/components/form/props'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import ModalForm from './components/form/modal-form.vue'
import globalModelForm from '@/hooks/global-model-form'
import { debounce } from 'lodash-es'
import { Modal } from 'ant-design-vue/es'


/* 因版本更新迭代的速度很快，就会引起用户在应用当中，页面点击无反应，其实是打包的js和css的包名称更改，找不到以前的包的缘故。使用window.addEventListener('error')，判断js或css报错时，强制刷新页面，就可以正常使用了。
链接：https://www.jianshu.com/p/bcbacdf4a1f7 */
const handleListenerError = debounce(eventErr => {
  if (eventErr.srcElement.localName === 'link' || eventErr.srcElement.localName === 'script') {
    Modal.confirm({
      title: '版本更新提示',
      content: '因版本更新，页面需重新载入',
      okText: '重新刷新',
      onOk: () => window.location.reload()
    })
  }
  eventErr.preventDefault()
}, 2000)

window.addEventListener('error', handleListenerError, true)
</script>