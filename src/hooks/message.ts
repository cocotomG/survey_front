import { message } from 'ant-design-vue'

const duration = 2
let loadingCallback

export const useMessage = {
  success(content = '操作成功') { // 成功提示
    message.open({
      content,
      duration,
      type: 'success'
    })
  },

  // 普通提示，蓝色 icon
  info(content) {
    message.open({
      content,
      duration,
      type: 'info'
    })
  },

  // 普通警告，黄色 icon
  warn(content) {
    message.open({
      content,
      duration,
      type: 'warning'
    })
  },

  // 失败提示
  error(content = '操作失败') {
    message.open({
      content,
      duration,
      type: 'error'
    })
  },

  // 加载提示
  loading(content = '加载中...') {
    loadingCallback = message.open({
      content,
      duration: 0,
      key: 'loading',
      type: 'loading'
    })
  },
  hideLoading() { // 隐藏加载提示
    loadingCallback && loadingCallback()
    loadingCallback = null
  },
  close() {
    return message.destroy()
  },
}
