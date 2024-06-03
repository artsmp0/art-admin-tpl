<script setup lang="ts">
import { AtIconBtn, AtIconMsg } from '@gupo-admin/components'
</script>

<template>
  <AtIconMsg
    style="color: peru;"
    :tooltip-props="{ contentStyle: { fontSize: '14px', color: 'peru', maxWidth: '188px' } }"
    message="这是一行文字的提示这是一行文字的提示这是一行文字的提示这是一行文字的提示"
  >
    <template #trigger>
      <AtIconBtn>自定义触发器</AtIconBtn>
    </template>
  </AtIconMsg>
</template>
