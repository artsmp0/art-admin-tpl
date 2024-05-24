export default {
  color: ['#0079DB', '#0CA770', '#D98930', '#DB3954', '#6546DB', '#A930BB', '#DB543B', '#77AE19', '#00ADAB', '#4259DB'],
  backgroundColor: 'rgba(0, 0, 0, 0)',
  textStyle: {
    color: '#fff',
    fontSize: 12,
  },
  title: {
    textStyle: {
      color: '#fff',
    },
    subtextStyle: {
      color: '#fff',
    },
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: 'none',
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
  },
  bar: {
    barWidth: 14,
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#fff',
    },
    label: {
      color: '#fff',
      position: 'center',
      padding: [3, 0, 0, 5],
      fontSize: 12,
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#fff',
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#fff',
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#fff',
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#fff',
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  candlestick: {
    itemStyle: {
      color: '#eb5454',
      color0: '#47b262',
      borderColor: '#eb5454',
      borderColor0: '#47b262',
      borderWidth: 1,
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
    lineStyle: {
      width: 1,
      color: '#aaa',
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    label: {
      color: '#eee',
      fontSize: 12,
    },
  },
  map: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5,
    },
    label: {
      color: '#000',
      fontSize: 12,
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1,
      },
      label: {
        color: 'rgb(100,0,0)',
        fontSize: 12,
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5,
    },
    label: {
      color: '#000',
      fontSize: 12,
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1,
      },
      label: {
        color: 'rgb(100,0,0)',
        fontSize: 12,
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#324d67',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#fff',
      },
    },
    axisLabel: {
      show: true,
      color: '#CCCCCC',
      fontSize: 12,
      margin: 10,
    },
    nameTextStyle: {
      padding: [0, 0, -21, -22],

      verticalAlign: 'bottom',
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,.15)',
        type: [5, 10],
        dashOffset: 5,
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#263e54',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#fff',
      },
    },
    splitNumber: 3,
    alignTicks: false,
    nameTextStyle: {
      padding: [20, 0, -2, -5],
    },
    axisLabel: {
      show: true,
      color: '#ccc',
      fontSize: 12,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['rgba(255,255,255,.15)'],
        type: [5, 10],
        dashOffset: 5,
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#6E7079',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#6E7079',
      },
    },
    axisLabel: {
      show: true,
      color: '#6E7079',
      fontSize: 12,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#E0E6F1'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#6E7079',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#6E7079',
      },
    },
    axisLabel: {
      show: true,
      color: '#6E7079',
      fontSize: 12,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#E0E6F1'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666',
      },
    },
  },
  legend: {
    textStyle: {
      color: '#ccc',
      fontSize: 12,
    },
    itemWidth: 10,
    itemHeight: 10,
    bottom: 5,
    icon: 'roundRect',
  },
  grid: {
    top: '28%',
    bottom: '8%',
    right: '10%',
    left: '5%',
    containLabel: true,
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#ccc',
        width: 1,
      },
      crossStyle: {
        color: '#ccc',
        width: 1,
      },
    },
    trigger: 'axis',
    backgroundColor: '#19274A',
    borderColor: 'rgba(0,0,0,0)',
    textStyle: {
      color: '#fff',
      align: 'left',
      fontSize: 12,
    },
    confine: true,
  },
  timeline: {
    lineStyle: {
      color: '#DAE1F5',
      width: 2,
    },
    itemStyle: {
      color: '#A4B1D7',
      borderWidth: 1,
    },
    controlStyle: {
      color: '#A4B1D7',
      borderColor: '#A4B1D7',
      borderWidth: 1,
    },
    checkpointStyle: {
      color: '#316bf3',
      borderColor: 'fff',
    },
    label: {
      color: '#A4B1D7',
      fontSize: 12,
    },
    emphasis: {
      itemStyle: {
        color: '#FFF',
      },
      controlStyle: {
        color: '#A4B1D7',
        borderColor: '#A4B1D7',
        borderWidth: 1,
      },
      label: {
        color: '#A4B1D7',
        fontSize: 12,
      },
    },
  },
  visualMap: {
    color: ['#bf444c', '#d88273', '#f6efa6'],
  },
  dataZoom: {
    backgroundColor: 'rgba(13,33,117,0.5)',
    dataBackgroundColor: 'rgba(47,69,84,0.3)',
    fillerColor: '#4D5CA6',
    handleColor: '#a7b7cc',
    borderColor: 'rgba(43,48,67,0.4)',
    handleSize: '100%',
    zoomOnMouseWheel: false,
    moveOnMouseMove: false,
    showDataShadow: false,
    maxValueSpan: 4,
    minValueSpan: 4,
    realtime: true,
    zoomLock: true,
    textStyle: {
      color: '#333333',
    },
  },
  markPoint: {
    label: {
      color: '#eee',
      fontSize: 12,
    },
    emphasis: {
      label: {
        color: '#eee',
        fontSize: 12,
      },
    },
  },
}
