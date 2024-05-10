<script setup lang="ts">
import { AtSearchInput } from '@art-admin/components'
import { ref } from 'vue'

const loading = ref(false)
function search(text: string) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    // eslint-disable-next-line no-console
    console.log(text)
  }, 2000)
}
</script>

<template>
  <div>
    <AtSearchInput size="small" :loading="loading" @search="search" />
  </div>
</template>
