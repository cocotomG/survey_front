<template>
  <div
    class="flex flex-wrap items-center justify-center"
    @click.stop="handleCellClick"
  >
    <template v-for="action in getActions">
      <a-popconfirm
        v-if="action.confirm"
        :key="action.label"
        :on-confirm="() => handleAction(action)"
        :title="action.confirm"
        placement="left"
        size="small"
      >
        <a-button v-bind="action">
          {{ action.label }}
        </a-button>
      </a-popconfirm>
      <a-button
        v-else
        :key="action.confirm + action.label"
        size="small"
        v-bind="action"
        @click.prevent="() => handleAction(action)"
      >
        {{
          action.label
        }}
      </a-button>
      <!-- <a-divider v-if="index !== getActions.length - 1" type="vertical" style="margin: 0 2px" /> -->
    </template>
    <a-dropdown
      v-if="getDrowdowns.length > 0"
      :trigger="['click']"
    >
      <a-button
        type="link"
        size="small"
      >
        更多
      </a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="dropdown in getDrowdowns"
            :key="dropdown.confirm + dropdown.label"
          >
            <a-popconfirm
              v-if="dropdown.confirm"
              :on-confirm="() => handleAction(dropdown)"
              :title="dropdown.confirm"
              placement="left"
            >
              {{ dropdown.label }}
            </a-popconfirm>
            <span
              v-else
              @click.prevent="() => handleAction(dropdown)"
            >
              {{ dropdown.label }}
            </span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, unref, toRaw } from 'vue'
import { isFunction } from 'lodash-es'
import { useUserStore } from '@/store'
import { useTableContext } from '../hooks/context'

const context = useTableContext()
const props = defineProps({
  actions: {
    type: Array as PropType<IGridTable.RowAction[]>,
    default: () => [],
  },
  record: {
    type: Object as PropType<any>,
    required: true,
  },
})

const getActions = computed((): IGridTable.RowAction[] => {
  const actions = unref(props.actions).filter(a => {
    if (a.isShow !== undefined) {
      return isFunction(a.isShow) ? a.isShow(props.record) : a.isShow
    }
    if (!a.requiredPermission) {
      return true
    }
    return useUserStore().hasPermission(a.requiredPermission)
  })
  const endIndex = actions.length <= 3 ? 3 : 2
  return actions.slice(0, endIndex).map(action => ({
    type: 'link',
    size: 'small',
    ...action,
  }))
})

const getDrowdowns = computed((): IGridTable.RowAction[] => {
  const actions = unref(props.actions).filter(a => {
    if (a.isShow !== undefined) {
      return isFunction(a.isShow) ? a.isShow(props.record) : a.isShow
    } else {
      return true
    }
  })
  if (actions.length <= 3) {
    return []
  }
  return actions.slice(2).map(action => ({
    type: 'link',
    size: 'small',
    ...action,
  }))
})

function handleCellClick() {
  // todo
}

async function handleAction(action: IGridTable.RowAction) {
  await action.click?.(toRaw(props.record))
  action.needReload && context.reload()
}
</script>
