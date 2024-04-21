<script setup lang="ts">
defineOptions({
  name: 'AtEmpty',
})

withDefaults(
  defineProps<{
    desc?: string
    height?: string
  }>(),
  {
    desc: '暂无数据',
  },
)
</script>

<template>
  <div :style="{ height }" class="h-full w-full flex items-center justify-center">
    <NEmpty :description="desc" />
  </div>
</template>
