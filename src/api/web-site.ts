import { request } from '@/utils/request'

const webSiteApi = {
  contractUs: params => request.get('intendedToCustomer', params),
}
export { webSiteApi }