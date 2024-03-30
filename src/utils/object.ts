
import { cloneDeep } from 'lodash-es'

/**
 * 解析点拼接的字符串对象
 * @param dotStrObj 点拼接的字符串对象
 * @returns 将点操作符对象，转化后的对象
 */
export function parseDotStrObjToObj(dotStrObj: Recordable): Recordable {
  const resultObj = {}
  Object.keys(dotStrObj).forEach(key => {
    let keys = key.split('.')
    keys.reduce((resultObj, curValue, currentIndex) => {
      resultObj[curValue] = currentIndex === keys.length - 1 ? dotStrObj[key] : resultObj[curValue] || { }
      return resultObj[curValue]
    }, resultObj)
  })
  return resultObj
}

/**
 * 将普通对象扁平化，使用点符合拼接对象层级
 * @param targetObj 普通对象
 * @returns 扁平化后，由点操作符拼接的对象
 */
export function transformObjToDotStrObj(targetObj: Recordable): Recordable {
  targetObj = cloneDeep(targetObj)
  const resultObj = {}
  function transform(currentObj, preKeys) {
    Object.keys(currentObj).forEach(key => {
      if (Object.prototype.toString.call(currentObj[key]) !== '[object Object]') {
        resultObj[[...preKeys, key].join('.')] = currentObj[key]
      } else {
        transform(currentObj[key], [...preKeys, key])
      }
    })
  }
  transform(targetObj, [])
  return resultObj
}
