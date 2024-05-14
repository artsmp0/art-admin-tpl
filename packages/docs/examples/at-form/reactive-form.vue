<script setup lang="ts">
import type { AtFormItemConfig } from '@art-admin/components'
import { AtForm } from '@art-admin/components'
import { computed, ref } from 'vue'

const model = ref<any>({
  a: 1,
  b: 1,
  c: 1,
})

const configs = computed<AtFormItemConfig[]>(() => [
  {
    field: 'a',
    type: 'select',
    label: '三级联动 a',
    span: 8,
    props: {
      options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }],
    },
  },
  {
    field: 'b',
    type: 'select',
    label: '选中1显示',
    span: 8,
    hide: model.value.a !== 1,
    props: {
      options: [{ label: '选项1-1', value: 1 }, { label: '选项1-2', value: 2 }],
    },
  },
  {
    field: 'c',
    type: 'select',
    label: '选中1禁用',
    span: 8,
    props: { options: [{ label: '选项2-2-1', value: 3 }, { label: '选项2-2-2', value: 4 }], disabled: model.value.a !== 2 },

  },
])
</script>

<template>
  <div w-full>
    <AtForm :model="model" :configs="configs" />
  </div>
</template>
