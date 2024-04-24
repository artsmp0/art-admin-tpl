/* TYPE */
import type { PageParams } from '../request/types'

export const enum URLS {
  tableList = '/tag/tb/bind/list',
  /* API_PATH */
}

export default {
  /* API */
  /** 演示 get 分页请求 */
  [URLS.tableList]: (() => {
    return (params: PageParams<any>): Promise<any> => {
      const { page, size } = params
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'ok',
            code: 200,
            data: {
              total: 1000,
              list: Array.from({ length: size }).map((_, idx) => ({
                id: size * (page - 1) + idx,
                1: `名字${size * (page - 1) + idx}`,
                2: `${idx % 3 === 0 ? '描述描述描述描述描述描述描述描述' : idx % 5 === 0 ? '反反复复方法反反复复发' : '描述'}${
                                size * (page - 1) + idx
                            }`,
                3: `${idx % 4 === 0 ? '数据量数据量数据量数据量' : '数据量'}${size * (page - 1) + idx}`,
                4: `占用磁盘${idx % 3}`,
                5: `最近更新时间${size * (page - 1) + idx}`,
              })),
            },
          })
        }, 500)
      })
    }
  })(),
}
