<script setup lang="ts">
import { AtEmpty, AtIcon } from '@art-admin/components'
</script>

<template>
  <div class="h160 w-full">
    <AtEmpty
      :theme-overrides="{ textColor: 'purple', iconColor: '#f00' }"
      description="空空如也~"
    >
      <template #icon>
        <AtIcon
          icon="i-ph-ghost"
        />
      </template>
    </AtEmpty>
  </div>
</template>
