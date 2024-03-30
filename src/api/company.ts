

import { request } from '@/utils/request'

// 企业
const companyApi = {

  /** 【】获取企业列表 */
  getCompanyList: params => request.get('company/companies/index', params),

  /** 【】新增企业 */
  addCompany: params => request.post('acompany/companies/store', params),

  /** 【】更新企业 */
  updateCompany: (id, params) => request.put('company/companies/store', {
    ...params,
    id
  }),

  /** 【】企业审批通过 */
  pass: params => request.post('company/companies/pass', params),

  /** 【】企业审批拒绝 */
  reject: params => request.post('company/companies/reject', params),

  /* 【】创建账户 */
  creatAccount: params => request.post('company/companies/paymentAccount', params)
}

export { companyApi }


