<script setup lang="ts">
import type { AtFormItemConfig } from '@art-admin/components'
import { AtForm } from '@art-admin/components'
import { computed, markRaw, reactive, shallowRef } from 'vue'
import CustomField from './custom-field.vue'

const model = reactive<any>({
  a: 1,
  b: 1,
  c: 1,
  d: '自定义表单组件需要使用 markRaw',
})

const options = shallowRef<any[]>([])

function fetchData() {
  setTimeout(() => {
    options.value = [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }]
  }, 1000)
}
fetchData()

const configs = computed<AtFormItemConfig[]>(() => [
  {
    field: 'a',
    type: 'select',
    label: 'AAA',
    span: 8,
    props: { options: options.value },
  },
  {
    field: 'b',
    type: 'select',
    label: 'BBB',
    span: 8,
    hide: model.a !== 1,
    props: { options: [{ label: '选项1-1', value: 1 }, { label: '选项1-2', value: 2 }] },
  },
  {
    field: 'c',
    type: 'select',
    label: 'CCC',
    span: 8,
    hide: model.a !== 2,
    props: { options: [{ label: '选项2-1', value: 1 }, { label: '选项2-2', value: 2 }] },
  },
  {
    type: 'custom',
    field: 'd',
    label: '自定义组件',
    rule: { required: true, message: '请输入自定义组件的值' },
    span: 8,
    props: { xx: 123 },
    component: markRaw(CustomField),
  },
])
</script>

<template>
  <div w-full>
    {{ model }}
    <AtForm :model="model" :configs="configs" />
  </div>
</template>
