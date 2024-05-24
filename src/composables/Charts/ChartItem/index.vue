<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import chartJson from './chart'
import echarts from '@/plugins/chart'
import 'echarts-liquidfill'
import 'echarts-wordcloud'

const props = withDefaults(defineProps<Props>(), {
  isAxial: false,
  isXAxisLine: true,
  isYAxisLine: true,
  isLabel: false,
  isLegend: true,
  tapLegend: true,
  isZoom: false,
  isAxisLabel: true,
  yAxisIndex: false,
  isXZoom: false,
  isYZoom: false,
  inverse: false,
  isConfigWatch: false,
  isTypeWatch: false,
  isStack: false,
  valueSpan: 4,
  xUnit: '',
  yUnit: '',
  labelUnit: '',
  isXSplitLine: false,
  xLabelUnit: '',
  defaultName: '暂无数据',
  yAxisIndexUnit: '%',
  gradientDirection: 'bottom',
  isAreaStyle: false,
  configOption: () => {
    return {}
  },
  colors: () => [],
  dataset: () => {
    return {
      dimensions: [],
      source: [],
    }
  },
  typeData: () => [] || {},
  padding: () => ['40', '20', '20', '15'],
})

const emit = defineEmits<{
  (e: 'clickChartData', data: any): void
  (e: 'mouseoverData', data: any): void
  (e: 'mouseoutData', data: any): void
}>()

let myChart: any
const $eChart = ref()
const myRefChar = ref<any>(null)
interface typeData {
  type: string
  [index: string]: any
}
interface datasetType {
  dimensions?: string[]
  source: any[]
}

interface Props {
  typeData?: Array<typeData> | { type: string, data: any }
  dataset?: datasetType | Array<datasetType | any>
  colors?: any
  padding?: Array<string>
  xUnit?: string
  yUnit?: string
  labelUnit?: string
  configOption?: any
  isAxial?: boolean
  isXAxisLine?: boolean
  isAxisLabel?: boolean
  isLabel?: boolean
  isLegend?: boolean
  tapLegend?: boolean
  isXZoom?: boolean
  isYZoom?: boolean
  yAxisIndex?: boolean
  isXSplitLine?: boolean
  inverse?: boolean
  isConfigWatch?: boolean
  isTypeWatch?: boolean
  valueSpan?: number
  xLabelUnit?: string
  yAxisIndexUnit?: string
  defaultName?: string
  isStack?: boolean
  gradientDirection: string
  isAreaStyle: boolean
}

function isGraph(typeData: any) {
  return Array.isArray(typeData) ? typeData[0]?.type === 'graph' : typeData.type === 'graph'
}

const series = computed(() => {
  const series: any = []

  const typeData = Array.isArray(props.typeData) ? props.typeData : [props.typeData]
  typeData.forEach((item: any, i: number) => {
    const gradientColor = {
      type: 'linear',
      x: props.gradientDirection === 'left' ? 1 : 0,
      y: props.gradientDirection === 'top' ? 1 : 0,
      x2: props.gradientDirection === 'right' ? 1 : 0,
      y2: props.gradientDirection === 'bottom' ? 1 : 0,
      colorStops:
                Array.isArray(props.colors[i])
                && props.colors?.[i]?.map((item: any, index: number) => {
                  return {
                    offset: index / (props.colors[i].length - 1),
                    color: item,
                  }
                }),

      global: false,
    }

    series.push({
      label: {
        show: props.isLabel,
        formatter: (params: any) => {
          if (props.isAxial)
            return params.value[params?.encode?.x?.[0]] + props.labelUnit

          return params?.value?.[params?.encode?.y?.[0]] + props.labelUnit
        },
        position: props.isAxial ? 'insideLeft' : 'insideTop',
      },
      itemStyle: {
        color: Array.isArray(props.colors[i]) ? gradientColor : props.colors[i],
      },
      areaStyle: Array.isArray(props.colors[i]) && props.isAreaStyle ? gradientColor || {} : null,

      ...item,
      id: `Score${i}`,
      stack: item.stack ? item.stack : props.isStack ? '1' : '',
      universalTransition: true,
      animationDurationUpdate: 1000,
    })
  })

  return series
})

