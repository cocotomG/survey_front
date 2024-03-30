// import { unref, onMounted, Ref } from 'vue'
// import * as echarts from 'echarts'
// import type { EChartsOption } from 'echarts'

// export function useECharts(elRef: Ref<HTMLDivElement>) {
//   let chartInstance: echarts.ECharts | null = null
//   onMounted(() => {
//     initCharts()

//     if (elRef.value) {
//       elRef.value.style.width = `${elRef.value.offsetWidth}px`
//     }
//   })

//   function initCharts() {
//     const el = unref(elRef)
//     if (!el || !unref(el)) {
//       return
//     }

//     chartInstance = echarts.init(el)
//     setTimeout(() => {
//       chartInstance?.resize()
//     })
//   }

//   function setOptions(options: EChartsOption) {
//     chartInstance?.setOption(options)
//   }

//   function getInstance(): echarts.ECharts | null {
//     if (!chartInstance) {
//       initCharts()
//     }
//     return chartInstance
//   }

//   return {
//     setOptions,
//     getInstance,
//   }
// }
import { unref, onMounted, Ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

export function useECharts(elRef: Ref<HTMLDivElement | undefined>) {
  let chartInstance: echarts.ECharts | null = null
  onMounted(() => {
    initCharts()

    if (elRef.value) {
      elRef.value.style.width = `${elRef.value.offsetWidth}px`
    }
  })

  function initCharts() {
    console.log('initCharts', 'set')
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el)
    setTimeout(() => {
      chartInstance?.resize()
    })
  }

  function setOptions(options: EChartsOption) {
    chartInstance?.clear()
    chartInstance?.setOption(options)
  }

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  return {
    setOptions,
    getInstance,
  }
}
