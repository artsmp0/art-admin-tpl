/**
 * @name:字体大小转换
 * @msg:
 * @param val 字体大小 initWidth 屏幕分辨率
 * @return n*o
 */
const nowClientWidth: any = document.documentElement.clientWidth
export function nowSize(val: number, initWidth = 1920): number {
  return val * (nowClientWidth / initWidth)
}
/*******
 * @msg:数据转换
 * @param {array | object} data 原数据支持数组或对象
 * @param {array } params  数据key集合
 * @param {boolean } isSlice  是否截取字符串长度默认false
 * @param {boolean } isZero  0的数据是否显示默认true
 *
 * ******** */
type Params = string[]

/*******
 * @msg:数据转换
 * @param {array | object} data 原数据支持数组或对象
 * @param {array } params  数据key集合
 * @param {boolean } isSlice  是否截取字符串长度默认false
 *
 * ******** */
function sliceSize(val: string) {
  if (val.length > 4)
    return `${val.slice(0, 5)}...`

  return val
}
function switchParamsKey(data: Params = [], e: any, isSlice: boolean) {
  const arr: Params = []
  function isobject(e: any, item: any) {
    const key = item?.split('.')
    if (key.length > 1)
      return e[key[0]].map((i: any) => (Number.isNaN(+i[key[1]]) ? i[key[1]] : +i[key[1]]))
  }
  data.forEach((item, index) => {
    if (index === 0) {
      arr.push(isSlice ? sliceSize(e[item]) : e[item])
    }
    else {
      const arr1 = isobject(e, item)
      for (const i of arr1)
        arr.push(i)
    }
  })
  return arr
}
function switchParams(data: Params = [], e: any, key = '', isSlice?: boolean) {
  const arr: Params = []
  if (key)
    arr.push(key)

  data.forEach((item, index) => {
    arr.push(index === 0 ? (isSlice ? sliceSize(e[item]) : e[item]) : Number.isNaN(+e[item]) ? e[item] : +e[item])
  })
  return arr
}
export function switchData(data: any, params: Params = [], isSlice = false) {
  let mapData: any = []
  if (Array.isArray(data)) {
    if (data.length === 0)
      return

    let flag = false
    mapData = data.map((e) => {
      for (const key in e) {
        if (Array.isArray(e[key]))
          flag = true
      }
      if (flag)
        return switchParamsKey(params, e, isSlice)

      return switchParams(params, e, '', isSlice)
    })
  }
  else {
    if (Object.keys(data).length === 0)
      return

    for (const key in data)
      mapData.push(switchParams(params, data[key], key, isSlice))
  }
  return mapData
}

export const getImageUrl = (path: string) => new URL(`../assets/${path}`, import.meta.url).href
