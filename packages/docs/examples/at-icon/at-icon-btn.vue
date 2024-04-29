<script setup lang="ts">
import { AtIconBtn } from '@art-admin/components'
import { ref } from 'vue'

const type = ref<any>('primary')
function changeType() {
  type.value = type.value === 'primary' ? 'error' : 'primary'
}
</script>

<template>
  <div class="flex items-center gap2">
    <AtIconBtn icon="svg-vue" :type="type" secondary spin>
      vue 🐮🍺
    </AtIconBtn>
    <AtIconBtn type="primary" @click="changeType">
      改变前一个图标
    </AtIconBtn>
  </div>
</template>
