<template>
  <a-drawer
    v-bind="bindAttrs"
    @update:visible="emits('update:visible', false)"
  >
    <template #title>
      <div class="flex justify-between">
        <div>
          <h3>{{ props.title }}</h3>
          <div
            v-if="props.slug"
            class="text-xs font-light text-gray-500"
          >
            {{ props.slug }}
          </div>
        </div>
        <div class="flex items-center text-gray-500">
          <a-tooltip
            v-if="props.reloadable && !props.loading"
            title="刷新"
            class="mx-1"
          >
            <reload-outlined @click="handleReload" />
          </a-tooltip>
          <a-spin v-if="props.loading">
            <template #indicator>
              <loading-outlined :spin="true" />
            </template>
          </a-spin>
          <a-tooltip
            v-if="props.showClose"
            title="关闭"
            class="mx-1"
          >
            <close-outlined @click="emits('update:visible', false)" />
          </a-tooltip>
        </div>
      </div>
    </template>
    <div :style="{ padding: `${bodyPadding}px` }">
      <slot />
    </div>
    <div
      v-if="props.showFooter"
      :style="footerStyle"
      class="flex items-center justify-end px-4"
    >
      <a-space>
        <slot name="prependFooter" />
        <a-button
          v-if="props.showCancel"
          @click="handleCancel"
        >
          {{ props.cancelText }}
        </a-button>
        <slot name="centerFooter" />
        <a-button
          v-if="props.showConfirm"
          type="primary"
          @click="handleConfirm"
        >
          {{ props.confirmText }}
        </a-button>
        <slot name="appendFooter" />
      </a-space>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, nextTick, ref, unref, watch } from 'vue'
import { CloseOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { basicDrawerProps } from './props'
import { omit } from 'lodash-es'
import { getHtmlElementHeight } from '@/utils/dom'
import { useWindowSizeFn } from '@/hooks/window-size-fn'

const bodyPadding = 20
const footerHeight = 50
const props = defineProps(basicDrawerProps)
const emits = defineEmits(['confirm', 'reload', 'update:visible', 'cancel'])

const bodyHeight = ref(200)

const bodyStyle = computed((): CSSProperties => ({
  padding: '0px',
  maxHeight: `${unref(bodyHeight)}px`,
  height: `${unref(bodyHeight)}px`,
  overflow: 'auto',
}))
const bindAttrs = computed(() => ({
  zIndex: 1000,
  closable: false,
  bodyStyle: unref(bodyStyle),
  ...omit(props, ['title']),
}))

const footerStyle = computed((): CSSProperties => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: `${footerHeight}px`,
  borderTop: '1px solid #e8e8e8',
}))

watch(() => [props.visible, props.showFooter], setBodyHeight, { immediate: true })
useWindowSizeFn(setBodyHeight)

async function setBodyHeight() {
  if (!props.visible) {
    return
  }

  await nextTick()
  const headerHeight = getHtmlElementHeight('.ant-drawer-header')

  const height = window.innerHeight - headerHeight - bodyPadding - (props.showFooter ? footerHeight : 0)
  bodyHeight.value = height
}

function handleConfirm(e: Event) {
  e.stopPropagation()
  emits('confirm')
}

function handleReload(e: Event) {
  e.stopPropagation()
  emits('reload')
}
// @click="emits('update:visible', false)"
function handleCancel(e: Event) {
  props.autoCancelVisible && emits('update:visible', false)
  emits('cancel')
}
</script>
