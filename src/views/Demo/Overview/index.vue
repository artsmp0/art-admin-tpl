<script setup lang="ts">
import { useDiscrete } from '@/composables/discrete'

function confirmDel() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const { message } = useDiscrete()
function search(v: string) {
  message.info(v)
}
</script>

<template>
  <AtPageContainer>
    <AtIconBtn icon="i-ph-arrow-clockwise-duotone">
      刷新
    </AtIconBtn>
    <AtIcon icon="svg-test" />
    <AtEmpty height="200px" />
    <AtLoading :show="true" :spin-props="{ size: 'small', themeOverrides: { color: '#f00' } }" />
    <div mb8>
      这是一行文字
      <AtIconMsg
        style="color: royalblue;"
        :tooltip-props="{ contentStyle: { fontSize: '14px', color: 'red', maxWidth: '188px' } }"
        message="这是一行文字的提示这是一行文字的提示这是一行文字的提示这是一行文字的提示"
      />
    </div>
    <AtPageHeader title="这里是页面标题" style="width: 500px;">
      <template #extra>
        <AtIcon icon="i-ph-magnifying-glass-duotone" />
      </template>
    </AtPageHeader>
    <NFlex>
      <AtConfirm message="确定删除吗？" :show-icon="false" @confirm="confirmDel">
        删除
      </AtConfirm>

      <AtSearchInput size="large" style="width: 266px;" @search="search" />
    </NFlex>
  </AtPageContainer>
</template>
