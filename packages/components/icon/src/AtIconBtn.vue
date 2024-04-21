<script setup lang="ts">
import { type ButtonProps, NButton } from 'naive-ui'
import type { Component } from 'vue'
import AtIcon from './AtIcon.vue'

defineOptions({
  name: 'AtIconBtn',
})
const props = defineProps<AtIconButtonProps>()

interface AtIconButtonProps extends /* @vue-ignore */ ButtonProps {
  icon: string | Component
  spin?: boolean
}
</script>

<template>
  <NButton v-bind="props">
    <template #icon>
      <AtIcon :icon="props.icon" :class="spin ? 'animate-spin' : ''" />
    </template>
    <slot />
  </NButton>
</template>
