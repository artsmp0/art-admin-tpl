<script setup lang="ts">
import { AtIcon, AtPageHeader } from '@art-admin/components'
</script>

<template>
  <AtPageHeader title="这里是页面标题" subtitle="子标题" class="w-full">
    <template #extra>
      <AtIcon icon="i-ph-magnifying-glass-duotone" />
      额外内容
    </template>
  </AtPageHeader>
</template>