const isTirggerType = computed(() => {
  const type = Array.isArray(props.typeData) ? props.typeData[0]?.type : props.typeData.type

  return ['pie', 'sunburst', 'treemap', 'radar', undefined].includes(type) ? 'item' : 'axis'
})
const isNoData = computed(() => {
  const data = (Array.isArray(props.typeData) ? props.typeData?.[0]?.data : props.typeData?.data) ?? []
  const seriesData = (Array.isArray(props.configOption.series) ? props.configOption.series?.[0]?.data : props.configOption.series?.data) ?? []
  const source = (Array.isArray(props.dataset) ? props.dataset[0]?.source : props.dataset.source) ?? []

  return data.length > 0 || source.length > 0 || seriesData.length > 0
})
const graphicArr = computed(() => {
  return [
    {
      type: 'group',
      left: 'center',
      top: 'middle',
      silent: true,
      children: [
        {
          type: 'image',
          top: 'middle',
          invisible: isNoData.value,
          style: {
            image: new URL(`./assets/no-data.png`, import.meta.url).href,
            width: 52,
            height: 40,
          },
          left: 'center',
        },
        {
          type: 'text',
          left: 'center',
          top: 30,
          invisible: isNoData.value,
          style: {
            fill: '#fff',
            text: props.defaultName,
            fontSize: '14px',
          },
        },
      ],
    },
  ]
})
const option = computed(() => {
  const type = (Array.isArray(props.typeData) ? props.typeData?.[0] : props.typeData?.data)?.type

  const dataZoom = props.isXZoom
    ? [
        {
          type: 'slider',
          height: 6,
          show: props.isXZoom,
          bottom: 10,
          start: 0,
          end: 100,
          maxValueSpan: props.valueSpan,
          minValueSpan: props.valueSpan,
        },
      ]
    : props.isYZoom
      ? [
          {
            start: 100, // 默认为0
            end: 100, // 默认为100
            show: props.isYZoom,
            maxValueSpan: props.valueSpan,
            minValueSpan: props.valueSpan,
            yAxisIndex: [0],
            fillerColor: '#025084',
            borderColor: '#025084',
            handleStyle: {
              color: '#025084',
            },
            height: '90%', // 组件高度
            // 左边的距离
            left: '98%',
            type: 'slider',
            right: 2, // 右边的距离
            top: 0, // 上边边的距离
          },
          {
            type: 'inside',
            start: 0, // 默认为0
            end: 100, // 默认为100
            yAxisIndex: [0],
          },
        ]
      : []

  return {
    dataset: props.dataset,
    textStyle: {
      color: '#ccc',
    },
    graphic: props.configOption.graphic ? graphicArr.value.concat(props.configOption.graphic) : graphicArr.value,
    color: props.colors?.length ? props.colors : [],
    xAxis: isGraph(props.typeData)
      ? null
      : Array.isArray(props.configOption.xAxis)
        ? [
            {
              type: props.isAxial ? 'value' : 'category',
              name: isNoData.value ? props.xUnit : '',

              axisLine: {
                show: props.isAxial ? false : props.isXAxisLine,
              },
              splitLine: {
                show: props.isXSplitLine,
              },

              axisLabel: {
                formatter: (params: any) => {
                  return params + props.xLabelUnit
                },
                showMinLabel: true,
                showMaxLabel: true,
                show: props.isAxisLabel,
              },
            },
          ]
        : {
            type: props.isAxial ? 'value' : 'category',
            name: isNoData.value ? props.xUnit : '',

            axisLine: {
              show: props.isAxial ? false : props.isXAxisLine,
            },
            splitLine: {
              show: props.isXSplitLine,
            },

            axisLabel: {
              formatter: (params: any) => {
                return params + props.xLabelUnit
              },

              show: props.isAxisLabel,
            },
          },
    yAxis: isGraph(props.typeData)
      ? null
      : [
          {
            type: props.isAxial ? 'category' : 'value',
            name: props.isAxial ? '' : isNoData.value ? props.yUnit : '',
            nameTextStyle: {
              padding: [0, 0, 0, -30],
            },
            axisLine: {
              show: props.isAxial ? true : props.isYAxisLine,
            },

            inverse: props.inverse,
          },
          {
            type: props.isAxial ? 'category' : 'value',
            name: isNoData.value ? props.yAxisIndexUnit : '',
            show: props.yAxisIndex,
            nameTextStyle: {
              padding: [-40, 0, 0, 40],
            },
          },
        ],
    dataZoom,
    tooltip: {
      trigger: isTirggerType.value,
    },
    legend: {
      selectedMode: props.tapLegend,
      show: props.isLegend,
      bottom: 15,
      itemGap: 15,
      itemWidth: type === 'line' ? 16 : 10,
      itemHeight: type === 'line' ? 2 : 10,
    },
    grid: Array.isArray(props.configOption?.grid)
      ? [
          {
            top: props.padding?.[0],
            right: props.padding?.[1],
            bottom: props.padding?.[2],
            left: props.padding?.[3],
          },
        ]
      : {
          top: props.padding?.[0],
          right: props.padding?.[1],
          bottom: props.padding?.[2],
          left: props.padding?.[3],
        },
    series: series.value,
  }
})
// 深度合并;
function deepObjectMerge(option: any, configOption: any) {
  for (const key in configOption) {
    if (key === 'graphic')
      return

    option[key] = option[key] && typeof option[key] === 'object' ? deepObjectMerge(option[key], configOption[key]) : (option[key] = configOption[key])
  }
  return option
}
function getChart() {
  deepObjectMerge(option.value, props.configOption)

  myChart.setOption(option.value, true)
}
function resize() {
  myChart.resize() // 窗口大小发生变化的时候重置
}

