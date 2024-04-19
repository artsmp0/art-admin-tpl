<script setup lang="ts">
import { isDark } from '@/composables/theme'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const data = computed(() => ({
  dark: isDark.value,
}))
const userStore = useUserStore()
const url = computed(() => {
  return !import.meta.env.VITE_LOGIN_URL ? 'http://localhost:63001/' : `${new URL(import.meta.env.VITE_LOGIN_URL).origin}/${route.meta.microName}`
})
const isVite = computed(() => {
  return route.meta.isVite
})
const defaultPage = computed(() => `${route.meta.micro}&org_id=${userStore.orgId}&system_code=${route.meta.microName}&token=${userStore.token}&isMicro=1`)
</script>

<template>
  <div class="h-full w-full">
    <micro-app
      :key="route.meta.micro"
      :iframe="isVite"
      :data="data"
      class="h-full w-full"
      :name="route.meta.microName"
      :default-page="defaultPage"
      :url="url"
    />
  </div>
</template>
