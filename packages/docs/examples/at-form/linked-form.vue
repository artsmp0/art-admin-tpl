<script setup lang="ts">
import type { AtFormItemConfig } from '@art-admin/components'
import { AtForm } from '@art-admin/components'
import { reactive } from 'vue'

const model = reactive<any>({
  a: 1,
  b: 1,
  c: 1,
})

const configs: AtFormItemConfig[] = [
  {
    field: 'a',
    type: 'select',
    label: '三级联动 a',
    span: 8,
    props: {
      options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }],
      onChange: () => {
        model.b = null
        model.c = null
      },
    },
  },
  {
    field: 'b',
    type: 'select',
    label: '三级联动 b',
    deps: ['a'],
    span: 8,
    props: {
      onChange: () => { model.c = null },
    },
    listener: () => {
      if (!model.a)
        return { disabled: true, options: [] }
      else if (model.a === 1)
        return { disabled: false, options: [{ label: '选项1-1', value: 1 }, { label: '选项1-2', value: 2 }] }
      else return { disabled: false, options: [{ label: '选项2-1', value: 1 }, { label: '选项2-2', value: 2 }] }
    },
  },
  {
    field: 'c',
    type: 'select',
    label: '三级联动 c',
    deps: ['b'],
    span: 8,
    listener: () => {
      if (!model.b)
        return { disabled: true, options: [] }
      else if (model.b === 1)
        return { disabled: false, options: [{ label: '选项1-1-1', value: 1 }, { label: '选项1-1-2', value: 2 }] }
      else return { disabled: false, options: [{ label: '选项2-2-1', value: 3 }, { label: '选项2-2-2', value: 4 }] }
    },
  },
]
</script>

<template>
  <div w-full>
    {{ model }}
    <AtForm :model="model" :configs="configs" />
  </div>
</template>
