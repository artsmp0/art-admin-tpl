<!-- eslint-disable vue/one-component-per-file -->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { NConfigProvider, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useData, useRoute } from 'vitepress'
import { computed, defineComponent, h, inject } from 'vue'

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

const isSsr = computed(() => import.meta.env.SSR)
</script>

<template>
  <NConfigProvider abstract :locale="zhCN" :date-locale="dateZhCN" :theme="theme" inline-theme-disabled>
    <DefaultTheme.Layout />
    <template v-if="isSsr">
      <CssRenderStyle />
      <VitepressPath />
    </template>
  </NConfigProvider>
</template>
