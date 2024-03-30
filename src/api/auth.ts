import { request } from '@/utils/request'

// 授权接口
const authApi = {

  /** 检查 token 是否过期 */
  checkToken: () => request.get('auth/checktoken', undefined, { withoutCheck: true }),

  /** 【】账号登录 */
  loginByAccount: (params: Recordable) => request.post('auth/login', params),

  /** 【】账号登录 */
  loginCaptchaPictureSrc: '/api/admin/captcha/api',

  /** 手机号登录 */
  loginByMobile: (params: Recordable) => request.post('login/mobile', params),

  /** 重置密码 */
  resetPassword: (params: Recordable) => request.post('/admin_users/information', params),

  /** 重置密码 */
  resetPayPassword: (params: Recordable) => request.post('payPassword/reset', params),

  /** 登出 */
  logout: () => request.get('auth/logout'),

  /** 获取用户信息 */
  getUserInfo: () => request.get('auth/info'),

  /** 获取手机验证码 */
  // getCaptcha: (params: Recordable) => request.post('/global/captcha/mobile', params),
  getCaptcha: () => request.get('/captcha'),
}

export { authApi }


