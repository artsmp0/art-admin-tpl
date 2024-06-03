<script setup lang="ts">
import { AtConfirm } from '@gupo-admin/components'

function onConfirm() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}
</script>

<template>
  <AtConfirm
    message="确定删除吗？"
    :button-props="{ type: 'primary', icon: 'i-ph-trash' }"
    :confirm-props="{
      showIcon: false,
      positiveText: '保存',
      positiveButtonProps: { type: 'error' },
    }"
    @confirm="onConfirm"
  >
    删除
  </AtConfirm>
</template>
