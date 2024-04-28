import axios from 'axios'
import { addAuthHeader } from './interceptors/add-auth-header'
import { parseArgs } from './interceptors/parse-args'
import { repeatReq } from './interceptors/repeat-req'
import { apiResult } from './interceptors/api-result'
import type { BaseRes, MakeRequestFn, RequestConfig } from './types'

const instance = axios.create({
  timeout: 1000 * 60,
  baseURL: import.meta.env.VITE_APP_API_URL,
})

// cryptoInInterceptors(instance as any)
addAuthHeader(instance)
parseArgs(instance)
repeatReq(instance)
apiResult(instance)

export const makeRequest: MakeRequestFn = <Payload extends BaseRes>(config: RequestConfig) => {
  return async function (params: unknown, restConfig: any) {
    const finalConfig: RequestConfig = {
      showMessage: true,
      multiple: false,
      ...config,
      ...restConfig,
    }
    if (config.method === 'get') {
      if (config.url?.includes('{'))
        finalConfig.args = params
      else
        finalConfig.params = params
    }
    else if (config.method === 'post') {
      finalConfig.data = params
    }
    const response = await instance.request<Payload>(finalConfig)

    return response
  }
}
