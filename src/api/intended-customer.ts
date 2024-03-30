

import { request } from '@/utils/request'


const intendedCustomerApi = {

  getCustomerList: params => request.get('company/intendedCustomers/index', params),
  updateStatus: (id, params) => request.put('company/intendedCustomers/store', {
    id,
    ...params
  })


}

export { intendedCustomerApi }


