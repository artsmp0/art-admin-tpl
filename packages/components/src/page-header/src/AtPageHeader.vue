<script setup lang="ts">
import { NPageHeader } from 'naive-ui'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AtPageHeader',
})

defineProps<{
  title?: string
}>()
const router = useRouter()
function handleBack() {
  router.back()
}
</script>

<template>
  <NPageHeader class="mb16 shrink-0" @back="handleBack">
    <template #title>
      <slot>{{ title }}</slot>
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
  </NPageHeader>
</template>
