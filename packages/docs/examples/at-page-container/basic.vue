<script setup lang="ts">
import { AtPageContainer } from '@gupo-admin/components'
</script>

<template>
  <div class="h266px w-full translate-0 transform">
    <AtPageContainer back-top>
      这是页面内容
      <p v-for="item in 30" :key="item">
        带一个好看的滚动条以及默认 16px 的内边距{{ item }}，注意看还会出现一个返回顶部按钮
      </p>
    </AtPageContainer>
  </div>
</template>
