<script setup lang="ts">
import { AtExpandTransition, AtIconBtn } from '@art-admin/components'
import { useToggle } from '@vueuse/core'

const [show, toggleShow] = useToggle(true)
</script>

<template>
  <div>
    <AtIconBtn type="error" class="mb16" @click="toggleShow()">
      点我{{ show ? '收起' : '展开' }}
    </AtIconBtn>
    <AtExpandTransition :show="show">
      <div v-for="item in 10" :key="item" class="bg-rose mb8 px8 py4 rounded-full">
        Lorem ipsum dolor sit{{ item }}
      </div>
    </AtExpandTransition>
  </div>
</template>
