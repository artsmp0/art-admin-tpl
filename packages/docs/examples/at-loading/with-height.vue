<script setup lang="ts">
import { AtIconBtn, AtLoading } from '@gupo-admin/components'
import { useToggle } from '@vueuse/core'

const [show, toggleShow] = useToggle(true)
setTimeout(toggleShow, 2000)
</script>

<template>
  <div class="h-200px w-full flex flex-col">
    <div class="shrink-0">
      <AtIconBtn @click="toggleShow()">
        {{ show ? '别转了' : '转起来' }}
      </AtIconBtn>
    </div>
    <div class="flex-1">
      <AtLoading :show="show" description="努力转圈圈中..." />
    </div>
  </div>
</template>
