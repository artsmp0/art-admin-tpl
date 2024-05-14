<script setup lang="ts">
import { AtUpload } from '@art-admin/components'
import { ref } from 'vue'

const files = ref([
  {
    id: 'a',
    name: '我错了.png',
    status: 'error',
  },
  {
    id: 'b',
    name: '普通文本.doc',
    status: 'finished',
    type: 'text/plain',
  },
  {
    id: 'c',
    name: '图片.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  },
  {
    id: 'd',
    name: '没传完.doc',
    status: 'uploading',
    percentage: 50,
  },
])
</script>

<template>
  <AtUpload v-model:value="files" :n-upload-props="{ action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f' }" />
</template>
