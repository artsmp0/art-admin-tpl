<script setup lang="ts">
import { AtExpandTransition, AtIconBtn } from '@art-admin/components'
import { useToggle } from '@vueuse/core'

const [show, toggleShow] = useToggle(true)
</script>

<template>
  <div>
    <AtIconBtn type="error" class="mb4" @click="toggleShow()">
      点我{{ show ? '收起' : '展开' }}
    </AtIconBtn>
    <AtExpandTransition :show="show">
      <div v-for="item in 10" :key="item" class="bg-rose mb2 px2 py1 rounded-full">
        Lorem ipsum dolor sit{{ item }}
      </div>
    </AtExpandTransition>
  </div>
</template>
