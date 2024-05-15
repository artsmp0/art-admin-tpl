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
      onChange: () => {
        model.b = null
        model.c = null
      },
    },
    apiFn() {
      // 模拟接口请求
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([{ label: '选项1-1', value: 1 }, { label: '选项1-2', value: 2 }])
        }, 5000)
      })
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
    apiFn() {
      // 模拟接口请求
      return new Promise((resolve) => {
        setTimeout(() => {
          if (model.a === 1)
            resolve([{ label: '选项1-1', value: 1 }, { label: '选项1-2', value: 2 }])
          else
            resolve([{ label: '选项2-1', value: 1 }, { label: '选项2-2', value: 2 }])
        }, 500)
      })
    },
    listener: async (apiFn) => {
      if (!model.a)
        return { disabled: true, options: [] }
      return { disabled: false, options: await apiFn?.() }
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
