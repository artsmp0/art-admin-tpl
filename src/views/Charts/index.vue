<script setup>
import content from './index.md'
import ChartItem from '@/composables/Charts/ChartItem/index.vue'
import MarkdownRender from '@/composables/MarkdownRender/index.vue'
import CodeRender from '@/composables/MarkdownRender/CodeRender.vue'

const active = ref('1')
const card = shallowRef()
const systemColor = ref('#37D1ED')
const show = ref(false)
const xUnit = ref('')
const yUnit = ref('')
const labelUnit = ref('')
const colors = ref([systemColor.value])
const dataset = reactive({
  dimensions: ['name', '上'],
  source: [
    ['身高', 12],
    ['体重', 24],
    ['身高体重比', 25],
    ['头围', 12],
    ['身高1', 18],
    ['身高2', 42],
    ['身高3', 33],
  ],
})
const typeData = ref([
  {
    type: 'bar',
    barGap: 0,
  },
])
const chartTypeOption = ref([
  { label: '柱状图', value: 'bar' },
  { label: '折线图', value: 'line' },
  { label: '饼图', value: 'pie' },
])
const chartSwitchOption = ref({
  inverse: { checkedLabel: '是否反向y坐标轴', uncheckedLabel: '是否是反向y坐标轴', value: false },
  isAxial: { checkedLabel: '是否横向柱状图', uncheckedLabel: '是否横向柱状图', value: false },
  isXAxisLine: { checkedLabel: 'X轴线是否显示', uncheckedLabel: 'X轴线是否显示', value: true },
  isAxisLabel: { checkedLabel: 'X轴label是否显示', uncheckedLabel: 'X轴label是否显示', value: true },
  isYAxisLine: { checkedLabel: 'Y轴线是否显示', uncheckedLabel: 'Y轴线是否显示', value: true },
  isXZoom: { checkedLabel: 'X滚动条是否显示', uncheckedLabel: 'X滚动条是否显示', value: false },
  isYZoom: { checkedLabel: 'Y滚动条是否显示', uncheckedLabel: 'Y滚动条是否显示', value: false },
  isLegend: { checkedLabel: '图例是否显示', uncheckedLabel: '图例是否显示', value: false },
  tapLegend: { checkedLabel: '是否开启图例点击交互事件', uncheckedLabel: '是否开启图例点击交互事件', value: false },
  isLabel: { checkedLabel: '柱标签label是否显示', uncheckedLabel: '柱标签label是否显示', value: false },
})
const configOption = computed(() => {
  return {
    color: colors.value,
    xAxis: {
      name: xUnit.value,
      axisLine: {
        show: chartSwitchOption.value.isXAxisLine.value,
        aa: chartSwitchOption.value.isXZoom.value,
        bb: chartSwitchOption.value.isYZoom.value,
        cc: chartSwitchOption.value.isLabel.value,
        dd: chartSwitchOption.value.tapLegend.value,
        ee: labelUnit.value,
        ff: chartSwitchOption.value.isAxial.value,
        gg: chartSwitchOption.value.inverse.value,
      },
      axisLabel: {
        show: chartSwitchOption.value.isAxisLabel.value,
      },
    },
    legend: {
      show: chartSwitchOption.value.isLegend.value,
    },
    yAxis: [
      {
        name: yUnit.value,
        axisLine: {
          show: chartSwitchOption.value.isYAxisLine.value,
        },
      },
    ],
  }
})
const baseCode = `
    <template>
         <ChartItem style="width: 50%" :dataset="dataset" :type-data="typeData"/>
            <n-button type="primary" @click="handleClick('bar')">柱状图</n-button>
            <n-button type="primary" @click="handleClick('line')">折线图</n-button>
            <n-button type="primary" @click="handleClick('pie')">饼图</n-button>
    </template>
    //数据
    <script setup>
    const dataset = reactive({
    dimensions: ['name', '上'],
    source: [
        ['身高', 12],
        ['体重', 24],
        ['身高体重比', 25],
        ['头围', 12],
        ['身高1', 18],
        ['身高2', 42],
        ['身高3', 33],
    ],
  })
  const typeData = ref([
    {
        type: 'bar',
        barGap: 0,
    },
 ])
 function handleClick(val) {
    typeData.value[0].type = val
}
<script>
`
function railStyle({ focused, checked }) {
  const style = {}
  if (checked) {
    style.background = systemColor.value
    if (focused)
      style.boxShadow = `0 0 0 2px ${systemColor.value}40`
  }
  else {
    style.background = '#d5d5d5'
    if (focused)
      style.boxShadow = '0 0 0 2px #d5d5d540'
  }
  return style
}
function handleConfirm(value) {
  colors.value = [value]
}
function handleClick(val) {
  typeData.value[0].type = val
  chartSwitchOption.value.isXZoom.value = true
  dataset.source = [
    ['身高', 12],
    ['体重', 32],
    ['身高体重比', 12],
    ['头围', 12],
    ['身高1', 15],
    ['身高2', 42],
    ['身高5', 33],
  ]
}
</script>

