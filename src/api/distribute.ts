

import { request } from '@/utils/request'

// 分销活动
const distributeApi = {

  /** 获取活动列表 */
  getActivityList: params => request.get('distribute/distributeActivities/index', params),

  /** 新增活动 */
  addActivity: params => request.post('distribute/distributeActivities/store', params),

  /** 编辑活动 */
  updateActivity: (params: Recordable<any>, id) => request.put(`distribute/distributeActivities/update/${id}`, params),

  /** 获取活动详情 */
  getActivityDetail: id => request.get(`distribute/distributeActivities/detail/${id}`),

  // 海报列表
  getPosterList: params => request.get('distribute/distributePosters/index', params),

  // 添加海报
  addPoster: params => request.post('distribute/distributePosters/store', params),

  // 编辑海报
  updatePoster: (params, id) => request.put(`distribute/distributePosters/update/${id}`, params),

  /** 获取海报详情 */
  getPosterDetail: id => request.put(`distribute/distributePosters/detail/${id}`),

  // 分销管理列表
  getDistributeList: params => request.get('distribute/distributors/index', params),

  // 分销订单
  getDistributeOrderList: params => request.get('/distribute/distributionOrders/index', params),

  // 活动体现
  getOrderWithdrawalFlowFlowList: params => request.get('/distribute/distributionOrdersWithdrawalFlow/index', params),

  // 新增提现流水
  addOrderWithdrawal: params => request.get('/distribute/distributionOrders/orderWithdrawal', params)
}

export { distributeApi }


