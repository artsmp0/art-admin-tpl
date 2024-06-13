# 改造为自登录应用

本项目默认采用用户中心作为统一登录平台，如果你需要改造为走自己的登录接口，可以按照本篇文档进行改造。

### 1. 添加登录和获取用户信息的接口

```ts
export const enum BACKEND_URLS {
  // ...
  login = '/login',
  userInfo = '/api/login/user',
}

export default {
  [BACKEND_URLS.login]: post<BaseRes<string>, any>(BACKEND_URLS.login),
  [BACKEND_URLS.userInfo]: get<BaseRes<LoginUserInfo>>(BACKEND_URLS.userInfo),
}
```

### 2.  携带 token
修改 `src/api/request/interceptors/add-auth-header.ts` 文件:

```ts
import type { AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'

/** 添加授权信息 */
export function addAuthHeader(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token && config.headers && config.url !== '/login') { // [!code ++]
      (config.headers as Recordable).Token = `${token}` // [!code ++]
    } // [!code ++]
    return {
      ...config,
    }
  })
}
```

### 3. 接口请求 token 过期处理

修改 `src/api/request/interceptors/api-result.tsx`：

```ts
// ...

/** 处理授权接口失败 */
function handleAuthError(response: AxiosResponse) { // [!code ++]
  router.replace({ // [!code ++]
    path: '/401', // [!code ++]
    query: { // [!code ++]
      code: 401, // [!code ++]
    }, // [!code ++]
  }) // [!code ++]
  return { // [!code ++]
    err: response, // [!code ++]
  } // [!code ++]
} // [!code ++]

/** 处理接口结果 */
export function apiResult(instance: AxiosInstance) {
  instance.interceptors.response.use(
    async (response) => {
      const { message } = useDiscrete()
      const { data, headers } = response as any
      if (data instanceof Blob) {
        // ....
      }

      if ((response.config as unknown as any).isAuthApi) // [!code --]
      if (data.code === ResponseCode.authFailed) // [!code ++]
        return handleAuthError(response) as any 

      // ...
    },
    // ...
  )
}
```

### 4. 头部登录用户信息展示

根据接口返回数据进行字段修改，此处省略

### 5. 路由守卫修改（最重要）

修改 `src/router/index.ts`：

```ts
import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useDiscrete } from '@/composables/discrete'
import { whiteList } from '@/router/fallback-routes'
import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: whiteList,
})

const { loadingBar } = useDiscrete()
let initialized = false

router.beforeEach(async (to, from) => {
  loadingBar.start()
  if (to.meta.whiteList)
    return true
  const userStore = useUserStore()
  if (to.query.code) {
    // 此处是为了支持三方平台登录，如果没有三方平台登录可以省略这部分代码
    const success = await userStore.codeLogin(to.query.code as string)
    if (!success)
      return { path: '/login' }
    return { ...to, replace: true, query: {} }
  }
  const permissionStore = usePermissionStore()
  if (!userStore.token)
    return '/login'
  if (!initialized) {
    initialized = true
    const success = await permissionStore.initRoutes()
    if (!success) {
      return {
        path: '/401',
        query: { code: '401' },
      }
    }
    permissionStore.cacheRoutes(to, from)
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
```

### 6. 鉴权相关数据修改

`src/stores/permission.ts`：
```ts

// ...
export const usePermissionStore = defineStore('permission', () => {

  // ...
  
  /** 初始化路由 */
  const initRoutes = async () => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      setPermission(mockData.button)
      setRoutes(mockData as unknown as PermissionData)
    }
    else {
      // 有接口则替换为接口返回 data 即可
      const { data, err } = await APIS.backend[BACKEND_URLS.userInfo]()
      if (err) {
        addFallbackRoutes()
        return false
      }
      // 根据后端接口字段修改
      setPermission(data.data.user_permission.button) // [!code ++]
      setRoutes(data.data.user_permission) // [!code ++]
      useUserStore().userInfo = data.data // [!code ++]
    }
    return true
  }

  // ...
})
```

