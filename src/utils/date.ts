import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
const DATE_FORMAT = 'YYYY-MM-DD'
const MONTH_FORMAT = 'YYYY-MM'

export function formatToDateTime(date: dayjs.ConfigType = undefined, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatToMonth(date: dayjs.ConfigType = undefined, format = MONTH_FORMAT): string {
  return dayjs(date).format(format)
}

export function dateFromNow(date: string) {
  return dayjs(date).fromNow()
}


export const dateUtil = dayjs
