// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的
import * as echarts from 'echarts/core'

// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  CustomChart,
  EffectScatterChart,
  FunnelChart,
  GaugeChart,
  GraphChart,
  HeatmapChart,
  LineChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  ScatterChart,
  TreemapChart,
} from 'echarts/charts'

// // 引入提

import {
  DataZoomComponent,
  DatasetComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { UniversalTransition } from 'echarts/features'

// 注册必须的组件
echarts.use([
  MarkLineComponent,
  MarkAreaComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  GaugeChart,
  CanvasRenderer,
  LegendComponent,
  PictorialBarChart,
  TitleComponent,
  BarChart,
  GraphChart,
  DatasetComponent,
  LineChart,
  RadarChart,
  FunnelChart,
  ScatterChart,
  HeatmapChart,
  VisualMapComponent,
  DataZoomComponent,
  UniversalTransition,
  GraphicComponent,
  TreemapChart,
  EffectScatterChart,
  CustomChart,
  PolarComponent,
])

export default echarts
