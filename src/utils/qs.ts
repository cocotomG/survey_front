
/**
 * 获取URL中的文件名
 * @param {string} url 数据源的URL
 * @returns {string} 解析后的文件名
 */
export function getFileName(url = '') {
  const lastPath = url.split('/').pop() as string
  const fileName = lastPath.split('?')[0]
  return fileName
}

/**
 * 获取URL中的文件后缀
 * @param {string} url 数据源的URL
 * @returns {string} 解析后的文件后缀
 */
export function getSuffix(url = '') {
  const lastPath = url.split('/').pop() as string
  const fileName = lastPath.split('?')[0]
  const suffix = fileName.split('.').pop() as string
  return suffix
}

