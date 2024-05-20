<script setup lang="ts">
import type { AtFormItemConfig } from '@art-admin/components'
import { AtSearch } from '@art-admin/components'
import { reactive } from 'vue'

const model = reactive({
  a: '',
  b: null,
  c: null,
  d: null,
})
const configs: AtFormItemConfig[] = [
  { field: 'a', type: 'input', label: '姓名' },
  { field: 'b', type: 'select', label: '年龄', props: { options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }] } },
  { field: 'c', type: 'select', label: '职业', props: { options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }] } },
  { field: 'd', type: 'datePicker', label: '起止时间', props: { type: 'daterange' } },
]
function search() {
  // eslint-disable-next-line no-console
  console.log('model: ', model)
}
</script>

<template>
  <div w-full of-hidden>
    <AtSearch :configs="configs" default-open :model="model" min-width="350px" @search="search" />
  </div>
</template>
