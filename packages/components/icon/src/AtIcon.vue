<script setup lang="ts">
import { type IconProps, NIcon } from 'naive-ui'
import { type Component, computed, h } from 'vue'
import SvgIcon from './SvgIcon.vue'

defineOptions({
  name: 'AtIcon',
})

const props = defineProps<{
  /** 针对 naive icon 的配置 */
  iconProps?: Omit<IconProps, 'themeOverrides' | 'component'>
  /** 针对 SvgIcon 的配置 */
  svgIconProps?: {
    color?: string
    size?: string
    spin?: boolean
  }
  icon: string | Component
}>()

const iconTyped = computed(() => {
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
        style: { 'vertical-align': ' -0.15em' },
      },
      () => h(props.icon as Component),
    )
  }
})
</script>

<template>
  <Component v-bind="$attrs" :is="iconTyped" />
</template>
