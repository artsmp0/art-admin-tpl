import { createStore } from 'gupo-vue3-persistedstate'
import { isDev } from '.'

export const { useLocalStorage, useSessionStorage } = createStore(import.meta.env.VITE_APP_STORAGE_KEY, { crypto: !isDev() })
