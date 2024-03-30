<template>
  <a-tooltip title="列设置">
    <a-popover
      placement="bottomLeft"
      trigger="click"
      @visible-change="handleVisibleChange"
    >
      <setting-outlined style="font-size: 16px;" />
      <template #title>
        <div>
          <a-checkbox v-model:checked="state.draggable">
            数据拖拽
          </a-checkbox>
          <a-checkbox v-model:checked="state.indexable">
            显示序号
          </a-checkbox>
          <a-checkbox v-model:checked="state.selectable">
            显示多选
          </a-checkbox>
          <a-checkbox v-model:checked="state.actionable">
            操作列
          </a-checkbox>
          <!-- <a-button type="link" size="small" @click="handleReset">重置</a-button> -->
        </div>
      </template>
      <template #content>
        <div style=" overflow: auto;max-height: 200px;">
          <a-checkbox-group
            ref="columnSortRef"
            v-model:value="state.checkedList"
            class="w-full"
            @change="handelChangeCheckedList"
          >
            <div
              v-for="column in columns"
              :key="(column.dataIndex as string)"
              class="flex items-center justify-between mb-2"
            >
              <drag-outlined class="mr-2 cursor-move table-coulmn-drag-icon" />
              <a-checkbox
                class="w-full"
                :value="column.dataIndex"
              >
                {{ column.title }}
              </a-checkbox>
              <a-tooltip
                placement="bottomLeft"
                title="固定到左侧"
              >
                <vertical-right-outlined
                  :class="{ 'fixed-icon': true, active: column.fixed === true || column.fixed === 'left' }"
                  @click="handleColumnFixed(column, 'left')"
                />
              </a-tooltip>
              <a-divider type="vertical" />
              <a-tooltip
                placement="bottomLeft"
                title="固定到右侧"
              >
                <vertical-left-outlined
                  :class="{ 'fixed-icon': true, active: column.fixed === 'right' }"
                  @click="handleColumnFixed(column, 'right')"
                />
              </a-tooltip>
            </div>
          </a-checkbox-group>
        </div>
      </template>
    </a-popover>
  </a-tooltip>
</template>

<script lang="ts" setup>
import { SettingOutlined, DragOutlined, VerticalRightOutlined, VerticalLeftOutlined } from '@ant-design/icons-vue'
import { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import { onMounted, reactive, ref, watchEffect, unref, nextTick, watch } from 'vue'
import { useTableContext } from '../hooks/context'
import { useSortable } from '@/hooks/sortable'
import { isNull, isUndefined } from 'lodash-es'
interface State {
  draggable: boolean;
  indexable: boolean;
  selectable: boolean;
  actionable: boolean;
  checkedList: string[];
  defaultCheckedList: string[];
}
let inited = false
const table = useTableContext()
const columnSortRef = ref<ComponentRef>(null)
const columns = ref<IGridTable.ColumnProps[]>([])
const state = reactive<State>({
  draggable: false,
  indexable: false,
  selectable: false,
  actionable: false,
  checkedList: [],
  defaultCheckedList: [],
})

onMounted(() => {
  handleReset()
  initColumns()
})

watch(
  () => state.draggable,
  value => {
    table.setProps({ draggable: value })
  },
)

watch(
  () => state.indexable,
  value => {
    table.setProps({ indexable: value })
  },
)
watch(
  () => state.selectable,
  value => {
    table.setProps({ selectable: value })
  },
)
watch(
  () => state.actionable,
  value => {
    table.setProps({ actionable: value })
  },
)

function handleReset() {
  const { indexable, selectable, actionable, draggable } = unref(table.getProps())
  state.draggable = draggable ?? false
  state.indexable = indexable ?? false
  state.selectable = selectable ?? false
  state.actionable = actionable ?? false
}

watchEffect(() => {
  if (table.getColumns().length > 0) {
    initColumns()
  }
})

function initColumns() {
  const tableColumns = table.getColumns({
    ignoreDrag: true,
    ignoreIndex: true,
    ignoreAction: true
  }) as IGridTable.ColumnProps[]
  const checkedList: any[] = tableColumns.filter(column => !column.defaultHidden).map(column => column.dataIndex)
  columns.value = tableColumns
  state.defaultCheckedList = checkedList
  state.checkedList = checkedList
}

function handelChangeCheckedList(checkedList: CheckboxValueType[]) {
  const newColumns = unref(columns).map(column => ({
    ...column,
    defaultHidden: !checkedList.includes(column.dataIndex! as string),
  }))
  table.setColumns(newColumns)
}

function handleColumnFixed(column: IGridTable.ColumnProps, fixed: 'left' | 'right') {
  const isFixed = column.fixed === fixed ? false : fixed
  const index = columns.value.findIndex(col => col.dataIndex === column.dataIndex)
  columns.value[index].fixed = isFixed
  table.setColumns(unref(columns))
}

function handleVisibleChange() {
  if (inited) {
    return
  }
  nextTick(() => {
    const columnSortEl = unref(columnSortRef)
    if (!columnSortEl) {
      return
    }
    const el = columnSortEl.$el as any
    if (!el) {
      return
    }
    // Drag and drop sort
    const { initSortable } = useSortable(el, {
      handle: '.table-coulmn-drag-icon',
      onEnd: evt => {
        const { oldIndex, newIndex } = evt
        if ((isUndefined(oldIndex) && isNull(oldIndex)) || (isUndefined(newIndex) && isNull(newIndex)) || oldIndex === newIndex) {
          return
        }
        // Sort column
        const newColumns = unref(columns)
        if (oldIndex > newIndex) {
          newColumns.splice(newIndex, 0, newColumns[oldIndex])
          newColumns.splice(oldIndex + 1, 1)
        } else {
          newColumns.splice(newIndex + 1, 0, newColumns[oldIndex])
          newColumns.splice(oldIndex, 1)
        }

        table.setColumns(newColumns)
      },
    })
    initSortable()
    inited = true
  })
}
</script>
