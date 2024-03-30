<style lang='less'>
:deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
  padding: 0 !important;
  padding-right: 10px;
}

:deep(.ant-tabs-tab-remove) {
  margin: 0;
  padding: 0;
  padding-right: 5px;
}

.ant-tabs-dropdown-menu-item > span {
  display: flex !important;
  justify-content: space-between;
}

.ant-tabs-tab {
  border-radius: 8px !important;
}

</style>
<template>
  <div>
    <div
      v-if="isShowTabMenu"
      style="z-index: 999999;"
      class="mask absolute top-0 left-0 h-screen w-screen "
      @click="isShowTabMenu = false"
      @contextmenu.prevent="isShowTabMenu = false"
    />
    <a-tabs
      :active-key="activeKey"
      hide-add
      type="editable-card"
      @edit="onEdit"
      @change="clickPage"
    >
      <a-tab-pane
        v-for="(page,pageIndex) in historyPageMsg"
        :key="page.url"
        :closable="historyPageMsg.length!==1"
      >
        <template #tab>
          <div
            @contextmenu.prevent="clickTab($event,page,pageIndex)"
          >
            {{ page.title }}
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
    <div
      v-if="isShowTabMenu"
      :style="tabMenuStyle"
      class="bg-white shadow-md tabMenu rounded-md"
    >
      <div
        v-for="i in tabMenuContext"
        :key="i.text"
        class="flex  w-40 h-8 pl-5 border-1 rounded-md hover:bg-primaryColor-default hover:text-white leading-8"
        :class="[i.isAble ? 'cursor-pointer' : 'cursor-not-allowed' ]"
        @click="i.isAble?clickTabMenuItem(i.text):''"
      >
        <span :class="{'text-gray-200':!i.isAble}">{{ i.text }}</span>
      </div>
    </div>
    <slot />
  </div>
</template>
<script lang='ts' setup>
import { isEmpty, isUndefined } from 'lodash-es'
import { CSSProperties, h } from 'vue'
const router = useRouter()
const route = useRoute()
const overflowHistoryPageMsg = ref([]) as Ref<HistoryPageMsg[]>
type HistoryPageMsg = { type: 'name' | 'path', url: string, urlParams: Record<string, any>, isActive: boolean, title: string }
const historyPageMsg = ref([]) as Ref<HistoryPageMsg[]>
const activeKey = ref('')
// 监听路由的改变
watch(route, (newRoute, oldRoute) => {

  const { meta, path, name, params, query } = newRoute
  let currentRoute = {} as HistoryPageMsg
  let hasPage = false
  historyPageMsg.value.forEach(page => {
    page.isActive = false
    if ((path === page.url) || (name === page.url)) {
      hasPage = true
      page.isActive = true
    }
  })
  historyPageMsg.value.forEach(i => {
    i.isActive && (activeKey.value = i.url)
  })
  // 不是新的页面直接结束
  if (hasPage) {
    return
  }
  if (!isEmpty(params)) {
    // 如果有params参数，就都用name跳转
    currentRoute.type = 'name'
    currentRoute.url = name! as string
    currentRoute.urlParams = params
  } else if (!isEmpty(query)) {
    // 如果有query参数，就都用path跳转
    currentRoute.type = 'path'
    currentRoute.url = path
    currentRoute.urlParams = query
  } else {
    // 如果没有参数，直接使用path跳转
    currentRoute.type = 'path'
    currentRoute.url = path
    currentRoute.urlParams = {}
  }
  currentRoute.isActive = true
  currentRoute.title = meta.title || '未设置标题'
  activeKey.value = currentRoute.url
  historyPageMsg.value.push(currentRoute)

}, { immediate: true })

onMounted(() => {
  // localStorage.setItem('historyTab', JSON.stringify(historyPageMsg.value))

  /* 页面挂载好取出历史标签页 */
  localStorage.getItem('historyTab') && (historyPageMsg.value = JSON.parse(localStorage.getItem('historyTab')!))
})


// 刷新页面时存储历史标签信息防止刷新丢失
window.onbeforeunload = function() {
  localStorage.setItem('historyTab', JSON.stringify(historyPageMsg.value))
  // return '确定需要离开页面' // 加上这个可以拦截页面关闭，return 只要有返回就可以
}

/* 点开右键的标签的信息 */
let activeRightMsg = {} as HistoryPageMsg
const isShowTabMenu = ref<boolean>(false)
const tabMenuStyle = ref<CSSProperties>({})
type MenuItemText = '重新加载' | '关闭标签页' | '关闭左侧标签页' | '关闭右侧标签页' | '关闭其他标签页' | '关闭全部标签页'
// 标签菜单配置
const tabMenuContext = ref<{icon:string, text:MenuItemText,
isAble:boolean}[]>([
  {
    icon: '',
    text: '关闭标签页',
    isAble: false
  },
  {
    icon: '',
    text: '关闭左侧标签页',
    isAble: false
  },
  {
    icon: '',
    text: '关闭右侧标签页',
    isAble: false
  },
  {
    icon: '',
    text: '关闭其他标签页',
    isAble: false
  },
  {
    icon: '',
    text: '关闭全部标签页',
    isAble: false
  },
])

