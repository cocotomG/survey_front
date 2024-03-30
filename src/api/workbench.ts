import { request } from '@/utils/request'

// 工作台
const workbenchApi = {
  getWorkbenchInfo: () => request.get('/index/statistic'),
  getBackSurveyList: params => request.get('/index/backSurveyStatistic', params)
}

export { workbenchApi }


