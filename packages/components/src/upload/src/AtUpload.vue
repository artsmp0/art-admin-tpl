<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { NButton, NText, NUpload, NUploadDragger, type UploadProps } from 'naive-ui'
import { nextTick, shallowRef, useAttrs, watch } from 'vue'
import { AtIcon } from '../../icon'
import type { AtUploadProps } from './type'

defineOptions({
  name: 'GpUpload',
})

const props = defineProps<AtUploadProps>()

const list = shallowRef<UploadProps['fileList']>([])

const stop = watch(
  () => props.value,
  async () => {
    list.value = props.toFileList?.(props.value) ?? props.value
    await nextTick()
    stop()
  },
  { immediate: true },
)

const handleFinish: UploadProps['onFinish'] = ({ file, event }) => {
  const response = JSON.parse((event?.target as any).response)
  if (!props.isSuccess || props.isSuccess?.(response)) {
    const newFile = { ...file, response }
    props.onUpdateValue([...props.value, props.format?.(newFile) ?? newFile])
  }
  else {
    file.status = 'error'
  }
  return file
}

const attrs: any = useAttrs()
const handleRemove: UploadProps['onRemove'] = ({ file, fileList }) => {
  if (attrs.onRemove)
    return attrs.onRemove({ file, fileList })

  // 需要服务端 id 或者前端处理加上 uuid
  const targetIdx = list.value?.findIndex(item => item.id === file.id)
  if (targetIdx !== undefined) {
    // 找到了就手动移除
    // list.value?.splice(targetIdx, 1);
    // console.log('list.value: ', list.value);
    props.onUpdateValue(props.value.filter((f: any) => f.id !== file.id))
  }
  return true
}
</script>

<template>
  <NUpload v-bind="props.nUploadProps" v-model:file-list="list" @finish="handleFinish" @remove="handleRemove">
    <slot>
      <NButton v-if="!props.dragTip && props.nUploadProps?.listType !== 'image-card'" type="primary">
        <template #icon>
          <AtIcon icon="i-ph-upload-simple-duotone" class="text-5xl" />
        </template>
        上传文件
      </NButton>
      <NUploadDragger v-else-if="props.nUploadProps?.listType !== 'image-card'">
        <div style="margin-bottom: 12px">
          <AtIcon icon="i-ph-archive-duotone" class="text-5xl" />
        </div>
        <NText style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </NText>
        <NP depth="3" style="margin: 8px 0 0">
          {{ props.dragTip }}
        </NP>
      </NUploadDragger>
    </slot>
  </NUpload>
</template>

<style lang="scss" scoped>
:deep(.n-upload-trigger) {
    width: 100%;
}
</style>
