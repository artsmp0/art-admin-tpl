<script setup lang="ts">
import { type IconProps, NIcon } from 'naive-ui'
import type { Component } from 'vue'
import SvgIcon from './SvgIcon.vue'

defineOptions({
  name: 'AtIcon',
})

const props = defineProps<{
  /** 针对 naive icon 的配置 */
  iconProps?: Omit<IconProps, 'themeOverrides'>
  /** 针对 SvgIcon 的配置 */
  svgIconProps?: {
    color?: string
    size?: string
    spin?: boolean
  }
  icon: string | Component
}>()

const iconType = computed(() => {
  if (typeof props.icon === 'string') {
    if (props.icon.startsWith('svg-')) {
      return h(SvgIcon, {
        name: props.icon.slice(4),
        ...props.svgIconProps,
      })
    }
    else if (props.icon.startsWith('i-')) {
      return h('div', {
        class: `${props.icon}`,
        style: { display: 'inline-block', verticalAlign: '-0.15em' },
      })
    }
    console.warn('icon name is not correct!')
    return null
  }
  else {
    return h(
      NIcon,
      {
        ...props.iconProps,
      },
      () => h(props.icon as Component),
    )
  }
})
</script>

<template>
  <Component v-bind="$attrs" :is="iconType" />
</template>

<style scoped>
.n-icon {
    vertical-align: -0.15em;
}
</style>
