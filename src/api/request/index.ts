import { makeRequest } from './request'
import type { RequestConfig } from './types'

export { makeRequest as request } from './request'

type RestConfig = Partial<Omit<RequestConfig, 'params' | 'data' | 'args'>>

/** query 传参 get */
export function get<Res = any, Params = any>(url: string, otherConfigs?: RestConfig) {
  return makeRequest<Res, Params>({
    method: 'get',
    url,
    ...otherConfigs,
  })
}

/** 路径 get 请求 */
export function pathArgGet<Res = any, Params extends string = string>(url: string, otherConfigs?: RestConfig) {
  return makeRequest<Res, undefined, undefined, Params>({
    method: 'get',
    url,
    ...otherConfigs,
  })
}

/** post 请求 */
export function post<Res = any, Data = any>(url: string, otherConfigs?: RestConfig) {
  return makeRequest<Res, undefined, Data>({
    method: 'post',
    url,
    ...otherConfigs,
  })
}
