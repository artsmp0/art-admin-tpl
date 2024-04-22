<script setup lang="ts">
function confirmDel() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>

<template>
  <div class="p16">
    <AtIconBtn icon="i-ph-arrow-clockwise-duotone">
      刷新
    </AtIconBtn>
    <AtEmpty height="200px" />
    <AtLoading :show="true" :spin-props="{ size: 'small', themeOverrides: { color: '#f00' } }" />
    <div>
      这是一行文字
      <AtIconMsg
        style="color: royalblue;"
        :tooltip-props="{ contentStyle: { fontSize: '14px', color: 'red', maxWidth: '188px' } }"
        message="这是一行文字的提示这是一行文字的提示这是一行文字的提示这是一行文字的提示"
      />
    </div>
    <AtConfirm message="确定删除吗？" @confirm="confirmDel">
      删除
    </AtConfirm>
  </div>
</template>
