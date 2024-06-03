<script setup lang="ts">
import { AtUpload } from '@gupo-admin/components'
import { ref } from 'vue'

const files = ref([

  {
    id: 'c',
    name: '图片.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  },
])
</script>

<template>
  <AtUpload v-model:value="files" drag-tip="只能上传图片噢" :n-upload-props="{ action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f', listType: 'image-card' }" />
</template>
