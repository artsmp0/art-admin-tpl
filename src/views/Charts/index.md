## ChartItem 图表

```js
基本用法:
#echarts 相关主题配置可通过官网生成主题json替换组件里的chart.js文件,也可直接修改chart.js文件相关主题配置;
#引入组件
import ChartItem from '@/components/Charts/ChartItem';
#使用组件
 <ChartItem :dataset="dataset" :typeData="typeFunc(5, 'bar')"  />
#图表数据
let dataset = reactive({
  dimensions: ['name', '上', '中高', '中', '中低', '低'],
  source: [
    ['身高', 22, 34, 55, 44, 42],
    ['体重', 22, 34, 55, 44, 42],
    ['身高体重比', 22, 34, 55, 44, 42],
    ['头围', 22, 34, 55, 44, 42],

],
#图表类型
function typeFunc(val, type) {
   return  Array(val).fill({
            type,
            barGap: 0,
     }); //相同配置及类型通过该方法生成图表类型
}

//图表数据过滤转换
 //获取后台接口返回的数据data,
import { switchData } from '@/utils'; //引入方法
 //后台返回的数据
let data = [
  {
    "itm": "头围",
    "上": "81",
    "中高": "3940",
    "中": "14483",
    "中低": "1180",
    "低": "96"
  },
  {
    "itm": "体重",
    "上": "11412",
    "中高": "6707",
    "中": "9851",
    "中低": "194",
    "低": "9207"
  },
  {
    "itm": "身长",
    "上": "4928",
    "中高": "9323",
    "中": "21190",
    "中低": "1763",
    "低": "167"
  },
  {
    "itm": "体重身长比",
    "上": "10693",
    "中高": "4480",
    "中": "14473",
    "中低": "990",
    "低": "6701"
  }
]
//数据过滤传入和图表对应的每个key值
dataset.source = switchData(data, ['itm', '上', '中高', '中', '中低', '低']);
//后台返回的数据
let data = [
                   {
                        x: '头围',
                        y: [
                            {
                                name: '上',
                                value: '81',
                            },

                            {
                                name: '中高',
                                value: '3940',
                            },
                            {
                                name: '中',
                                value: '14483',
                            },

                            {
                                name: '中低',
                                value: '1180',
                            },
                            {
                                name: '低',
                                value: '96',
                            },
                        ],
                    },
                    {
                        x: '体重',
                        y: [
                            {
                                name: '上',
                                value: '81',
                            },

                            {
                                name: '中高',
                                value: '3940',
                            },
                            {
                                name: '中',
                                value: '14483',
                            },

                            {
                                name: '中低',
                                value: '1180',
                            },
                            {
                                name: '低',
                                value: '96',
                            },
                        ],
                    },
                    {
                        x: '身长',
                        y: [
                            {
                                name: '上',
                                value: '81',
                            },

                            {
                                name: '中高',
                                value: '3940',
                            },
                            {
                                name: '中',
                                value: '14483',
                            },

                            {
                                name: '中低',
                                value: '1180',
                            },
                            {
                                name: '低',
                                value: '96',
                            },
                        ],
                    },
                    {
                        x: '体重身长比',
                        y: [
                            {
                                name: '上',
                                value: '81',
                            },

                            {
                                name: '中高',
                                value: '3940',
                            },
                            {
                                name: '中',
                                value: '14483',
                            },

                            {
                                name: '中低',
                                value: '1180',
                            },
                            {
                                name: '低',
                                value: '96',
                            },
                        ],
                    },
                ];
//数据过滤传入和图表对应的每个key值
 dataset.source = switchData(data, ['x', 'y.value']);
//后台返回的数据
let data ={
   头围:{
    "上": "81",
    "中高": "3940",
    "中": "14483",
    "中低": "1180",
    "低": "96"
  },
  体重{
    "上": "11412",
    "中高": "6707",
    "中": "9851",
    "中低": "194",
    "低": "9207"
  },
  身长{

    "上": "4928",
    "中高": "9323",
    "中": "21190",
    "中低": "1763",
    "低": "167"
  },
 体重身长比{
    "上": "10693",
    "中高": "4480",
    "中": "14473",
    "中低": "990",
    "低": "6701"
  }
}
//数据过滤传入和图表对应的每个key值
 dataset.source = switchData(data, ['上', '中高', '中', '中低', '低']);
```

# 参数配置

| 参数          | 说明                                                                             | 类型    | 可选值 | 默认值                      |
| ------------- | -------------------------------------------------------------------------------- | ------- | ------ | --------------------------- |
| dataset       | 图表数据                                                                         | object  | -      | -                           |
| typeData      | 图表类型,series 里面的配置可单独在此配置,参考 echarts 官网配置                   | array   | -      | -                           |
| configOption  | 图表配置项 { tooltip,legend, grid, xAxis,yAxis},等等配置项,参考 echarts 官网配置 | object  | -      | -                           |
| isConfigWatch | 是否监听图表配置项                                                               | boolean | -      | false                       |
| isTypeWatch   | 是否监听图表 series                                                              | boolean | -      | false                       |
| valueSpan     | 滚动条显示条数                                                                   | number  | -      | 4                           |
| xUnit         | x 坐标轴单位                                                                     | string  | -      | -                           |
| yUnit         | y 坐标轴单位                                                                     | string  | -      | -                           |
| labelUnit     | 柱标签单位                                                                       | string  | -      | -                           |
| isAxial       | 柱状图是否横向                                                                   | boolean | -      | false                       |
| isXAxisLine   | x 轴线是否显示                                                                   | boolean | -      | true                        |
| isYAxisLine   | y 轴线是否显示                                                                   | boolean | -      | true                        |
| isLabel       | 柱标签是否显示                                                                   | boolean |        | false                       |
| isLegend      | 图例是否显示                                                                     | boolean |        | true                        |
| isXZoom       | X 滚动条是否显示                                                                 | boolean |        | false                       |
| isYZoom       | Y 滚动条是否显示                                                                 | boolean |        | false                       |
| isAxisLabel   | x 轴的 label 是否显示                                                            | boolean |        | true                        |
| yAxisIndex    | 双 y 轴                                                                          | boolean |        | false                       |
| padding       | 画布填充边距[上,右,下,左]                                                        | array   |        | ['28%', '8%', '10%', '5%'], |
| colors        | 主题颜色配置                                                                     | array   |        | -                           |
| tapLegend     | 是否开启图例点击交互事件                                                         | boolean |        | true                        |

# Events

| -              | 事件名称 | 说明               | 回调参数 |
| -------------- | -------- | ------------------ | -------- |
| clickChartData | 点击事件 | 当前点击的绑定参数 |
| mouseover      | 移入事件 | 当前点击的绑定参数 |
| mouseout       | 移出事件 | 当前点击的绑定参数 |
