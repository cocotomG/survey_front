<template>
  <div>
    <!-- <div class="-pb-6"> 使table底部贴紧浏览器底部 -->
    <div
      v-if="propsRef.searchSchemas?.length"
      class="px-2 py-2 bg-white"
      style="border-bottom: solid 1px #EFEFEF;"
    >
      <basic-form
        ref="baseFormRef"
        :is-search-form="true"
        :schemas="propsRef.searchSchemas"
        :collapsible="true"
        :reset-do-submit="true"
        submit-text="搜索"
        @submit="search"
      />
    </div>
    <div
      ref="tableWrapElRef"
      class="px-2 pt-1 bg-white"
    >
      <div
        v-if="propsRef.showTableHeader"
        class="my-2"
      >
        <table-header
          @create="handleCreate"
          @setFullscreen="setFullscreen"
        />
      </div>
      <table-body
        v-bind="bindAttrs"
        ref="tableBodyRef"
      >
        <template
          v-for="slot in Object.keys(slots)"
          #[slot]="data"
        >
          <slot
            :name="slot"
            v-bind="data || {}"
          />
        </template>
      </table-body>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createTableContext } from './hooks/context'
import { useDataSource } from './hooks/datasource'
import { useLoading } from './hooks/loading'
import { gridTableProps } from './props'
import { usePagination } from './hooks/pagination'
import { useColumn } from './hooks/column'
import { useSelection } from './hooks/selection'
import { useScroll } from './hooks/scroll'
import { omit } from 'lodash-es'
import BasicForm from '../form/basic-form.vue'
import TableBody from './components/table-body.vue'
import { useAction } from './hooks/action'

const tableWrapElRef = ref()
const tableBodyRef = ref<IGridTable.TableBodyExpose>()
const baseFormRef = ref()
const attrs = useAttrs()
const slots = useSlots()
const props = defineProps(gridTableProps)
const dynamicProps = ref<Partial<IGridTable.Props>>()
const propsRef = computed(() => ({
  ...attrs,
  ...props,
  ...unref(dynamicProps),
} as IGridTable.Props))

const { setLoading, getLoading } = useLoading()
const { paginationRef, setPagination } = usePagination(propsRef)
const { selectedKeysRef, selectedRowsRef, resetSelection, selectionRef, setSelectedKeys, setSelectedRows } = useSelection(propsRef)
const { reload, search, rawDataSourceRef, dataSourceRef, totalRef } = useDataSource(propsRef, paginationRef, {
  setLoading,
  setPagination,
})
const { handleCreate, handleEdit, handleDel } = useAction(propsRef, reload)
const { columnsRef, setColumns, getColumns } = useColumn(
  tableBodyRef,
  propsRef,
  paginationRef,
  rawDataSourceRef,
  {
    handleEdit,
    handleDel,
  }
)
const { scrollRef, setFullscreen } = useScroll(propsRef, tableBodyRef, columnsRef)
const bindAttrs = computed(() => ({
  rowKey: 'id',
  ...omit(unref(propsRef), 'title'),
  loading: unref(getLoading),
  columns: unref(columnsRef),
  rowSelection: unref(selectionRef),
  pagination: unref(paginationRef),
  dataSource: unref(dataSourceRef),
  scroll: unref(scrollRef),
  onChange: pagination => {
    setPagination(pagination)
    reload()
  },
}), {
  onTrigger(e) {
    // 当 count.value 被修改时触发
    // console.log(e)
  }
})

function setProps(newProps: Partial<IGridTable.Props>) {
  dynamicProps.value = {
    ...unref(dynamicProps),
    ...newProps,
  }
}

const exposeData: IGridTable.Expose = {
  wrapLlRef: tableWrapElRef,
  reload,
  setProps,
  getProps: () => propsRef,
  setLoading,
  getColumns,
  setColumns,
  setPagination,
  getSearchParams: () => unref(baseFormRef.value.formModel),
  getDataSource: () => unref(dataSourceRef),
  getTotal: () => unref(totalRef),
  resetSelection,
  getSelectionKeys: () => unref(selectedKeysRef),
  getSelectionRows: () => unref(selectedRowsRef),
  setSelectedKeys,
  setSelectedRows,

  tableBodyRef: computed(() => unref(tableBodyRef.value?.tableBodyRef)),
  editingData: computed(() => tableBodyRef.value?.editingData),
  saveAllEditData: () => tableBodyRef.value?.saveAllEditData(),
  editAllEditData: () => tableBodyRef.value?.editAllEditData(),
  cancelAllEditData: () => tableBodyRef.value?.cancelAllEditData(),
}
defineExpose(exposeData)
createTableContext(exposeData)
</script>
