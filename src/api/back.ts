import { request } from '@/utils/request'
const backApi = {
  getBackList: params => request.get('order/backSystemOrders/index', params),
  reportAsZipList: params => request.get('order/backSystemPdfZipTasks/index', params),
  exportReport: params => request.get('order/backSystemOrders/batchDownloadPdf', params)


}

export { backApi }


