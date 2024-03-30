import { useSiteConfig } from '@/hooks/site-config'
import { useTimeoutFn } from '@vueuse/core'
import { ComputedRef } from 'vue'
import { PaginationProps, PaginationConfig } from 'ant-design-vue/es/pagination'
import { cloneDeep, isBoolean, get, isEqual, isFunction } from 'lodash-es'

const { table } = useSiteConfig
type ActionParam = {
  setLoading: (loading: boolean) => void;
  setPagination: (PaginationConfig:PaginationConfig) => void;
}

export function useDataSource(
  propsRef: ComputedRef<IGridTable.Props>,
  paginationRef: ComputedRef<PaginationProps | boolean>,
  { setLoading, setPagination }: ActionParam,
) {
  let searchParam: Recordable | undefined = {} // 搜索条件的保存
  const rawDataSourceRef = ref<any[]>([])
  const dataSourceRef = computed(() => rawDataSourceRef.value)

  const totalRef = ref(0)
  watch(
    () => totalRef.value,
    total => setPagination({ total }),
  )

  // 监听 getListApiParams 参数变化，清空搜索参数，调用获取数据接口
  watch(
    () => propsRef.value.getListApiParams,
    // 仅当接口参数不一致时，才执行接口调用，避免 table props 更新，导致的参数对象更新（但实际参数未变化）时，导致的重复调用
    (newValue, oldValue) => {
      searchParam = {}
      setPagination({ current: 1 })
      !isEqual(newValue, oldValue) && fetch()
    }
  )

  onMounted(() => {
    useTimeoutFn(() => {
      propsRef.value.immediate && fetch()
      // eslint-disable-next-line no-magic-numbers
    }, 10)
  })

  async function fetch() {
    const { api, dataSource, getListApiParams } = unref(propsRef)
    const { current = 1, pageSize = table.defaultPageSize } = unref(paginationRef) as PaginationProps
    if (dataSource) {
      rawDataSourceRef.value = dataSource.slice((current - 1) * pageSize, current * pageSize)
      totalRef.value = dataSource.length
      return
    }
    if (!api) {
      return
    }
    try {
      let pageParam: Recordable = {}
      if (!isBoolean(unref(paginationRef))) {
        pageParam[table.pageField] = current
        pageParam[table.pageSizeField] = pageSize
      }

      const requestParam = {
        isPage: 1,
        ...pageParam,
        ...getListApiParams,
        ...(searchParam ?? {})
      }

      setLoading(true)
      const fetchApi = isFunction(api) ? api : api.getList
      if (isFunction(fetchApi)) {
        const res = await fetchApi!(requestParam)
        const data = get(res, table.resListField)
        rawDataSourceRef.value = cloneDeep(data)
        totalRef.value = get(res, table.resTotalField)
      }
    } catch (error) {
      rawDataSourceRef.value = []
      totalRef.value = 0
    } finally {
      setLoading(false)
    }
  }

  async function reload() {
    await fetch()
  }

  function search(newSearchParam?: Recordable) {
    searchParam = newSearchParam
    return new Promise((resolve, reject) => {
      try {
        setPagination({ current: 1 }) // 点击搜索，将页码重置为 1
        const ret = fetch()
        return resolve(ret)
      } catch (err) {
        return reject(err)
      }
    })
  }

  return {
    reload,
    search,
    dataSourceRef,
    rawDataSourceRef,
    totalRef,
  }
}
