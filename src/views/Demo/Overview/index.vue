<script setup lang="ts">
import { useToggle } from '@vueuse/core'
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

const [show, toggleShow] = useToggle(true)
</script>

<template>
  <AtPageContainer>
    <NFlex align="center">
      <AtIconBtn icon="i-ph-arrow-clockwise-duotone" spin>
        刷新
      </AtIconBtn>
      <AtIcon icon="i-ph-arrow-clockwise-duotone" size="30px" class="text-rose" />
      <AtIcon icon="svg-test" size="30px" />
    </NFlex>
    <AtEmpty height="200px" size="huge" description="暂无数据" :theme-overrides="{ iconColor: '#f00', textColor: 'cyan' }" />
    <AtLoading :show="true" :spin-props="{ size: 'small', themeOverrides: { color: '#f00' } }" />
    <div mb2>
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

    <div>
      <AtIconBtn class="mb1" type="primary" @click="toggleShow()">
        {{ show ? '收起' : '展开' }}
      </AtIconBtn>
      <AtExpandTransition :show="show">
        <p v-for="item in 10" :key="item" class="bg-rose mb1 p2">
          Lorem ipsum dolor sit{{ item }}
        </p>
      </AtExpandTransition>
    </div>
    <n-spin description="你不知道你有多幸运">
      <n-alert title="啦啦啦" type="success">
        明天再打开行李箱。宝贝，挂电话啦。
      </n-alert>
    </n-spin>
    <n-spin description="你不知道你有多幸运" />
  </AtPageContainer>
</template>
