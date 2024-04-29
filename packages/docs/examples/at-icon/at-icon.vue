<script setup lang="ts">
import { AtIcon } from '@art-admin/components'
import { Accessibility } from '@vicons/carbon'
import { NFlex, NH6 } from 'naive-ui'
</script>

<template>
  <div class="flex flex-col gap2">
    <NH6 class="text-[var(--vp-c-brand-1)]">
      svg icon
    </NH6>
    <NFlex gap="12px">
      <AtIcon icon="svg-vue" size="24px" />
      <AtIcon icon="svg-column-height" size="24px" class="text-blue" />
    </NFlex>
    <NH6>unocss icon</NH6>
    <AtIcon icon="i-ph-arrow-clockwise-duotone" class="text-rose " size="24px" />
    <NH6>naive icon</NH6>
    <AtIcon :icon="Accessibility" spin :icon-props="{ size: '24px', depth: '5' }" />
  </div>
</template>
