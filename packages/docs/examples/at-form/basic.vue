<script setup lang="ts">
import type { AtFormInst, AtFormItemConfig } from '@gupo-admin/components'
import { AtForm } from '@gupo-admin/components'
import { NButton, NFlex } from 'naive-ui'
import { h, ref, shallowRef } from 'vue'
import { getOptions, treeOptions } from './mock'
import CustomField from './custom-field.vue'

const model = ref({
  a: '这里是 a',
  b: 2,
  c: null,
  d: 1,
  e: null,
  f: null,
  g: 1,
  h: null,
  i: null,
  j: '',
  k: [{ area: null, name: '' }],
  l: { area: null, name: '', age: 18 },
  m: [{ id: 'c', name: '图片.png', status: 'finished', url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' }],
  n: `{
    "key": "value"
}`,
})

const configs: AtFormItemConfig[] = [
  {
    type: 'input',
    field: 'a',
    label: '文本输入',
    span: 24,
    rule: { message: '请输入', required: true },
  },
  {
    type: 'inputNumber',
    field: 'b',
    label: '数字输入',
    span: 12,
    props: { min: 0, max: 999, step: 3, style: { width: '100%' } },
  },
  {
    type: 'select',
    field: 'c',
    label: '根据接口获取下拉列表',
    span: 12,
    apiFn() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { label: '选项一', value: 1 },
            { label: '选项二', value: 2 },
          ])
        }, 1000)
      })
    },
  },
  {
    type: 'radio',
    field: 'd',
    label: '单选',
    span: 12,
    props: { options: [{ label: '选项一', value: 1 }, { label: '选项二', value: 2 }] },
  },
  {
    type: 'radio',
    field: 'd',
    label: '单选（按钮）',
    span: 12,
    button: true,
    props: { options: [{ label: '选项一', value: 1 }, { label: '选项二', value: 2 }] },
  },
  {
    type: 'cascader',
    field: 'e',
    label: '级联选择',
    span: 12,
    props: { options: getOptions(), cascade: true, showPath: true, filterable: true, multiple: true },
  },
  {
    type: 'datePicker',
    field: 'f',
    label: '日期（自动格式化为字符串）',
    span: 12,
  },
  {
    type: 'switch',
    field: 'g',
    label: '开关',
    span: 6,
    props: { checkedValue: 1, uncheckedValue: 0 },
  },
  {
    type: 'treeSelect',
    field: 'h',
    label: '树选择',
    span: 18,
    props: { options: treeOptions, multiple: true, checkable: true, filterable: true, cascade: true, maxTagCount: 1, checkStrategy: 'child' },
  },
  {
    field: 'm',
    type: 'upload',
    label: '上传',
    span: 8,
    props: { nUploadProps: { listType: 'image-card' } },
  },
  {
    field: 'n',
    type: 'monacoEditor',
    label: '编辑器',
    span: 16,
    props: { options: { language: 'json' } },
  },
  {
    type: 'titleBar',
    field: 'i',
    label: '标题栏，下面是自定义组件和嵌套表单',
  },
  {
    type: 'custom',
    field: 'j',
    label: '自定义组件',
    rule: { required: true, message: '请输入自定义组件的值' },
    span: 24,
    props: { xx: 123 },
    component: CustomField,
  },
  {
    field: 'k',
    type: 'multipleBlock',
    label: '混合表单(数组)',
    multipleConfig: {
      limit: 2,
      addBtnText: '自定义按钮标签',
      defaultItem: {
        area: null,
        name: '',
      },
    },
    span: 24,
    children: [
      {
        field: 'name',
        type: 'input',
        label: () => h('span', { style: 'color:deeppink' }, '自定义渲染标签'),
        labelPlacement: 'left',
        span: 12,
      },
      {
        field: 'area',
        type: 'select',
        label: 'area',
        labelPlacement: 'left',
        span: 12,
        props: { options: [{ label: '浙江', value: 1 }, { label: '福建', value: 2 }] },
      },
    ],
  },
  {
    field: 'l',
    type: 'multipleBlock',
    label: '混合表单(对象)',
    span: 24,
    children: [
      {
        field: 'name',
        type: 'input',
        label: '姓名',
        labelPlacement: 'left',
        span: 8,
      },
      {
        field: 'age',
        type: 'inputNumber',
        label: '年龄',
        labelPlacement: 'left',
        span: 8,
      },
      {
        field: 'area',
        type: 'select',
        label: 'area',
        labelPlacement: 'left',
        span: 8,
        props: { options: [{ label: '浙江', value: 1 }, { label: '福建', value: 2 }] },
      },
    ],
  },
]

const $form = shallowRef<AtFormInst>()

async function submit() {
  try {
    await $form.value?.validate()
    // eslint-disable-next-line no-console
    console.log(model.value)
  }
  catch {}
}
</script>

<template>
  <div class="w-full p4">
    <AtForm ref="$form" :model="model" :configs="configs" :layout="{ xGap: 16, yGap: 8 }" title-bar-cls="bg-green/30" />
    <NFlex size="medium" vertical>
      <NButton @click="$form?.resetValue()">
        重置
      </NButton>
      <NButton type="primary" @click="submit">
        提交
      </NButton>
    </NFlex>
  </div>
</template>
