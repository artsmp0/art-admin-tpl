<script setup lang="ts">
import type { AtFormItemConfig } from '@gupo-admin/components'
import { AtIconBtn, AtSearch } from '@gupo-admin/components'
import { reactive, shallowRef } from 'vue'

const model = reactive({
  a: '',
  b: null,
  c: null,
  d: null,
})
const configs: AtFormItemConfig[] = [
  { field: 'a', type: 'input', rule: { required: true, message: '请输入内容' } },
  { field: 'b', type: 'select', props: { options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }] } },
  { field: 'c', type: 'select', props: { options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }] } },
  { field: 'd', type: 'datePicker', props: { type: 'daterange' } },
]

const atSearchRef = shallowRef()
function search() {
  try {
    atSearchRef.value?.$atForm.validate()
    // eslint-disable-next-line no-console
    console.log('model: ', model)
  }
  catch { }
}
</script>

<template>
  <div w-full of-hidden>
    <AtSearch ref="atSearchRef" :configs="configs" :model="model" :n-form-props="{}">
      <template #action>
        <AtIconBtn
          icon="i-ph-magnifying-glass-duotone"
          type="error"
          secondary
          @click="search"
        >
          自定义提交按钮
        </AtIconBtn>
      </template>
    </AtSearch>
  </div>
</template>
