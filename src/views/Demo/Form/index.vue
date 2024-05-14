<script setup lang="ts">
import type { AtFormItemConfig } from '@art-admin/components'

const model = reactive({
  field1: 1,
  field2: '选项一',
  field3: 999,
  field4: [
    {
      field5: null,
      field6: null,
      field7: 1,
      field8: '',
    },
  ],
})
const options1 = shallowRef<any[]>([])
const options2 = shallowRef<any[]>([])
function getOptions() {
  setTimeout(() => {
    options1.value = [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 },
    ]

    options2.value = [
      { label: '选项5', value: 1 },
      { label: '选项6', value: 2 },
    ]
  }, 5000)
}
const configs = computed(
  () =>
    [
      {
        label: '字段一',
        field: 'field1',
        type: 'radio',
        button: true,
        props: {
          options: [
            { label: '选项一', value: 1 },
            { label: '选项二', value: 2 },
          ],
        },
      },
      {
        label: '字段一为1时显示',
        field: 'field2',
        type: 'monacoEditor',
        hide: model.field1 !== 1,
        props: {
          options: {
            language: 'typescript',
          },
        },
      },
      {
        label: '字段一为2时显示',
        field: 'field3',
        type: 'inputNumber',
        hide: model.field1 !== 2,
      },
      {
        label: '字段一为1或2时显示',
        field: 'field4',
        type: 'multipleBlock',
        multipleConfig: {},
        span: 12,
        children: [
          {
            label: '嵌套表单内层显隐控制',
            labelPlacement: 'left',
            field: 'field7',
            type: 'radio',
            button: true,
            props: {
              options: [
                { label: '选项一', value: 1 },
                { label: '选项二', value: 2 },
              ],
              onChange: (val, configs) => {
                if (!configs)
                  return
                configs.value[1].hide = val === 2
                configs.value[2].hide = val === 1
              },
            },
          },
          {
            field: 'field5',
            labelPlacement: 'left',
            label: '下拉选择1',
            type: 'select',
            hide: false,
            props: {
              options: options1.value,
            },
          },
          {
            field: 'field6',
            labelPlacement: 'left',
            label: '下拉选择2',
            type: 'select',
            hide: true,
            props: {
              options: options2.value,
            },
          },
          {
            field: 'field8',
            labelPlacement: 'left',
            label: '输入',
            type: 'input',
          },
        ],
      },
    ] satisfies AtFormItemConfig[],
)
getOptions()
</script>

<template>
  <AtPageContainer bg-base>
    {{ model }}
    <AtForm :model="model" :configs="configs" />
  </AtPageContainer>
</template>
