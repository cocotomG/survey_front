import { request } from '@/utils/request'


const packageApi = {

  // 背调套餐列表
  getBackPackList: params => request.get('good/companyGoods/index', params),

  /* 修改套餐 */
  updateBackPack: (id, params) => request.put('good/companyGoods/store', {
    id,
    ...params
  })
}

export {
  packageApi
}