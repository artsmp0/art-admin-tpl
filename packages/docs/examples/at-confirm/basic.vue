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
  <AtConfirm message="确定删除吗？" @confirm="onConfirm">
    按钮文案
  </AtConfirm>
</template>
