import { useAppStore } from './app'
import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'
import { menuApi } from '@/api/system'
import { ProjectCode, reLoginTips, HttpCode } from '@/utils/request'
import {
  setItem,
  getItem,
  removeItem,
  STORAGE_KEY_TOKEN,
} from '@/utils/storage'
import { router } from '@/router'

interface UserState {

  /** 接口调用权限 */
  token: string | null;

  /** 用户信息 */
  user: Model.User | null;

  /** 所属商户详细信息 */
  group: Model.Group | null;

  /** 所有用户能访问的路由 */
  flatRoutes: string[];

}

export const useUserStore = defineStore('User', {
  state: (): UserState => ({
    token: getItem(STORAGE_KEY_TOKEN),
    user: null,
    group: null,
    flatRoutes: [],
  }),

  getters: {
    // 是否登录
    isLogin(): boolean {
      return !!this.token
    },

    // 获取权限
    permissions(state): Permission[] {
      // 后端权限值为小写，前端权限使用大写作为常量，故需要将用户的权限值转化为大写
      return (
        this.flatRoutes.map(permission => permission.toUpperCase() as Permission) || []
        // []
      )
    },
  },
  actions: {
    // 登录
    async loginSuccess(token: string) {
      setItem(STORAGE_KEY_TOKEN, token)
      this.token = token
      await this.afterLogin()
    },

    // 登录后的处理逻辑，统一获得 token 后需要操作的事情，token 有效期间，重新进入系统获取全局配置
    async afterLogin() {
      let result = await authApi.checkToken()
      if (result.code === HttpCode.TokenExpired) {
        reLoginTips()
      } else {
        await Promise.all([
          this.getUserInfo(), // 获取用户信息及全局配置
          // this.getMenuList(), // 获取菜单列表
          useAppStore().refreshReference(),
        ])
      }

    },

    // 获取用户信息
    async getUserInfo() {
      const res = await authApi.getUserInfo()
      console.log(res, 1);

      this.user = res.user
      // this.user = res.admin
      // this.group = res.group
    },

    // 获取菜单列表
    async getMenuList() {
      const result = await menuApi.getUserMenuList({})
      let list: string[] = []
      funRouteSub(result, list)
      this.flatRoutes = list
    },


    // 登出
    async logout(requestApi?: boolean, refererPath?: string) {
      requestApi && (await authApi.logout())
      this.token = null
      removeItem(STORAGE_KEY_TOKEN)
      router.replace({
        name: 'login',
        query: {
          refererUrl: refererPath ? encodeURIComponent(refererPath) : '',
        },
      })
    },

    hasPermission(requirePermission: Permission | undefined): boolean {
      if (requirePermission === undefined || this.permissions.includes('ALL')) {
        return true
      }
      return this.permissions.includes(requirePermission)
    },
  },
})

function funRouteSub(arr, res) {
  arr.forEach(item => {
    let tmp = item.path
    res.push(tmp)
    if (item.children) {
      funRouteSub(item.children, res)
    }
  })
}