<template>
  <a-dropdown>
    <a-tooltip title="导出">
      <download-outlined style="font-size: 16px;" />
    </a-tooltip>
    <template #overlay>
      <a-menu @click="handleExport">
        <a-menu-item
          v-for="menu in menus"
          :key="menu.key"
          :disabled="menu.key === 'selected' && selectedDisabled"
        >
          {{
            menu.label
          }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { computed, toRaw, unref, PropType } from 'vue'
import { useTableContext } from '../hooks/context'
import { useMessage } from '@/hooks/message'
import { aoaToSheetXlsx } from '@/utils/xlsx'
import { get, isFunction, isString } from 'lodash-es'
import { formatToDate } from '@/utils/date'
import { useSiteConfig } from '@/hooks/site-config'
const props = defineProps({

  /** 导出数据表格处理函数 */
  exportHandler: {
    type: [Function, undefined] as PropType<(params:{
        tableHeader:string[],
        tableData:(string | number)[][],
        apiData:Recordable[],
        filename:string,
      }) => Promise<void> | undefined>,
    default: undefined,
  }
})
const menus = [
  {
    key: 'all',
    label: '全部'
  },
  {
    key: 'current',
    label: '当前页'
  },
  {
    key: 'selected',
    label: '选中的行'
  },
]
const table = useTableContext()
const { table: tableAttr } = useSiteConfig
let downloading = false

const selectedDisabled = computed(() => table.getSelectionKeys().length <= 0)

async function fetch(): Promise<Recordable[] | null> {
  const { getSearchParams } = table
  const { api, getListApiParams } = unref(table.getProps())
  if (!api) {
    return null
  }

  const requestParam: Recordable = {
    isPage: 1,
    [tableAttr.pageSizeField]: tableAttr.exportMaxNum,
    ...getListApiParams,
    ...getSearchParams(),
  }
  const fetchApi = isFunction(api) ? api : api.getList
  const res = await fetchApi!(requestParam)

  return get(res, tableAttr.resListField)
}
async function handleExport(e) {
  let apiData: Recordable[] | null = []
  try {
    if (downloading) {
      useMessage.loading('数据导出中，请耐心等待')
      return
    }
    downloading = true
    useMessage.loading('数据导出中...')
    const total = toRaw(table.getTotal())
    switch (e.key) {
      case 'all':
        apiData = table.getDataSource()
        if (apiData && total > apiData?.length) {
          apiData = await fetch()
        }
        break
      case 'current':
        apiData = table.getDataSource()
        break
      case 'selected':
        apiData = toRaw(table.getSelectionRows())
        break
      default:
        break
    }
    if (!apiData || apiData?.length <= 0) {
      useMessage.error('无可导出的数据')
      return null
    }
    const exportColumns = table.getColumns({
      ignoreIndex: true,
      ignoreAction: true
    })
    const header = exportColumns.map(c => c.title)
    const data = apiData.map(r => {
      const row = exportColumns.map(c => {

        if (c.exportRender) {
          return c.exportRender({ record: r })
        }

        let itemValue = get(r, c.dataIndex!)
        let columnItemValue = ''
        // 判断是否为0
        if (itemValue === 0 || itemValue === '0') {
          columnItemValue = itemValue.toString()
        } else {
          columnItemValue = (get(r, c.dataIndex!) || '').toString()
        }

        // enumSchemas 返回的是 jsx 枚举值，但由于其是固定的格式，故进行定制化解析
        if (c.enumSchemas) {
          const enumItem = c.enumSchemas?.find(e => e.value.toString() === columnItemValue)
          return enumItem?.label
        }

        if (c.customRender) {
          if (!isString(c.customRender({ record: r }))) {
            throw new Error('当 customRender return 的数据为非字符串时，请使用 exportRender 明确导出的数据内容')
          }
          return c.customRender({ record: r })
        }

        return columnItemValue
      })
      return row
    })

    console.log(header, data, 'data')


    const filename = `${unref(table.getProps()).title}_${menus.find(m => e.key === m.key)?.label
    }_${formatToDate()}.xlsx`

    if (props.exportHandler) {
      await props.exportHandler({
        tableHeader: header,
        tableData: data,
        apiData,
        filename,
      })
    } else {
      await aoaToSheetXlsx({
        header,
        data,
        filename,
      })
    }
    downloading = false
    useMessage.close()
  } catch (error) {
    console.log('handleExport error ', error)
    downloading = false
  }
}
</script>
