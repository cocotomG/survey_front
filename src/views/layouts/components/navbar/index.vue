<style scoped lang="less">
.left-size {
  display: flex;
}

.logo {
  img {
    height: 24px;
    width: 120px;
  }
}

// 用户hover背景色
.actions > :last-child :hover {
  background-color: rgb(255 255 255 / 20%);
}

.actions {
  align-items: center;
}

</style>

<template>
  <div class="flex items-center justify-between flex-1 w-full h-full mx-2">
    <div class="flex">
      <!-- <basicDrawer
        v-bind="helpCenterProps"
        v-model:visible="isShowHelpCenter"
      >
        <helpCenter @change="open" />
      </basicDrawer>
      <basicDrawer
        v-bind="messageCenterProps"
        v-model:visible="isShowMessage"
      >
        <MesssageCenter />
      </basicDrawer> -->
    </div>
    <div class="flex actions">
      <!-- <BasicIcon
        name="icon-notifications_black_24dp"
        class="mt-2 text-2xl text-white cursor-pointer"
        @click=" isShowMessage = true"
      /> -->
      <!-- <BasicIcon
        name="icon-help_outline_black_24dp "
        class="mx-2 mt-2 text-2xl cursor-pointer"
        @click="isShowHelpCenter = true"
      /> -->
      <div>
        <user-setting />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicIcon from '@/components/icon/basic-icon.vue'
import basicDrawer from '@/components/drawer/basic-drawer.vue'
import { nameToRouterConfigMap } from '@/router'
import UserSetting from './user-setting.vue'
import { listenerRouteChange } from '@/mitt/route-listener'
import { useRouter, onBeforeRouteUpdate, RouteRecordNormalized } from 'vue-router'
import { useUserStore } from '@/store'
import helpCenter from '@/views/drawer/help-center.vue'
import { BasicDrawerProps } from '@/components/drawer/props'
import MesssageCenter from '@/views/drawer/messsage-center.vue'
import dayjs from 'dayjs'
const userStore = useUserStore()
const appRoute = computed(() => router.getRoutes().find(el => el.name === 'root') as RouteRecordNormalized)
const isShowHelpCenter = ref<boolean>(false)
const updataTime = ref<string>()
const helpCenterProps = ref<BasicDrawerProps>({
  title: '帮助中心',
  destroyOnClose: true,
  width: 820,
})
const messageCenterProps = ref<BasicDrawerProps>({
  title: '通知中心',
  destroyOnClose: true,
  width: 820,
})

let open = mess => {
  updataTime.value = dayjs(mess).format('YYYY-MM-DD')
  helpCenterProps.value.slug = `更新时间: ${updataTime.value}`
}

// 因为 vue-router 内部使用 Provide 将 router 对象注入到 vue 实例中，useRouter 需要使用 inject 获取 router 实例
// 而 inject 需要用在 setup 顶层，
const router = useRouter()
const parentPath = ref<Recordable[]>([])
const currentRouteTitle = ref()
const isShowMessage = ref<boolean>(false)
function updateBreadcrumb(to) {
  parentPath.value = []
  const currentRoute = unref(to || router?.currentRoute)
  const currentRouteName = currentRoute.name as string
  currentRouteTitle.value = currentRoute.meta.title
  let currentRouteConfig = nameToRouterConfigMap[currentRouteName]

  while (currentRouteConfig.meta.parentNameForBreadcrumb) {
    currentRouteConfig
      = nameToRouterConfigMap[currentRouteConfig.meta.parentNameForBreadcrumb]
    parentPath.value.unshift(currentRouteConfig)
  }
}
// 监听路由变化，设置当前选中的菜单 key
const selectedKey = ref<string[]>(['']) // 当前选中的菜单项名
listenerRouteChange(newRoute => {
  if (!newRoute.meta.hideInMenu && newRoute.name) {
    selectedKey.value = [newRoute.name as string, ...(newRoute.meta.parentName || [])]
  } else if (newRoute.meta.actionRouterName) {
    selectedKey.value = [newRoute.meta.actionRouterName as string, ...(newRoute.meta.parentName || [])]
  }
}, true)

// 获得菜单项配置
const menuTree = computed(() => {
  const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children))
  copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => (a.meta.order || 0) - (b.meta.order || 0)) // 菜单优先级排序

  return copyRouter.filter(routeConfig => {

    // 整个模块的路由都无权限
    if (!userStore.hasPermission(routeConfig.meta?.requiredPermission)) {
      return null
    }

    // 无子路由，则证明当前是具体路由的菜单，直接返回
    if (!routeConfig.children) {
      return routeConfig
    }

    // 有子路由，证明该 config 为折叠菜单，而非具体路由菜单，需要寻找其子有效路由
    const subRouteConfigs = routeConfig.children.filter(subRouteConfig => subRouteConfig.meta?.hideInMenu !== true && userStore.hasPermission(subRouteConfig.meta?.requiredPermission))
    if (subRouteConfigs.length) {
      routeConfig.children = subRouteConfigs
      return routeConfig
    }

    return null
  }) // 去除假值简写方式，等价于 a.filter(function (x) { return Boolean(x); });

})


onBeforeRouteUpdate(to => {
  updateBreadcrumb(to)
})
updateBreadcrumb(null)


</script>
