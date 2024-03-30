<style lang="less">
// .ant-card-body {
//   padding: 10px;
// }
</style>
<template>
  <div class="min-w-[1250px]">
    <div class="bg-white w-full h-[180px] flex rounded-md">
      <div class="flex items-center w-2/6">
        <img src="@/assets/images/pack.png" class="w-[104px] h-[104px] mr-[32px] ml-[38px]">
        <div>
          <p class="text-[20px] font-semibold m-0">
            欢迎登录yukces
          </p>
          <span v-if="user" class="text-[30px] font-bold">{{ user?.name || '--' }}</span>
        </div>
      </div>
      <div v-if="workbenchInfo" class="flex items-center justify-around w-4/6">
        <div class="flex duration-300 cale-110">
          <div class="flex items-center justify-center w-24 h-24 bg-orange-200 rounded-3xl">
            <basic-icon name="icon-copper-coin-line" class="text-5xl text-orange-400" />
          </div>
          <div class="flex flex-col justify-around ml-4 font-bold">
            <p class="text-[24px] font-bold m-0">
              {{ workbenchInfo.totalOutAmount }}
            </p>
            <p class="m-0 text-[16px]">
              总充值金额 (元)
            </p>
          </div>
        </div>
        <div class="flex duration-300 hover:scale-110">
          <div class="flex items-center justify-center w-24 h-24 bg-blue-200 rounded-3xl">
            <basic-icon name="icon-calendar-check-line" class="text-5xl text-blue-400" />
          </div>
          <div class="flex flex-col justify-around ml-4 font-bold">
            <p class="text-[24px] m-0">
              {{ workbenchInfo.companyBackSurveyCount }}
            </p>
            <p class="m-0 text-[16px]">
              ces次数 (公司)
            </p>
          </div>
        </div>
        <div class="flex duration-300 hover:scale-110">
          <div class="flex items-center justify-center w-24 h-24 bg-[#c7f789] rounded-3xl">
            <basic-icon name="icon-todo-line" class="text-5xl text-green-400" />
          </div>
          <div class="flex flex-col justify-around ml-4 font-bold">
            <p class="text-[24px] m-0">
              {{ workbenchInfo.personBackSurveyCount }}
            </p>
            <p class="m-0 text-[16px]">
              ces次数 (个人)
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="grid w-full grid-cols-6 gap-4 mt-5">
      <a-card class="h-[400px] col-span-3 rounded-xl">
        <div class="font-bold text-[16px]">
          客户消费占比
        </div>
        <div ref="pieStatisticRef" class="w-full h-[350px]" />
      </a-card>
      <a-card class="h-[400px] col-span-3 rounded-xl">
        <div class="font-bold text-[16px]">
          ces次数
        </div>
        <div ref="lineStatisticRef" class="w-full h-[350px]" />
      </a-card>
    </div>
    <div class="w-full mt-5">
      <a-card class="h-[500px] col-span-3 rounded-xl">
        <div>
          <div class="flex justify-between">
            <div class="font-bold text-[16px]">
              {{ barType ? '近12个月充值金额 (元)' : '近12个月ces次数' }}
            </div>
            <a-select :default-value="0" class="mr-40 w-[150px]" :options="options" @change="changeBar" />
          </div>
          <div ref="barEchartRef" class="w-full h-[400px]" />
        </div>
      </a-card>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { workbenchApi } from '@/api/workbench'
