export function setItem(key: string, value: any) {
  if (!value) {
    return false
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key: string): any {
  const v = localStorage.getItem(key)
  return v ? JSON.parse(v) : ''
}

export function removeItem(key: string) {
  localStorage.removeItem(key)
}

export function setSessionItem(key: string, value: any) {
  if (!value) {
    return false
  }
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function getSessionItem(key: string): any {
  const v = sessionStorage.getItem(key)
  return v ? JSON.parse(v) : ''
}

export function removeSessionItem(key: string) {
  sessionStorage.removeItem(key)
}


// 本地存储常量，比，避免各个数据的散落，直观知道有哪些 storage 存储值
export const STORAGE_KEY_TOKEN = 'gm_token' // 本地存储 接口 token 的名


// todo 待使用
export const USER_INFO_KEY = 'userInfo' // 本地存储用户信息的名
export const OPENID_KEY = 'openid' // 本地存储 openid 的名
export const SESSION_KEY = 'session_key' // 本地存储 session_key 的名
export const JOIN_INFO_KEY = 'joinInfo' // 本地存储 joinInfo 的名，用于公众号链接进来时的参数记录
export const APPLY_INFO_KEY = 'applyInfo' // 本地存储 applyInfo 的名，用于二礁码信息进来员工导入信息时的参数记录

export const ROUTER_CACHE_SELECTKEY = 'RouterSelectKeyCache' // 本地存储 menu菜单select Key，用于详情页刷新,激活菜单