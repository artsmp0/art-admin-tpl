<script setup lang="ts">
import { type ButtonProps, NButton, NFlex, NPopconfirm } from 'naive-ui'
import { ref } from 'vue'

defineOptions({
  name: 'AtConfirm',
})

const props = withDefaults(
  defineProps<Props>(),
  {
    buttonProps: () => ({ type: 'error', secondary: true, size: 'tiny' }),
  },
)

interface Props {
  message: string
  buttonProps?: /* vue-ignore */ ButtonProps
  onConfirm?: () => Promise<any>
}

const show = ref(false)
const loading = ref(false)
function handleCancel() {
  show.value = false
}
async function handlePositiveClick() {
  try {
    loading.value = true
    await props.onConfirm?.()
  }
  finally {
    loading.value = false
    handleCancel()
  }
}
</script>

<template>
  <NPopconfirm v-bind="$attrs" v-model:show="show">
    <template #trigger>
      <NButton v-bind="buttonProps" @click.stop="">
        <slot />
      </NButton>
    </template>
    {{ message }}
    <template #action>
      <NFlex align="center" size="small">
        <NButton size="tiny" @click="handleCancel">
          取消
        </NButton>
        <NButton type="primary" size="tiny" :loading="loading" @click="handlePositiveClick">
          确认
        </NButton>
      </NFlex>
    </template>
  </NPopconfirm>
</template>
