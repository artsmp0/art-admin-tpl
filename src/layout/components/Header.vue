<script setup lang="tsx">
import HeaderOptions from './HeaderOptions.vue'
import Tabs from './Tabs.vue'
import logo from '@/assets/imgs/logo.png'
import { useUIStore } from '@/stores/ui'

// 设置
const UI = useUIStore()
const TAB_POSITION = computed(() => UI.defaultSetting.TAB_POSITION)
</script>

<template>
  <NLayoutHeader class="h60 w-full of-hidden pr20" flex="~ items-center" bordered>
    <div class="hidden md:flex" :style="{ width: `${UI.defaultSetting.SIDE_WIDTH}px` }" flex="justify-center items-center shrink-0">
      <img :src="logo" alt="LOGO" class="w-70%">
    </div>
    <div class="ml--1 h-full min-w-0 flex-1 pr24">
      <Tabs v-if="TAB_POSITION === 'top'" />
    </div>
    <HeaderOptions class="ml-auto shrink-0" />
  </NLayoutHeader>
</template>
