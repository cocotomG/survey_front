<!-- 模态框弹窗 -->
<!-- 对 ant-design 进行了简单的二次封装，实现全屏等效果 -->
<!-- 在 form 组件中使用的外层弹窗，均来自于此，可以理解为代替 ant-design model 的存在 -->

<style lang="less">
.full-modal {
  .ant-modal {
    top: 0;
    margin: 0;
    padding-bottom: 0;
    max-width: 100%;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}
</style>

<template>
  <a-modal v-bind="bindAttrs" v-model:visible="visible" :confirm-loading="props.loading" @cancel="handleCancel"
    @ok="handleOk">
    <template #title>
      <div class="flex items-center justify-start">
        <h3>{{ title }}</h3>
        <span v-if="props.warning" class="ml-2 text-xs font-normal text-red-600">提示：{{ props.warning }}</span>
      </div>
    </template>
    <template #closeIcon>
      <a-space class="-ml-4">
        <div v-if="showFullScreen">
          <a-tooltip v-if="fullScreen" class="text-2xl" title="还原" placement="bottom">
            <fullscreen-exit-outlined @click.stop="toggleFullScreen" />
          </a-tooltip>
          <a-tooltip v-else class="text-2xl" title="最大化" placement="bottom">
            <fullscreen-outlined @click.stop="toggleFullScreen" />
          </a-tooltip>
        </div>
        <a-tooltip class="text-2xl" title="关闭" placement="bottom">
          <close-outlined />
        </a-tooltip>
      </a-space>
    </template>

    <template #footer>
      <div class="flex justify-between">
        <div>
          <slot name="left">
            <a-space>
              <a-dropdown v-if="attrs.draftable" placement="top">
                <a-button>
                  草稿
                  <down-outlined />
                </a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="save" @click="() => emits('saveDraft')">
                      立即保存
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item v-for="(item, index) in (attrs.draftList as DraftItem[])" :key="index"
                      @click="() => emits('loadDraft', item)">
                      {{ item.title }} {{ dateFromNow(item.saveAt) }}
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </slot>
        </div>
        <div>
          <a-space>
            <a-button :type="bindAttrs.cancelType" @click="handleCancel">
              {{ bindAttrs.cancelText }}
            </a-button>
            <a-button :type="bindAttrs.okType ? bindAttrs.okType : 'primary'" :loading="bindAttrs.confirmLoading"
              @click="handleOk">
              {{ bindAttrs.okText }}
            </a-button>
          </a-space>
        </div>
      </div>
    </template>

    <div ref="wrapperRef" :style="bodyStyle">
      <slot />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import {
  computed,
  CSSProperties,
  nextTick,
  reactive,
  ref,
  unref,
  useAttrs,
} from 'vue'
import { BasicModalProps, basicModalProps } from './prop'
import { getHtmlElementHeight } from '@/utils/dom'
import { useMutationObserver } from '@vueuse/core'
import { useWindowSizeFn } from '@/hooks/window-size-fn'
import { omit } from 'lodash-es'
import { dateFromNow } from '@/utils/date'
import type { DraftItem } from '@/hooks/draft-box'

const props = defineProps(basicModalProps)
const attrs = useAttrs()
type EmitEvents = {
  (e: 'update:visible', visible: boolean): void
  (e: 'ok'): void
  (e: 'cancel', event: Event): void
  (e: 'saveDraft'): void
  (e: 'loadDraft', item: DraftItem): void
}
const emits = defineEmits<EmitEvents>()
const wrapperRef = ref<HTMLElement | null>(null)
const visible = ref(true)
const state = reactive({
  fullScreen: props.fullScreen,
  showFullScreen: props.showFullScreen,
  height: 380,
  wrapClassName: '',
})

// 设置模态框可以滚动
function setDrag() {
  type CustomHTMLElement = HTMLDivElement & {
    left: number;
    top: number;
    setCapture: Fn;
    releaseCapture: Fn;
  }
  const modal = document.getElementsByClassName('ant-modal')[0] as CustomHTMLElement
  const header = document.getElementsByClassName('ant-modal-header')[0] as CustomHTMLElement

  let left = 0
  let top = modal.offsetTop

  // 鼠标变成可移动的指示
  header.style.cursor = 'move'

  // top 初始值为 offsetTop
  header.onmousedown = e => {
    const startX = e.clientX
    const startY = e.clientY
    header.left = header.offsetLeft
    header.top = header.offsetTop

    // 通过直接设置回调，来解决添加多个回调问题，将上一次设置的回调覆盖
    document.onmousemove = event => {
      const endX = event.clientX
      const endY = event.clientY
      modal.left = header.left + (endX - startX) + left
      modal.top = header.top + (endY - startY) + top
      modal.style.left = `${modal.left}px`
      modal.style.top = `${modal.top}px`
    }

    document.onmouseup = () => {
      left = modal.left
      top = modal.top
      document.onmousemove = null
      document.onmouseup = null
      header.releaseCapture && header.releaseCapture()
    }

    // setCapture 让一个元素可以捕获所有的鼠标事件，避免鼠标移出监听范围，导致无法触发响应函数
    header.setCapture && header.setCapture()
  }
}

// 监听外部控制，是否全屏
watchEffect(() => {
  state.wrapClassName = state.fullScreen ? 'full-modal' : ''
  setModalHeight()
})

// 监听外部控制。是否显示
watchEffect(() => {
  visible.value = props.visible
})

// 监听内部 visible 值的变化，向外部更新
watchEffect(() => {
  visible.value && nextTick(setDrag)
  emits('update:visible', visible.value)
  // 关闭弹窗，重置配置
  if (!visible.value) {
    state.fullScreen = false
  }
})

useWindowSizeFn(setModalHeight)
useMutationObserver(wrapperRef, setModalHeight, {
  subtree: true,
  attributes: true,
})

const bindAttrs = computed((): BasicModalProps => ({
  zIndex: 1001,
  ...attrs,
  ...omit(props, ['title', 'visible']),
  ...state,
  ...(state.fullScreen ? { width: '100%' } : { width: props.width }),
}))
console.log(bindAttrs, 'bindAttrs')
console.log(attrs, 'attrs')
console.log(props, 'props')
console.log(state, 'state')

const bodyStyle = computed((): CSSProperties => ({
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingTop: '18px',
  paddingBottom: '18px',
  minHeight: props.height || '100px',
  [state.fullScreen ? 'height' : 'maxHeight']: `${state.height}px`,
}))

function handleCancel(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  emits('cancel', event)
}

function handleOk(event: Event) {
  event.stopPropagation()
  event.preventDefault()
  emits('ok')
}

function toggleFullScreen() {
  state.fullScreen = !state.fullScreen
}

async function setModalHeight() {
  if (!visible.value) {
    return
  }

  const wrapperDom = unref(wrapperRef)
  if (!wrapperDom) {
    return
  }

  const bodyDom = wrapperDom.parentElement
  if (!bodyDom) {
    return
  }
  bodyDom.style.paddingTop = '0'
  bodyDom.style.paddingBottom = '0'

  const modalDom = bodyDom.parentElement?.parentElement
  if (!modalDom) {
    return
  }

  await nextTick()

  // 出现滚动条，添加paddingRight
  if (wrapperDom.scrollHeight > wrapperDom.offsetHeight) {
    wrapperDom.style.paddingRight = '10px'
  }
  const marginTop = Number.parseInt(getComputedStyle(modalDom).top)
  const headerHeight = getHtmlElementHeight('.ant-modal .ant-modal-header')
  const footerHeight = getHtmlElementHeight('.ant-modal .ant-modal-footer')
  state.height
    = window.innerHeight - marginTop * 2 - headerHeight - footerHeight
}
</script>
