import { request } from '@/utils/request'

/** 通用接口 */
const globalApi = {

  /** 获取枚举类型 */
  getReference: () => request.get('/reference'),

  /** 获取选择器候选项 */
  getSelectorOptions: params => request.get('global/selector', params),


}

export { globalApi }

