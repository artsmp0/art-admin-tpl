<script setup lang="ts">
import { AtIconMsg } from '@gupo-admin/components'
</script>

<template>
  <AtIconMsg
    style="color: peru;"
    :tooltip-props="{ contentStyle: { fontSize: '14px', color: 'peru', maxWidth: '188px' } }"
    message="这是一行文字的提示这是一行文字的提示这是一行文字的提示这是一行文字的提示"
  />
</template>
