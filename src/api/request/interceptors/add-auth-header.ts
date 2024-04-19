import type { AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'

/** 添加授权信息 */
export function addAuthHeader(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token && config.headers) {
      (config.headers as Recordable).Authorization = `Bearer ${token}`;
      (config.headers as Recordable).org_id = userStore.orgId
    }
    else if (import.meta.env.DEV) {
      // 用于联调测试环境用
      (config.headers as Recordable).Authorization = `Bearer ${import.meta.env.VITE_DEBUG_TOKEN}`;
      (config.headers as Recordable).org_id = import.meta.env.VITE_DEBUG_ORG_ID
    }

    return {
      ...config,
    }
  })
}
