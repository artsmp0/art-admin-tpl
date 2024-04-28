<script setup lang="ts">
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { computed, h } from 'vue'
import type { AtIconProps } from './types'
import SvgIcon from './SvgIcon.vue'

defineOptions({
  name: 'AtIcon',
})

const props = defineProps<AtIconProps>()

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
