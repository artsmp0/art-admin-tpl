<script lang='ts' setup name="demo-block">
import { computed } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'

const props = withDefaults(defineProps<{
  code: string
  highlightedCode: string
  lang?: string
}>(), {
  lang: 'vue',
})

const decodedHighlightedCode = computed(() =>
  decodeURIComponent(props.highlightedCode),
)
const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) })
const [value, toggle] = useToggle()
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs" class="mt-6 of-hidden border border-gray/20 rounded border-solid">
      <div class="at-demo_wrapper">
        <slot />
      </div>
      <div class="relative">
        <div class="at-demo_actions">
          <a href="javascript:void(0);" class="at-demo_action_item" group @click="copy()">
            <div class="at-demo_action_icon" :class="copied ? 'i-ph-check-circle-duotone' : 'i-ph-copy-simple-duotone'" />
          </a>
          <a href="javascript:void(0);" class="at-demo_action_item" group @click="toggle()">
            <div class="at-demo_action_icon i-ph-terminal-window-duotone" />
          </a>
        </div>
        <div v-show="value" :class="`language-${lang} my0!`" v-html="decodedHighlightedCode" />
      </div>
    </div>
  </ClientOnly>
</template>
