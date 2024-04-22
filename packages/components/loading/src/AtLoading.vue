<script setup lang="ts">
import type { SpinProps } from 'naive-ui'

defineOptions({
  name: 'AtLoading',
})

withDefaults(defineProps<{
  show: boolean
  minHeight?: string
  desc?: string
  spinProps?: /* @vue-ignore */ SpinProps
}>(), {
  desc: '努力加载中...',
})
</script>

<template>
  <div v-if="show" class="at-loading" :style="{ minHeight }">
    <NSpin v-bind="spinProps">
      <template #description>
        {{ desc }}
      </template>
    </NSpin>
  </div>
</template>

<style lang="scss" scoped>
.at-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 200px;
}
</style>
