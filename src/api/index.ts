import auth from './apis/auth'
import common from './apis/common'

export * from './apis/types'
export { URLS as COMMON_URLS } from './apis/common'

export const APIS = {
  auth,
  common,
}
