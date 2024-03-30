<template>
  <div
    class="m-4"
    style="min-width: 1000px;"
  >
    <!-- <historyPage> -->
    <a-breadcrumb
      v-if="parentPath.length == 1"
      class="mb-1"
    >
      <a-breadcrumb-item
        v-for="routeConfig in parentPath"
        :key="routeConfig.name"
      >
        <router-link :to="{ name: routeConfig.name }">
          {{ routeConfig.meta.title }}
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ currentRouteTitle }}</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- </historyPage> -->

    <router-view :key="routerViewKey" />
  </div>
</template>
<script setup lang="ts">
import { emitter, FORCE_REFRESH_ROUTE } from '@/mitt/global-event'
import { nameToRouterConfigMap } from '@/router'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import historyPage from './navbar/history-page.vue'
const routerViewKey = ref(new Date().getTime())

// 监听路由强制刷新事件，为路由 key 重新赋值，触发组件的重新渲染
emitter.on(FORCE_REFRESH_ROUTE, () => {
  // 因为 route 变更在下一个宏任务中才能完成，无法通过 await nextTick 推迟微任务监听到，故使用 setTimeout 之后再进行刷新
  setTimeout(() => {
    routerViewKey.value = new Date().getTime()
  })
})


// 因为 vue-router 内部使用 Provide 将 router 对象注入到 vue 实例中，useRouter 需要使用 inject 获取 router 实例
// 而 inject 需要用在 setup 顶层，
const router = useRouter()
const parentPath = ref<Recordable[]>([])
const currentRouteTitle = ref()


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

onBeforeRouteUpdate(to => {
  updateBreadcrumb(to)
})
updateBreadcrumb(null)

</script>