const clickTabMenuItem = (type: MenuItemText) => {
  switch (type) {

    case '关闭标签页':
      console.log('关闭标签页')
      onEdit(activeKey.value, 'remove')
      isShowTabMenu.value = false
      break
    case '关闭左侧标签页':
      closeBoth(activeRightMsg, 'left')
      console.log('关闭左侧标签页')
      isShowTabMenu.value = false
      break
    case '关闭右侧标签页':
      console.log('关闭右侧标签页')
      closeBoth(activeRightMsg, 'right')
      isShowTabMenu.value = false
      break
    case '关闭其他标签页':
      console.log('关闭其他标签页')
      closeOther(activeRightMsg)
      isShowTabMenu.value = false
      break
    case '关闭全部标签页':
      console.log('关闭全部标签页')
      closeAll()
      isShowTabMenu.value = false
      break
    default:
      console.log('默认执行')
  }

}
const clickTab = (e: Event, page:HistoryPageMsg, pageIndex:number) => {

  // 取消默认事件
  e.preventDefault()
  activeRightMsg = page
  isShowTabMenu.value = !isShowTabMenu.value
  tabMenuStyle.value = {
    position: 'absolute',
    top: `${e.clientY}px`,
    left: `${e.clientX}px`,
    zIndex: '9999999',
    padding: '10px',
  }
  tabMenuContext.value.forEach(i => {
    i.isAble = true
  })

  if (historyPageMsg.value.length === 1) {
    tabMenuContext.value.forEach(i => {
      i.isAble = false
    })
    return
  }
  if (historyPageMsg.value.length - 1 === pageIndex) {
    tabMenuContext.value.forEach(i => {
      (i.text === '关闭右侧标签页') && (i.isAble = false)
    })
    return
  }
  if (pageIndex === 0) {
    tabMenuContext.value.forEach(i => {
      (i.text === '关闭左侧标签页') && (i.isAble = false)
    })

  }
}


const clickPage = (targetKey: string | MouseEvent, page:HistoryPageMsg) => {

  isUndefined(page) && historyPageMsg.value.forEach(i => {
    if (i.url === targetKey) {
      page = i
    }
  })
  activeKey.value = page.url

  // 没有参数直接path跳转
  if (isEmpty(page.urlParams)) {
    router.push(page.url)
    return
  }
  // 如果有路由参数并且使用的是path跳转
  if (!isEmpty(page.urlParams) && page.type === 'path') {
    // 使用query传参
    router.push({
      path: page.url,
      query: page.urlParams
    })
  }
  // 如果有路由参数并且使用的是name跳转
  if (!isEmpty(page.urlParams) && page.type === 'name') {
    // 使用params传参
    router.push({
      name: page.url,
      params: page.urlParams
    })
  }

}

const closeBoth = (page:HistoryPageMsg, type:'right' | 'left') => {
  historyPageMsg.value.forEach((pageItem: HistoryPageMsg, index) => {
    if (pageItem.url === page.url && type === 'right') {
      historyPageMsg.value = historyPageMsg.value.filter((pageItem:HistoryPageMsg, i) => i <= index)
    }
    if (pageItem.url === page.url && type === 'left') {
      historyPageMsg.value = historyPageMsg.value.filter((pageItem:HistoryPageMsg, i) => i >= index)
    }
  })

  /* 避免激活标签页被关掉还停留在之前的标签页 ,在右键选中标签不是激活时跳转路由*/
  if (!page.isActive && type === 'right') {
    clickPage(activeKey.value, historyPageMsg.value.at(-1)!)
  }
  if (!page.isActive && type === 'left') {
    clickPage(activeKey.value, historyPageMsg.value[0])
  }

}
const closeOther = (page: HistoryPageMsg) => {
  historyPageMsg.value = historyPageMsg.value.filter((pageItem: HistoryPageMsg, index) => pageItem.url === page.url)
  overflowHistoryPageMsg.value.length = 0
  clickPage(activeKey.value, historyPageMsg.value[0])
}
const closeAll = () => {
  historyPageMsg.value.length = 0
  overflowHistoryPageMsg.value.length = 0
  router.push('project-list')
}

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'remove') {
    let page = {} as HistoryPageMsg
    historyPageMsg.value.forEach(i => {
      if (i.url === targetKey) {
        page = i
      }
    })
    // 如果关闭的是当前页面且不是第一个页面-->去到上个页面否则去下个页面
    if (page.isActive) {
      historyPageMsg.value.forEach((pageItem: HistoryPageMsg, index) => {
        if ((pageItem.url === page.url) && index !== 0) {
        // 将找出来的索引的前一个页面激活并跳转
          clickPage(activeKey.value, historyPageMsg.value[index - 1])
        } else if ((pageItem.url === page.url) && index === 0) {
        // 将找出来的索引的下一个页面激活并跳转
          clickPage(activeKey.value, historyPageMsg.value[index + 1])
        }
      })
    }

    /*
  过滤出剩下的页面
  过滤条件:路由参数和跳转路径都不相等的页面过滤出来
  */
    historyPageMsg.value = historyPageMsg.value.filter((pageItem:HistoryPageMsg) => ((pageItem.urlParams !== page.urlParams) && (pageItem.url !== page.url)))
  } else {
    // add(targetKey as string)
  }
}
</script>