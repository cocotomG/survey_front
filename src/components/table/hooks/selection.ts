import { TableRowSelection } from 'ant-design-vue/es/table/interface'
import { computed, ref, unref, watch, ComputedRef } from 'vue'
import { omit } from 'lodash-es'
import { Key } from 'ant-design-vue/lib/table/interface'

export function useSelection(props: ComputedRef<IGridTable.Props>) {
  const selectedKeysRef = ref<Key[]>([])
  const selectedRowsRef = ref<Recordable[]>([])

  watch(
    () => unref(props).rowSelection?.selectedRowKeys as Key[],
    (v: Key[]) => {
      setSelectedKeys(v)
    },
  )

  const selectionRef = computed((): TableRowSelection | null => {
    const { selectable, rowSelection, getCheckboxProps } = unref(props)
    if (!selectable) {
      return null
    }

    return {
      columnWidth: 30,
      selectedRowKeys: unref(selectedKeysRef),
      onChange: (keys: Key[], rows: Recordable[]) => {
        setSelectedKeys(keys)
        setSelectedRows(rows)
      },
      getCheckboxProps,
      ...omit(rowSelection, 'onChange'),
    }
  })

  function setSelectedKeys(keys: Key[]) {
    selectedKeysRef.value = keys
  }

  function setSelectedRows(keys: Recordable[]) {
    selectedRowsRef.value = keys
  }

  function resetSelection() {
    setSelectedKeys([])
    setSelectedRows([])
  }

  return {
    selectedKeysRef,
    selectedRowsRef,
    selectionRef,
    setSelectedKeys,
    setSelectedRows,
    resetSelection,
  }
}