function initChart() {
  echarts.registerTheme('customed', chartJson)
  myChart = echarts.getInstanceByDom($eChart.value as HTMLElement)
  if (!myChart) {
    myChart = echarts.init($eChart.value as HTMLElement, 'customed', { renderer: 'svg' })
    myRefChar.value = myChart
  }
  getChart()
  myChart.off('click')
  myChart.on('click', (val: any) => {
    emit('clickChartData', val)
  })
  myChart.on('mouseover', (val: any) => {
    emit('mouseoverData', val)
  })
  myChart.on('mouseout', (val: any) => {
    emit('mouseoutData', val)
  })
  window.addEventListener('resize', resize) // 添加监听
  const timer: any = null
  const resizeObserver = new ResizeObserver(() => {
    if (timer)
      clearTimeout(timer)

    // timer = setTimeout(() => {
    //     resize()
    // }, 10)  可添加防抖
    resize()
  })
  resizeObserver.observe($eChart.value)
}
defineExpose({
  myRefChar,
})
watch(
  () => props.dataset,
  () => {
    nextTick(() => {
      myChart && getChart()
    })
  },
  { deep: true },
)
watch(
  () => props.configOption,
  () => {
    nextTick(() => {
      if (props.isConfigWatch)
        myChart && getChart()
    })
  },
  { deep: true },
)
watch(
  () => props.typeData,
  () => {
    nextTick(() => {
      if (props.isTypeWatch) {
        const type = Array.isArray(props.typeData) ? props.typeData[0]?.type : props.typeData.type
        if (type === 'treemap')
          myChart && getChart()

        myChart && getChart()
      }
    })
  },
  { deep: true },
)
onMounted(() => {
  initChart()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div ref="$eChart" :style="{ width: '100%', height: '100%' }" />
</template>