`src/stores/user.ts`：
```ts
import { defineStore } from 'pinia'
import { APIS, BACKEND_URLS, type LoginUserInfo } from '@/api'
import { useRequest } from '@/composables/use-request'
import { router } from '@/router'
import { usePermissionStore } from '@/stores/permission'
import { useLocalStorage } from '@/utils/storage'

export interface AuthQuery {
  token: string
}

export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage('token', '') as Ref<string>
  const userInfo = ref<LoginUserInfo | null>(null)
  const permissionStore = usePermissionStore()
  const logout = () => {
    token.value = ''
    router.replace('/login')
  }

  const setAuth = async (auth: string) => {
    token.value = auth
  }

  // 三方登录
  const codeLogin = async (code: string) => {
    token.value = ''
    const { data, run, err } = useRequest(APIS.backend[BACKEND_URLS.login])
    await run({ code })
    if (err.value || !data.value) {
      logout()
      return false
    }
    setAuth(data.value)
    await permissionStore.initRoutes()
    router.push('/')
    return true
  }

  return {
    token,
    userInfo,
    codeLogin,
    logout,
    setAuth,
  }
})

```

### 7. 添加登录页


在 `src/router/fallback-routes.ts` 中添加白名单路由：
```ts
export const whiteList = [
  {  // [!code ++]
    name: 'Login',  // [!code ++]
    path: '/login',  // [!code ++]
    component: () => import('@/layout/pages/Login.vue'),  // [!code ++]
    meta: { whiteList: true },  // [!code ++]
  }  // [!code ++]
  // ...
]

// ...
```

添加登录页，`src/layout/pages/Login.vue`：
```vue
<script setup lang="ts">
import { type AtFormInst, type AtFormItemConfig, AtIcon, AtIconBtn } from '@gupo-admin/components'
import { APIS, BACKEND_URLS } from '@/api'
import Logo from '@/assets/imgs/logo.png'
import { useDiscrete } from '@/composables/discrete'
import { isDark, toggleDark } from '@/composables/theme'
import { useRequest } from '@/composables/use-request'
import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'

const { message } = useDiscrete()
const userStore = useUserStore()
const formRef = shallowRef<AtFormInst>()
const model = reactive({
  username: '',
  password: '',
})

const permissionStore = usePermissionStore()
const router = useRouter()
const { loading, data, run, err } = useRequest(APIS.backend[BACKEND_URLS.login])
async function login() {
  try {
    await formRef.value?.validate()
    await run(model)
    if (err.value || !data.value)
      return
    message.success('登录成功！')
    userStore.setAuth(data.value)
    await permissionStore.initRoutes()
    router.push('/')
  }
  catch { }
}
const configs: AtFormItemConfig[] = [
  {
    field: 'username',
    type: 'input',
    label: '用户名',
    slots: {
      prefix: () => h(AtIcon, { icon: 'i-ph-user' }),
    },
    rule: { required: true, message: '请输入用户名' },
  },
  {
    field: 'password',
    type: 'input',
    label: '密码',
    slots: {
      prefix: () => h(AtIcon, { icon: 'i-ph-lock' }),
    },
    props: { type: 'password', showPasswordOn: 'click' },
    rule: { required: true, message: '请输入密码' },
  },
  {
    field: 'button',
    type: 'custom',
    props: {
      attrType: 'submit',
    },
    component() {
      return h(AtIconBtn, { icon: 'i-ph-arrow-right', type: 'primary', block: true, loading: loading.value, onClick: login }, () => '登录')
    },
  },
]
</script>

<template>
  <div class="relative h-full w-full bg-white">
    <div
      class="[mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)] absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div class="h-full flex items-center justify-center bg-base text-base">
      <div class="relative rounded-base bg-modal bg-white/70 px4 py2 shadow-md bd-base dark:bg-blue/10" @keydown.enter="login">
        <img :src="Logo" class="mx-auto my8 w-100px">
        <AtForm ref="formRef" :configs :model @submit="login" />
        <AtIconBtn
          class="absolute right-4 top-4"
          :icon="isDark ? 'i-ph-moon-stars-duotone' : 'i-ph-sun-duotone'"
          circle
          secondary
          @click="toggleDark"
        />
      </div>
    </div>
  </div>
</template>
```



