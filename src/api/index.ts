import auth from './apis/auth'
import backend from './apis/backend'

export * from './apis/types'
export { URLS as BACKEND_URLS } from './apis/backend'

export const APIS = {
  auth,
  backend,
}