import { useECharts } from '@/hooks/echarts'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { useUserStore, useAppStore } from '@/store'
import type { SelectProps } from 'ant-design-vue'
import { EChartsOption } from 'echarts'
const { getReferenceItems } = useAppStore()
const backSystemStatisticTypeEnum = getReferenceItems('backSystemStatisticTypeEnum')
const { user } = useUserStore()
const options = ref<SelectProps['options']>([])
const barType = ref(0)
const workbenchInfo = ref()
const backSurveyInfo = ref()
const pieStatisticRef = ref<HTMLDivElement>()
const lineStatisticRef = ref<HTMLDivElement>()
const barEchartRef = ref<HTMLDivElement>()
const echartsPieRef = useECharts(pieStatisticRef)
const echartsLineRef = useECharts(lineStatisticRef)
const echartsBarRef = useECharts(barEchartRef)
const getWorkBenchInfo = async () => {
  workbenchInfo.value = await workbenchApi.getWorkbenchInfo()
  backSurveyInfo.value = await workbenchApi.getBackSurveyList({ type: backSystemStatisticTypeEnum[barType.value].value })
  // pie
  echartsPieRef.setOptions({
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}元',
      enterable: true,
    },
    legend: {
      show: true,
      type: 'scroll',
      top: 'center',
      left: '43%',
      right: 'center',
      orient: 'vertical',
      icon: 'circle',
      formatter(name) {
        let item = workbenchInfo.value?.outStatisticList.find(v => v.name == name)
        return `{a|${item.name}}  {b|${item.percent}%} ￥{c|${item.totalAmount}}`
      },
      textStyle: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        rich: {
          a: {
            width: 190,
          },
          b: {
            width: 60,
          }
        },
      },
    },
    title: [
      {
        text: `${workbenchInfo.value.totalOutAmount}`,
        top: '42%',
        left: '21%',
        subtext: '销售额(元)',
        textAlign: 'center',
        subtextStyle: {
          fontSize: 13,
        },
        textStyle: {
          fontSize: 25
        }
      }
    ],
    series: [
      {
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 5
        },
        label: {
          show: false,
        },
        radius: ['65%', '50%'],
        center: ['22%', '50%'],
        data: workbenchInfo.value?.outStatisticList.map(v => ({
          value: v.totalAmount,
          name: v.name,
        })),
        type: 'pie',
      }
    ]
  })
  // line
  echartsLineRef.setOptions({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}次',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: workbenchInfo.value?.backSystemOrderCount.map(v => v.monthAt),
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        data: workbenchInfo.value?.backSystemOrderCount.map(v => v.totalCount),
        type: 'line',
        smooth: true,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(10, 221, 242, 0.8)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(10, 221, 242,0.2)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
      }
    ]
  })
  resetBar()
}
const changeBar = async v => {
  barType.value = v
  backSurveyInfo.value = await workbenchApi.getBackSurveyList({ type: backSystemStatisticTypeEnum[v].value })
  resetBar()
}
const resetBar = () => {
  let barOption: EChartsOption = {}
  if (barType.value === 0) {
    barOption = {
      legend: {
        formatter(name) {
          return `${name}次数`
        },
        icon: 'circle'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: backSurveyInfo.value.map(v => `${v.monthAt}`),
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        }
      ],
      series: [
        {
          name: '公司',
          type: 'bar',
          color: '#448EF5',
          data: backSurveyInfo.value.map(v => `${v.company}`),
          label: {
            show: true,
            position: 'top'
          },
        },
        {
          name: '个人',
          type: 'bar',
          color: '#FDB44B',
          data: backSurveyInfo.value.map(v => `${v.person}`),
          label: {
            show: true,
            position: 'top',
          },
        }
      ]
    }
  } else if (barType.value === 1) {
    barOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        icon: 'circle'
      },
      xAxis: [
        {
          type: 'category',
          data: backSurveyInfo.value.map(v => `${v.monthAt}`),
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        }
      ],
      series: [
        {
          name: '公司',
          type: 'bar',
          color: '#448EF5',
          data: backSurveyInfo.value.map(v => `${v.company}`),
          label: {
            show: true,
            position: 'top'
          },
        },
        {
          name: '个人',
          type: 'bar',
          color: '#FDB44B',
          data: backSurveyInfo.value.map(v => `${v.person}`),
          label: {
            show: true,
            position: 'top'
          },
        }
      ]
    }
  }
  echartsBarRef.setOptions(barOption)
}
// 获取枚举赋值选择框
const getBackReference = () => {
  backSystemStatisticTypeEnum.forEach((v, index) => {
    options.value?.push({
      value: index,
      label: v.label,
    })
  })
}
getWorkBenchInfo()
getBackReference()

// 调整图表大小
window.onresize = debounce(() => {
  echartsPieRef.getInstance()?.resize({
    width: pieStatisticRef.value?.offsetWidth,
    height: pieStatisticRef.value?.offsetHeight
  })
  echartsLineRef.getInstance()?.resize({
    width: lineStatisticRef.value?.offsetWidth,
    height: lineStatisticRef.value?.offsetHeight
  })
  echartsBarRef.getInstance()?.resize({
    width: barEchartRef.value?.offsetWidth,
    height: barEchartRef.value?.offsetHeight
  })

}, 100)
</script>