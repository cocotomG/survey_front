<style lang="less" scoped>
.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;

  >* {
    margin-left: 10px;
  }
}
</style>

<template>
  <div class="flex justify-end">
    <div>
      <a-space>
        <a-dropdown v-if="multiActions?.length > 0">
          <a-button
            type="primary"
            ghost
          >
            批量操作
            <down-outlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="action in multiActions"
                :key="action.label"
                :disabled="!multiActionable"
                @click="() => handleClickAction(action)"
              >
                {{ action.label }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <a-button
          v-for="action in actions"
          v-bind="action"
          :key="action.label"
          @click="() => handleClickAction(action)"
        >
          {{
            action.label
          }}
        </a-button>
      </a-space>
    </div>
    <div
      v-if="showTools"
      class="tools"
    >
      <a-button
        v-if="props.creatable"
        type="primary"
        @click="handleCreate"
      >
        {{ createText }}
      </a-button>
      <a-divider type="vertical" />
      <a-tooltip title="刷新">
        <redo-outlined
          style="font-size: 16px;"
          @click="() => context.reload()"
        />
      </a-tooltip>
      <span v-if="props.exportable">
        <table-exporter :export-handler="props.exportHandler" />
      </span>
      <span>
        <column-setting />
      </span>
      <a-tooltip :title="getTitle">
        <fullscreen-exit-outlined
          v-if="isFullscreen"
          style="font-size: 16px;"
          @click="toggle"
        />
        <fullscreen-outlined
          v-else
          style="font-size: 16px;"
          @click="toggle"
        />
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { useTableContext } from '../hooks/context'
import TableExporter from './table-exporter.vue'
import ColumnSetting from './column-setting.vue'

const userStore = useUserStore()
const context = useTableContext()
const { toggle, isFullscreen } = useFullscreen(context.wrapLlRef)
type EmitEvents = {
  (e:'create'):void
  (e:'setFullscreen', isFullscreen:boolean):void
}
const emits = defineEmits<EmitEvents>()
const props = computed(() => context.getProps().value)
const multiActionable = computed(() => context.getSelectionKeys().length > 0)
const validActions = computed(() => unref(props.value.tableActions?.filter(a => a.isShow?.() !== false && userStore.hasPermission(a.requiredPermission)) || []))
const multiActions = computed(() => unref(validActions.value.filter(a => a.needSelection)))
const actions = computed(() => unref(validActions.value.filter(a => !a.needSelection)))
const createText = computed(() => props.value.createText ?? `新增${props.value.title}`)
const getTitle = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))
const showTools = computed(() => props.value.showTools)
watch(isFullscreen, () => {
  emits('setFullscreen', isFullscreen.value)
})

function handleCreate() {
  emits('create')
}

async function handleClickAction(action: IGridTable.Action) {
  if (action.needSelection) {
    await action.click(toRaw(unref(context.getSelectionKeys())), toRaw(unref(context.getSelectionRows())))
  } else {
    await action.click()
  }
  action.needReload && context.reload()
}
</script>
