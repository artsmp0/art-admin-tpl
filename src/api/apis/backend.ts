import { get, pathArgGet, post } from '../request'
import type { BaseRes, PageParams } from '../request/types'
import type { TableItem } from './types'

export const enum URLS {
  getTest = '/api/get',
  postTest = '/api/post',
  tableList = '/tag/tb/bind/list',
  userInfo = '/api/user/{id}',
  downloadTest = '/api/download',
}

export default {
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
              meta: {
                total: 1000,
              },
              data: Array.from({ length: size }).map((_, idx) => ({
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
  /** 演示 get 普通请求 */
  [URLS.getTest]: get<BaseRes<TableItem>, { search?: string, xx?: string }>(URLS.getTest),
  /** 演示 post 请求 */
  [URLS.postTest]: post<BaseRes<boolean>, { username: string, password: string }>(URLS.postTest),
  /** 此处演示路径参数的请求方式，此种写法等同于改行下的注释 */
  [URLS.userInfo]: pathArgGet<BaseRes<TableItem>, URLS.userInfo>(URLS.userInfo),
  // [URL.userInfo]: request<BaseRes<TableItem>, undefined, undefined, URL.userInfo>({ url: URL.userInfo })
  [URLS.downloadTest]: get<BaseRes<{ aa: string }> | Blob>(URLS.downloadTest),
}
