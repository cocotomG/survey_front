import { request } from '@/utils/request'

/** 用户接口 */
const userApi = {
  // 添加用户
  addUser: params => request.post('users', params),

}

export { userApi }