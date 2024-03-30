const cacheTime = 2 * 1000 // 缓存时间
const apiCache: {
  [p: string]: {
    createTime: number,
    apiPromise: Promise<any>
  }
} = {}

// 过滤过期的 api 缓存
function filterExpiredCache() {
  const currentTime = new Date().getTime()
  Object.keys(apiCache).forEach(apiKey => {
    if (currentTime - apiCache[apiKey].createTime > cacheTime) {
      delete apiCache[apiKey]
    }
  })
}

export function getCacheApi(api:Fn, params:Recordable):Promise<any> {
  filterExpiredCache()
  const apiKey = api.toString() + JSON.stringify(params)
  if (!apiCache[apiKey]) {
    apiCache[apiKey] = {
      createTime: new Date().getTime(),
      apiPromise: api(params)
    }
  }
  return apiCache[apiKey].apiPromise
}