import { request } from '@/utils/request'
import { omit } from 'lodash-es'

// 后台管理系统账号
const adminApi = {

  /** 【】获取权限列表 */
  getAdmins: params => request.get('admin/admin_menu/index', params),


  // admin/admin_routes/routes
  // admin/admin_routes/store
  // admin/admin_routes/delete
  /** 【】新增账号 */
  addAdmin: params => request.post('admins', params),

  /** 【】删除账号 */
  // removeAdmin: params => request.post('admin/admin_role/delete', params),

  /** 【】更新账号 */
  updateAdmin: (id: number | string, params: Recordable<any>) => request.put(`admins/${id}`, omit(params, [id])),

}

export { adminApi }


