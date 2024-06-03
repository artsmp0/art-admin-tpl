<script setup lang="ts">
import { AtExpandTransition, AtIconBtn } from '@gupo-admin/components'
import { useToggle } from '@vueuse/core'

const [show, toggleShow] = useToggle(true)
</script>

<template>
  <div>
    <AtIconBtn type="error" class="mb4" @click="toggleShow()">
      点我{{ show ? '收起' : '展开' }}
    </AtIconBtn>
    <AtExpandTransition :show="show">
      <div v-for="item in 10" :key="item" class="mb2 rounded-full bg-rose px2 py1">
        Lorem ipsum dolor sit{{ item }}
      </div>
    </AtExpandTransition>
  </div>
</template>
