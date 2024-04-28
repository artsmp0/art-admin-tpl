<script setup lang="ts">
import { NButton } from 'naive-ui'
import AtIcon from './AtIcon.vue'
import type { AtIconButtonProps } from './types'

defineOptions({
  name: 'AtIconBtn',
})
const props = defineProps<AtIconButtonProps>()
</script>

<template>
  <NButton v-bind="props">
    <template #icon>
      <AtIcon :icon="props.icon" v-bind="props.atIconProps" :class="spin ? 'animate-spin' : ''" />
    </template>
    <slot />
  </NButton>
</template>
