import { useSiteConfig } from '../../../hooks/site-config'
import { PaginationProps } from 'ant-design-vue/lib/pagination'
import { computed, ref, unref, watchEffect, ComputedRef } from 'vue'
import { isBoolean } from 'lodash-es'

const { table } = useSiteConfig

export function usePagination(propsRef: ComputedRef<IGridTable.Props>) {
  const configRef = ref<PaginationProps>({})
  const show = ref(true)

  watchEffect(() => {
    const { pagination } = unref(propsRef)
    if (!isBoolean(pagination) && pagination) {
      configRef.value = {
        ...unref(configRef),
        ...(pagination ?? {}),
      }
    }
  })

  const paginationRef = computed((): PaginationProps | boolean => {
    const { pagination } = unref(propsRef)
    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false
    }

    return {
      current: 1,
      size: 'small',
      showTotal: total => `共${total}条数据`,
      showSizeChanger: true,
      pageSize: table.defaultPageSize,
      defaultPageSize: table.defaultPageSize,
      pageSizeOptions: table.pageSizes,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    }
  })

  function setPagination(conf: Partial<PaginationProps> | boolean) {
    if (!isBoolean(conf)) {
      const paginationInfo = unref(paginationRef)
      configRef.value = {
        ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
        ...conf,
      }
    }
  }

  return {
    paginationRef,
    setPagination,
  }
}
