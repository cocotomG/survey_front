import { useSiteConfig } from '@/hooks/site-config'
import { computed, unref, ComputedRef, Ref } from 'vue'

const { table } = useSiteConfig

export function useScroll(
  props: ComputedRef<IGridTable.Props>,
  tableElRef: Ref<IGridTable.TableBodyExpose | undefined>,
  columnsRef: ComputedRef<IGridTable.ColumnProps[]>
) {
  const isFullscreen = ref(false)
  function setFullscreen(newValue:boolean) {
    isFullscreen.value = newValue
  }

  const getScrollX = computed(() => {
    let x = 0
    const { selectable, rowSelection, indexable, rowActions } = unref(props)
    const SELECT_BOX_WIDTH = 30 // 选择框宽度
    const INDEX_BOX_WIDTH = 50 // 索引列宽度
    const ACTION_BOX_WIDTH = 180 // 操作栏宽度
    if (selectable || rowSelection) {
      x += SELECT_BOX_WIDTH
    }
    if (indexable) {
      x += INDEX_BOX_WIDTH
    }
    if (rowActions && rowActions.length > 0) {
      x += ACTION_BOX_WIDTH
    }
    unref(columnsRef)
      .filter(column => !column.defaultHidden)
      .forEach(column => {
        x += column.width ? Number.parseInt(column.width as string) : table.defaultColumnWidth
      })
    const tableWidth = unref(tableElRef)?.tableBodyRef?.value?.$el.offsetWidth ?? 0
    return tableWidth > x ? '100%' : x
  })

  const scrollRef = computed(() => {
    const { scroll } = unref(props)
    const tableScroll = {
      scrollToFirstRowOnChange: true,
      x: unref(getScrollX),
      ...scroll,
    }
    if (isFullscreen.value) {
      tableScroll.y = 'calc(100vh - 90px)'
    }
    return tableScroll
  })

  return {
    scrollRef,
    setFullscreen,
  }
}
