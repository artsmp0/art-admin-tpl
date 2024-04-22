<script setup lang="ts">
import type { TooltipProps } from 'naive-ui'
import type { AtIconProps } from '../../icon/src/types'

defineOptions({
  name: 'AtIconMsg',
})

const props = withDefaults(
  defineProps<{
    tooltipProps?: /* vue-ignore */ TooltipProps
    iconProps?: AtIconProps
    message?: string
  }>(),
  {
    tooltipProps: () => ({ contentStyle: { fontSize: '12px', maxWidth: '266px' } }),
    iconProps: () => ({ icon: 'i-ph-info-duotone' }),
  },
)
</script>

<template>
  <NTooltip v-bind="tooltipProps">
    <template #trigger>
      <AtIcon v-bind="{ ...$attrs, ...iconProps }" />
    </template>
    <slot>{{ props.message }}</slot>
  </NTooltip>
</template>
