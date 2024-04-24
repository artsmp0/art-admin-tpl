<script setup lang="ts">
import type { TooltipProps } from 'naive-ui'
import type { AtIconProps } from '../../icon/src/types'
import { AtIcon } from '../../icon'

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
      <slot name="trigger">
        <AtIcon v-bind="{ ...$attrs, ...iconProps }" />
      </slot>
    </template>
    <slot>{{ props.message }}</slot>
  </NTooltip>
</template>
