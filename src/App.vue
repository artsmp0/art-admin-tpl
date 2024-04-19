<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { isDark } from './composables/theme'
import { useUIStore } from './stores/ui'

const currentTheme = computed(() => {
  return isDark.value ? darkTheme : null
})

const UI = useUIStore()
const themeOverrides = computed(() => {
  return isDark.value ? UI.curTheme.dark : UI.curTheme.light
  return {}
})

async function mountCssVarToRoot() {
  await nextTick()
  const cssVarEl = document.querySelector('.css-var-container')
  if (!cssVarEl)
    return
  document.documentElement.setAttribute('style', cssVarEl.getAttribute('style')!)
  cssVarEl.setAttribute('style', '')
}

watch([isDark, () => UI.curTheme], mountCssVarToRoot)
onMounted(mountCssVarToRoot)
</script>

<template>
  <NConfigProvider :locale="zhCN" :theme="currentTheme" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <RouterView />
    <NEl class="css-var-container hidden" />
  </NConfigProvider>
</template>
