<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { NConfigProvider, NEl, darkTheme } from 'naive-ui'
import { useData, useRoute } from 'vitepress'
import { computed, defineComponent, h, inject, nextTick, onMounted, watch } from 'vue'

const { isDark } = useData()
const theme = computed(() => isDark.value ? darkTheme : null)

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect') as any
    return {
      style: collect(),
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style,
    })
  },
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  },
})

async function mountCssVarToRoot() {
  await nextTick()
  const cssVarEl = document.querySelector('.css-var-container')
  if (!cssVarEl)
    return
  document.documentElement.setAttribute('style', cssVarEl.getAttribute('style')!)
  cssVarEl.setAttribute('style', '')
}
// @ts-expect-error missing types
const isSsr = computed(() => import.meta.env.SSR)
watch(isDark, mountCssVarToRoot)
onMounted(mountCssVarToRoot)
</script>

<template>
  <NConfigProvider abstract :theme="theme" inline-theme-disabled>
    <DefaultTheme.Layout />
    <NEl class="css-var-container hidden" />
    <template v-if="isSsr">
      <CssRenderStyle />
      <VitepressPath />
    </template>
  </NConfigProvider>
</template>
