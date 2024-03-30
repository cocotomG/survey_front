import { useSiteConfig } from '@/hooks/site-config'
import { computed, unref, ref, Ref, ComputedRef, h } from 'vue'
import { cloneDeep, isFunction, isBoolean, isString } from 'lodash-es'
import RowAction from '../components/row-action.vue'
import { Tag, Image, Badge } from 'ant-design-vue'
import { PaginationProps } from 'ant-design-vue/es'
import { useAppStore } from '@/store'
import { DragOutlined } from '@ant-design/icons-vue'
import { useSortable } from '@/hooks/sortable'
const { table } = useSiteConfig

export declare type GetColumnsParm = { ignoreIndex?: boolean; ignoreAction?: boolean; ignoreHidden?: boolean }

export function useColumn(
  tableRef,
  props: ComputedRef<IGridTable.Props>,
  paginationRef: ComputedRef<PaginationProps | boolean>,
  rawDataSourceRef: Ref<any[]>,
  actions: { handleEdit: Fn; handleDel: Fn },
) {
  const rawColumnsRef = ref(unref(props).columnSchemas)
  const columnsRef = computed(() => unref(allColumnsRef!)?.filter(column => !column.defaultHidden))
  const allColumnsRef = computed<IGridTable.ColumnProps[]>(() => {
    const {
      draggable,
      indexable,
      editable,
      deleteable,
      isFormTable,
      rowActionsWidth,
      rowActions: rawRowActions = [],
    } = unref(props)

    let columns = (cloneDeep(unref(rawColumnsRef)) as IGridTable.ColumnProps[]).map(column => {
      if (column.dataIndex && isString(column.dataIndex) && column.dataIndex.indexOf('.') > 0) {
        column.dataIndex = column.dataIndex.split('.')
      }
      if (column.enumSchemas) {
        column.customRender = function({ text }) {
          const enumItem = column.enumSchemas?.find(e => e.value?.toString() === text?.toString())
          if (enumItem?.color && enumItem?.bgColor) {
            return h(Tag, { color: enumItem.bgColor }, () => [h('span', { style: { color: enumItem.color } }, enumItem.label)])
          } else
          if (enumItem?.color) {
            return h(Badge, {
              color: enumItem?.color,
              text: enumItem?.label
            })
          } else {
            return enumItem?.label
          }
          // return enumItem?.color ? h(Tag, { color: enumItem.color }, () => enumItem.label) : enumItem?.label
        }
      }
      if (column.referenceKey) {
        const { reference } = useAppStore()
        column.customRender = function({ text }) {
          return reference?.[column.referenceKey as string]?.find(e => e.value === text)?.label
        }
      }
      if (column.thumbAble) {
        column.customRender = function({ text }) {
          return h(Image, {
            src: text,
            width: 120
          })
        }
      }
      return column
    })
    if (!columns) {
      return []
    }


    // 拖拽列
    if (draggable) {
      columns.unshift({
        width: 60,
        title: '拖拽',
        align: 'center',
        flag: 'drag',
        customRender: () => h(DragOutlined, {
          class: 'mr-2 cursor-move table-coulmn-drag-icon',
        }),
      })
      nextTick(() => {
        // Drag and drop sort
        const el = tableRef.value.$el.querySelector('.ant-table-tbody') as HTMLDivElement
        const { initSortable } = useSortable(el, {
          handle: '.table-coulmn-drag-icon',
          onEnd: evt => {
            const { oldIndex, newIndex } = evt
            nextTick(() => {
              const rawDataSource = unref(rawDataSourceRef)
              if (oldIndex > newIndex) {
                rawDataSource.splice(newIndex - 1, 0, rawDataSource[oldIndex - 1])
                rawDataSource.splice(oldIndex, 1)
              } else {
                rawDataSource.splice(newIndex, 0, rawDataSource[oldIndex - 1])
                rawDataSource.splice(oldIndex - 1, 1)
              }
            })
          },
        })
        initSortable()
      })
    }
    // 索引列
    if (indexable) {
      columns.unshift({
        width: 60,
        title: '序号',
        align: 'center',
        flag: 'index',
        customRender: ({ index }) => {
          const pagination = unref(paginationRef)
          if (isBoolean(pagination) && !pagination) {
            return index + 1
          }
          const { current = 1, pageSize = table.defaultPageSize } = pagination as PaginationProps
          return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1
        },
      })
    }

    const rowActions = cloneDeep(rawRowActions)
    if ((isFunction(deleteable) && deleteable()) || deleteable) {
      rowActions.push({
        label: '删除',
        confirm: '确定删除吗？',
        click: actions.handleDel,
      })
    }
    if (((isFunction(editable) && editable()) || editable)) {
      rowActions.unshift({
        label: '编辑',
        click: actions.handleEdit,
      })
    }
    // 操作列
    if (rowActions.length > 0 || isFormTable) {
      columns.push({
        width: rowActionsWidth ?? (rowActions.length > 3 || isFormTable ? 3 : rowActions.length) * 65,
        title: '操作',
        align: 'center',
        fixed: 'right',
        dataIndex: 'action',
        flag: 'action',
        customRender: ({ index }) => {
          const rawRecord = rawDataSourceRef.value[index]
          return h(RowAction, {
            actions: rowActions,
            record: rawRecord
          })
        },
      })
    }

    return columns
  })

  function setColumns(columns: IGridTable.ColumnProps[]) {
    const newColumns = cloneDeep(columns)
    rawColumnsRef.value = newColumns
  }

  function getColumns(opt: IGridTable.GetColumnParam) {
    let columns = unref(allColumnsRef)
    if (opt?.ignoreHidden) {
      columns = columns.filter(column => !column.defaultHidden)
    }
    if (opt?.ignoreDrag) {
      columns = columns.filter(column => column.flag !== 'drag')
    }
    if (opt?.ignoreIndex) {
      columns = columns.filter(column => column.flag !== 'index')
    }
    if (opt?.ignoreAction) {
      columns = columns.filter(column => column.flag !== 'action')
    }
    return columns
  }

  return {
    columnsRef,
    allColumnsRef,
    setColumns,
    getColumns,
  }
}
