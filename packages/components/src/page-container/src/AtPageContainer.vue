<script setup lang="ts">
import { NBackTop, NScrollbar } from 'naive-ui'
import { computed, shallowRef } from 'vue'

defineOptions({
  name: 'AtPageContainer',
})

const props = withDefaults(
  defineProps<{
    innerScroll?: boolean
    padding?: number | string
    xScrollable?: boolean
    backTop?: boolean
  }>(),
  { padding: '16px' },
)
const styles = computed(() => ({
  padding: `${Number.parseInt(props.padding as string)}px`,
  paddingTop: `${Number.parseInt(props.padding as string)}px`,
}))

const $wrapper = shallowRef<HTMLElement>()
</script>

<template>
  <div ref="$wrapper" class="h-full w-full" :class="[innerScroll ? 'flex flex-col of-hidden' : 'of-auto']" :style="styles">
    <NScrollbar v-if="!innerScroll" :x-scrollable="xScrollable">
      <div :style="styles">
        <slot />
      </div>
      <NBackTop v-if="backTop" class="z-1000" right="40" :to="$wrapper" />
    </NScrollbar>
    <slot v-else />
  </div>
</template>
