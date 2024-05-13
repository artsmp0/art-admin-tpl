<script setup lang="ts">
import { NSpin, type SpinProps } from 'naive-ui'
import type { AtLoadingProps } from './types'

defineOptions({
  name: 'AtLoading',
})

withDefaults(defineProps<AtLoadingProps>(), { minHeight: '200px' })
</script>

<template>
  <div v-if="show" class="flex items-center justify-center w-full h-full" :style="{ minHeight }">
    <NSpin v-bind="$attrs" />
  </div>
</template>
