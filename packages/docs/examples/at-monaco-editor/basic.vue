<script setup lang="ts">
import { AtMonacoEditor } from '@art-admin/components'
import { ref } from 'vue'

const code = ref<string>('const hello = "world";\nhello.aa("hello");')
</script>

<template>
  <div class="w-full">
    <AtMonacoEditor v-model:value="code" :options="{ language: 'typescript', readOnly: false, fixedOverflowWidgets: true }" />
  </div>
</template>
