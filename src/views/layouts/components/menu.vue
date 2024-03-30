<style lang="less" scoped>
:deep(.ant-menu-item-icon) {
  font-size: 16px;
}
</style>

<script lang="tsx">
import { defineComponent, ref, h, computed } from 'vue'
import { useRouter, RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
import BasicIcon from '@/components/icon/basic-icon.vue'
import { listenerRouteChange } from '@/mitt/route-listener'
import * as antIcons from '@ant-design/icons-vue'
import { camelCase, upperFirst } from 'lodash-es'
import { useUserStore } from '@/store'


export default defineComponent({
  emit: ['collapse'],
  components: { BasicIcon },
  setup() {
    const router = useRouter()
    const appRoute = computed(() => router.getRoutes().find(el => el.name === 'root') as RouteRecordNormalized)

    const userStore = useUserStore()


    // 获得菜单项配置
    const menuTree = computed(() => {
      const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children))
      copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => (a.meta.order || 0) - (b.meta.order || 0)) // 菜单优先级排序

      return copyRouter.filter(routeConfig => {

        // 版本模块特殊处理
        if (routeConfig.name === 'version') {
          if ((userStore.user?.mobile === '19802093029' || userStore.user?.userName === 'admin8')) {
            return true
          } else {
            return false
          }
        }

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

    // 监听路由变化，设置当前选中的菜单 key
    const selectedKey = ref<string[]>(['']) // 当前选中的菜单项名
    listenerRouteChange(newRoute => {
      if (!newRoute.meta.hideInMenu && newRoute.name) {
        selectedKey.value = [newRoute.name as string, ...(newRoute.meta.parentName || [])]
      }
    }, true)

    // 渲染子菜单
    const renderSubMenu = () => {


      function travel(routeConfigList: RouteRecordRaw[], nodes = []) {
        if (routeConfigList) {
          routeConfigList.forEach(routeConfig => {
            const UpperIcon = upperFirst(camelCase(routeConfig.meta?.icon))

            const r = routeConfig.children ? (
              <a-sub-menu
                key={routeConfig?.name}
                v-slots={{
                  icon: () => (routeConfig.meta?.iconfont ? h(BasicIcon, { name: routeConfig.meta.iconfont }) : h(antIcons[UpperIcon!])),
                  title: () => routeConfig.meta?.title || '',
                }}
              >
                {routeConfig?.children?.map(elem => (
                  <a-menu-item key={elem.name} onClick={() => router.push({ name: elem.name })}>
                    { }
                    {elem.meta?.title || ''}
                    {travel(elem.children ?? [])}
                  </a-menu-item>
                ))}
              </a-sub-menu>
            ) : (
              <a-menu-item
                key={routeConfig.name}
                onClick={() => {

                  router.push({ name: routeConfig.name })
                }}
                v-slots={{
                  icon: () => (routeConfig.meta?.iconfont ? h(BasicIcon, { name: routeConfig.meta.iconfont }) : h(antIcons[UpperIcon!])),
                }}
              >
                {routeConfig.meta?.title}
              </a-menu-item>
            )
            nodes.push(r as never)
          })
        }
        return nodes
      }
      return travel(menuTree.value)
    }

    return () => (
      <div style="height: calc(100% - 58px)">
        <a-menu
          selected-keys={selectedKey.value}
          open-keys={selectedKey.value}
          style="height: 100%; overflow: auto;"
          mode="inline"
          theme="dark"
        >
          {renderSubMenu()}
        </a-menu>
      </div>
    )
  },
})
</script>