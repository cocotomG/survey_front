
import validator from 'validator'
import axios from 'axios'
import { getSuffix } from './qs'
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!validator.isURL(url)) {
      resolve(url)
      return
    }
    let canvas = document.createElement('CANVAS') as HTMLCanvasElement | null
    const ctx = canvas!.getContext('2d')

    const img = new Image()
    img.crossOrigin = ''
    img.onload = function() {
      if (!canvas || !ctx) {
        return reject()
      }
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}

export const getFileSize = (value: number) => {
  if (!value) {
    return '0 Bytes'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcSize = parseFloat(value.toString())
  index = Math.floor(Math.log(srcSize) / Math.log(1024))
  const size = srcSize / Math.pow(1024, index)
  const rs = size.toFixed(2) // 保留的小数位数
  return rs + unitArr[index]
}


/**
 * 异步文件下载
 * @getListApiParams {string} url 获取文件对应的URL
 * @getListApiParams {object} params 接口携带参数
 * @getListApiParams {string} fileName 文件名
 * @getListApiParams {string} fileType 文件类型
 */
export function downloadFile(url, params = {}, fileName, fileType) {
  params = Object.assign({}, params)

  axios({
    url,
    params,
    method: 'get',
    responseType: 'blob',
  }).then(res => {
    const fileBlob = new Blob([res.data]) // 创建一个Blob对象
    const a = document.createElement('a')
    a.download = `${fileName}.${fileType}`
    a.href = URL.createObjectURL(fileBlob)
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  })
}

// 相关资源 https://juejin.cn/post/6844903561017425927
export function previewFromUrl(fileUrl: string) {
  function isWordExcelOrPPT(url) {
    // https://zhidao.baidu.com/question/561340173.html
    const keySuffixes = [
      'doc',
      'docx',
      'docm',
      'dotx',
      'dotm',
      'xls',
      'xlsx',
      'xlsm',
      'xltx',
      'xltm',
      'xlsb',
      'xlam',
      'ppt',
      'pptx',
      'pptm',
      'ppsx',
      'ppsm',
      'potx',
      'potm',
      'ppam',
    ]
    const fileSuffix = getSuffix(url)
    return keySuffixes.includes(fileSuffix)
  }

  if (isWordExcelOrPPT(fileUrl)) {
    return window.open(`https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`)
  }
  return window.open(fileUrl)
}