<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { NConfigProvider, NEl, darkTheme } from 'naive-ui'
import { useData } from 'vitepress'
import { computed, nextTick, onMounted, watch } from 'vue'

const { isDark } = useData()
const theme = computed(() => isDark.value ? darkTheme : null)

async function mountCssVarToRoot() {
  await nextTick()
  const cssVarEl = document.querySelector('.css-var-container')
  if (!cssVarEl)
    return
  document.documentElement.setAttribute('style', cssVarEl.getAttribute('style')!)
  cssVarEl.setAttribute('style', '')
}

watch(isDark, mountCssVarToRoot)
onMounted(mountCssVarToRoot)
</script>

<template>
  <NConfigProvider :theme="theme">
    <DefaultTheme.Layout />
    <NEl class="css-var-container hidden" />
  </NConfigProvider>
</template>
