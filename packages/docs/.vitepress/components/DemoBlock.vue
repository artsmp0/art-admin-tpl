<script lang='ts' setup name="demo-block">
import { computed } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'

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
      <div class="o-demo_wrapper">
        <slot />
      </div>
      <div class="relative">
        <div class="o-demo_actions">
          <a href="javascript:void(0);" class="o-demo_action_item" group @click="copy()">
            <div class="o-demo_action_icon i-ph-copy-simple-duotone" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ copied ? 'Copied' : 'Copy code' }}
            </div>
          </a>
          <a href="javascript:void(0);" class="o-demo_action_item" group @click="toggle()">
            <div class="o-demo_action_icon i-ph-terminal-window-duotone" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ value ? 'Hidden code' : 'Show code' }}
            </div>
          </a>
        </div>
        <div v-show="value" :class="`language-${lang} my0!`" v-html="decodedHighlightedCode" />
      </div>
    </div>
  </ClientOnly>
</template>
