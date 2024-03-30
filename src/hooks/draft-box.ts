import { useMessage } from '@/hooks/message'
import { cloneDeep } from 'lodash-es'
import { formatToDateTime } from '@/utils/date'
import { setItem, getItem } from '@/utils/storage'
import { Input, Modal } from 'ant-design-vue'

export type DraftType = 'Company'
export interface DraftItem {
  title: string;
  saveAt: string;
  record: Recordable;
}

const maxDraftNum = 5
const prefixKey = 'DraftBox_'

export function useDraftBox() {
  const KEY = ref()
  const draftListRef = ref<DraftItem[]>([])

  watch(
    () => KEY.value,
    key => {
      draftListRef.value = getItem(key) || []
    },
  )
  watch(
    () => draftListRef.value,
    value => {
      setItem(KEY.value, value)
    },
    {
      deep: true,
    },
  )

  function setKey(key: DraftType) {
    KEY.value = `${prefixKey}${key}`

  }

  function saveDraft(record: Recordable) {
    if (!Object.keys(record).some(key => !!record[key])) {
      useMessage.error('无可保存的草稿数据！')
      return
    }
    let title = ''
    function handleUpdateTitle(val) {
      title = val
    }
    Modal.confirm({
      title: '草稿标题',
      content: h(Input, {
        prefix: h('span', { style: { color: 'red' } }, '*'),
        'onUpdate:value': handleUpdateTitle
      }),
      zIndex: 1002,
      onOk: () => new Promise((resolve, reject) => {
        if (!title) {
          useMessage.error('请输入草稿标题')
          return reject(new Error('请输入草稿标题'))
        }
        const item: DraftItem = {
          title,
          saveAt: formatToDateTime(),
          record: cloneDeep(record),
        }
        draftListRef.value = [item, ...draftListRef.value.slice(0, maxDraftNum - 1)]
        useMessage.success('草稿保存成功')
        return resolve('ok')
      }),
    })
  }

  function getDraftItemByIndex(i: number) {
    return draftListRef.value[i]
  }

  const getDraftList = computed(() => unref(draftListRef))

  return {
    setKey,
    saveDraft,
    getDraftItemByIndex,
    getDraftList,
  }
}
