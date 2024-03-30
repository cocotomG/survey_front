

import { request } from '@/utils/request'

// 分销活动
const mentalApi = {

  /** 获取心理测评套餐列表 */
  getMentalTetList: params => request.get('mental/mentalTests/index', params),

  // 套餐详情
  getMentalTestDetail: params => request.get('mental/mentalTests/show', params),

  // 新增套餐
  addMentalTest: params => request.post('mental/mentalTests/store', params),

  // 删除套餐
  delMentalTest: params => request.delete('mental/mentalTests/delete', params),

  // 更新套餐基本信息
  updateBasicInfo: params => request.put('mental/mentalTests/store', params),

  // 更新套餐问题
  updateMentalTestQuestion: params => request.put('mental/mentalQuestions/store', params),

  // 新增套餐问题(插入)
  insertMentalTestQuestion: params => request.post('mental/mentalQuestions/store', params),

  // 删除套餐问题
  delMentalTestQuestion: params => request.delete('mental/mentalQuestions/delete', params),

  // 获取问题报告列表
  getMentalTestReportsList: params => request.get('mental/mentalTestReports/index', params),

  // 获取下单列表
  getMentalAnswererList: params => request.get('mental/mentalAnswerers/index', params),

  // 下单统计
  getStatisticAnswerStatusCount: () => request.get('mental/mentalAnswerers/statisticAnswerStatusCount'),

  // 导出测评
  exportMentalTextReport: params => request.post('mental/mentalAnswerers/exportReport', params),

  // 套餐试题列表
  getMentalQuestionList: params => request.get('mental/mentalQuestions/index', params)
}

export { mentalApi }


