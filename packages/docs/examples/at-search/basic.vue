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
  { field: 'a', type: 'input' },
  { field: 'b', type: 'select', props: { options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }] } },
  { field: 'c', type: 'select', props: { options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }] } },
  { field: 'd', type: 'datePicker', props: { type: 'daterange' } },
]
function search() {
  // eslint-disable-next-line no-console
  console.log('model: ', model)
}
</script>

<template>
  <div w-full of-hidden>
    <AtSearch :configs="configs" :model="model" @search="search" />
  </div>
</template>
