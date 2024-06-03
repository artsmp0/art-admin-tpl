<script setup lang="ts">
import { AtPageContainer } from '@gupo-admin/components'
</script>

<template>
  <div class="h266px w-full transform">
    <AtPageContainer inner-scroll>
      <div class="mb2 bg-rose py3 text-white">
        假设这里是搜索
      </div>
      <AtPageContainer class="flex-1" padding="0">
        <div v-for="item in 30" :key="item" class="mb1 bg-blue p2 last:mb0">
          假设这里是一个占满页面剩余部分并且滚动的表格{{ item }}
        </div>
      </AtPageContainer>
    </AtPageContainer>
  </div>
</template>
