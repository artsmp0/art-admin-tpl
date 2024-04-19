import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// import { initCrypto } from 'gupo-gm-crypto'
import { useDiscrete } from '@/composables/discrete'
import { usePermissionStore } from '@/stores/permission'
import { type AuthQuery, useUserStore } from '@/stores/user'
// import { isDev } from '@/utils'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [],
})

const { loadingBar } = useDiscrete()
let initialized = false

router.beforeEach(async (to, from) => {
  loadingBar.start()
  // await initCrypto({ baseURLs: [import.meta.env.VITE_APP_API_URL], debug: isDev() ? 'cancelKey' : false })
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  permissionStore.cacheRoutes(to, from)
  await userStore.setAuth(to.query as unknown as AuthQuery)
  if (!initialized) {
    initialized = true
    const success = await permissionStore.initRoutes()
    if (!success) {
      return {
        path: '/401',
        query: { code: '401' },
      }
    }
    // vue-router needs to wait for the next tick to obtain the new route
    return { ...to, replace: true }
  }
})

router.afterEach(() => {
  loadingBar.finish()
})

export default function setupRouter(app: App) {
  app.use(router)
}
