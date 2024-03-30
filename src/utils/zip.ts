import JSZip from 'jszip'
import { saveAs } from 'file-saver'


export function download(imageUrls, folderName = '下载') {
  const zip = new JSZip()
  const folder = zip.folder(folderName)
  const downloadTasks = imageUrls.map(imageUrl => fetch(imageUrl).then(imageContent => {
    const name = imageUrl.split('/')[imageUrl.split('/').length - 1]
    // 写入二进制内容文件
    folder?.file(name, imageContent.blob(), { binary: true })
  }))
  Promise.all(downloadTasks).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      // 写入本地
      saveAs(content, folderName)
    })
  })
}

// imageObj ==> {name:'',url: ''}
export function downloadForObj(imageObjs, folderName = '下载') {
  const zip = new JSZip()
  const folder = zip.folder(folderName)
  const downloadTasks = imageObjs.map(imageObj => fetch(imageObj.url).then(imageContent => {
    const name = imageObj.url.split('.')[imageObj.url.split('.').length - 1]
    // 写入二进制内容文件
    folder?.file(`${imageObj.name}.${name}`, imageContent.blob(), { binary: true })
  }))
  Promise.all(downloadTasks).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      // 写入本地
      saveAs(content, folderName)
    })
  })
}


export function downloadImg(imageUrl) {
  fetch(imageUrl).then(imageContent => {
    const name = imageUrl.split('/')[imageUrl.split('/').length - 1]
    // 写入二进制内容文件
    saveAs(imageContent, name)
  })
}
