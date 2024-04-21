<script setup lang="ts">
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
        :tooltip-props="{ contentStyle: { fontSize: '14px', color: 'red', maxWidth: '188px' } }"
        message="这是一行文字的提示这是一行文字的提示这是一行文字的提示这是一行文字的提示"
      />
    </div>
  </div>
</template>
