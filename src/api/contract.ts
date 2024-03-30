import { request } from '@/utils/request'

// 授权接口
const contractApi = {

  // 合同模板管理
  getContractTemplates: params => request.get('contract/contractTemplates/index', params),

  // 合同模板详情
  getContractTemplateDetail: params => request.get('contract/contractTemplates/show', params),

  // 新增合同模板
  addContractTemplate: params => request.post('contract/contractTemplates/store', params),

  // 合同模板编辑链接
  updateContractTemplate: id => request.get('contract/contractTemplates/editUrl', { id }),

  // 合同列表
  getContractList: params => request.get('contract/contracts/index', params),

  // 合同详情
  getContractDetail: params => request.get('contract/contracts/show', params),

  // 发起合同
  addContracts: params => request.post('contract/contracts/store', params),

  // 合同签署成员列表
  getContractSigners: params => request.get('contract/contractSigners/index', params),

  // 催签
  remindContract: params => request.get('contract/contractSigners/remind', params),

  // 合同签署成员列表
  revokeContract: params => request.get('contract/contractSigners/revoke', params),
}

export { contractApi }