<template>
  <GpPageWrapper inner-scroll class="py0!">
    <NTabs v-model:value="active" type="line" class="pl16">
      <NTab name="1">
        demo
      </NTab>
      <NTab name="2">
        文档
      </NTab>
    </NTabs>
    <div class="flex-1 of-hidden p16">
      <GpPageWrapper>
        <NCard v-if="active === '1'" ref="card" title="图表示例">
          <div class="h-[300px]" style="width: 100%; margin: 10px 10px">
            <ChartBox title="echarts图表">
              <div class="chart-box">
                <ChartItem
                  style="width: 90%; height: 100%"
                  :dataset="dataset"
                  :type-data="typeData"
                  :config-option="configOption"
                  :is-config-watch="true"
                  :is-x-zoom="chartSwitchOption.isXZoom.value"
                  :is-y-zoom="chartSwitchOption.isYZoom.value"
                  :is-label="chartSwitchOption.isLabel.value"
                  :tap-legend="chartSwitchOption.tapLegend.value"
                  :label-unit="labelUnit"
                  :is-axial="chartSwitchOption.isAxial.value"
                  :inverse="chartSwitchOption.inverse.value"
                />
                <div>
                  <NSpace style="margin: 20px 0px 20px 0">
                    <NButton
                      v-for="(item, index) in chartTypeOption"
                      :key="index"
                      type="primary"
                      :color="systemColor"
                      @click="handleClick(item.value)"
                    >
                      {{ item.label }}
                    </NButton>
                    <NButton type="primary" :color="systemColor" @click="show = !show">
                      显示代码
                    </NButton>
                  </NSpace>
                  <NSpace>
                    <span style="color: #000">主题颜色:</span>
                    <NColorPicker
                      v-model:value="systemColor"
                      style="width: 150px; color: #fff"
                      :actions="['confirm']"
                      @confirm="handleConfirm"
                    />
                    <NSwitch
                      v-for="[key, item] of Object.entries(chartSwitchOption)"
                      :key="key"
                      v-model:value="item.value"
                      :rail-style="railStyle"
                    >
                      <template #checked>
                        {{ item.checkedLabel }}
                      </template>
                      <template #unchecked>
                        {{ item.uncheckedLabel }}
                      </template>
                    </NSwitch>
                  </NSpace>
                  <NSpace style="margin: 20px 0px 20px 0">
                    <span style="color: #000">x轴单位</span>
                    <NInput v-model:value="xUnit" placeholder="x轴单位" autosize style="width: 100px" />
                    <span style="color: #000">y轴单位</span>
                    <NInput v-model:value="yUnit" placeholder="x轴单位" autosize style="width: 100px" />
                    <span style="color: #000">柱标签单位</span>
                    <NInput v-model:value="labelUnit" placeholder="柱单位" autosize style="width: 100px" />
                  </NSpace>
                  <NDrawer v-model:show="show" :width="680">
                    <NDrawerContent title="代码" :native-scrollbar="false">
                      <CodeRender :code="baseCode" />
                    </NDrawerContent>
                  </NDrawer>
                </div>
              </div>
            </ChartBox>
          </div>
        </NCard>
        <MarkdownRender v-else :content="content" />
      </GpPageWrapper>
    </div>
  </GpPageWrapper>
</template>

<style scoped>
.chart-box {
    display: flex;
    height: 100%;
}
</style>
