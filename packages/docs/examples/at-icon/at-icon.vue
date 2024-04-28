<script setup lang="ts">
import { AtIcon } from '@art-admin/components'
import { Accessibility } from '@vicons/carbon'
</script>

<template>
  <div class="flex items-center gap2">
    <!-- svg icon -->
    <AtIcon icon="svg-column-height" :svg-icon-props="{ size: '24px' }" />
    <AtIcon icon="svg-vue" :svg-icon-props="{ size: '24px' }" />
    <!-- unocss icon -->
    <AtIcon icon="i-ph-arrow-clockwise-duotone" class="text-lg text-rose" />
    <!-- naive icon -->
    <AtIcon :icon="Accessibility" />
  </div>
</template>
