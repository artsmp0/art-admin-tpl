<script setup lang="ts">
import { AtPageContainer } from '@art-admin/components'
</script>

<template>
  <div class="h266px w-full transform">
    <AtPageContainer inner-scroll>
      <div class="py3 bg-rose text-white mb2">
        假设这里是搜索
      </div>
      <AtPageContainer class="flex-1" padding="0">
        <div v-for="item in 30" :key="item" class="bg-blue mb1 p2 last:mb0">
          假设这里是一个占满页面剩余部分并且滚动的表格{{ item }}
        </div>
      </AtPageContainer>
    </AtPageContainer>
  </div>
</template>
