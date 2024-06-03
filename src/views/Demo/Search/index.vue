<script setup lang="ts">
import type { AtFormItemConfig } from '@gupo-admin/components'

const $atSearch = shallowRef<any>()

const model = reactive({
  text1: '',
  text2: '',
  date: null,
  dateRange1: null,
  dateRange2: null,
})
const configs: AtFormItemConfig[] = [
  {
    type: 'input',
    field: 'text1',
  },
  {
    type: 'input',
    field: 'text2',
  },
  {
    type: 'datePicker',
    field: 'date',
  },
  {
    type: 'datePicker',
    field: 'dateRange1',
    props: {
      type: 'daterange',
    },
  },
  {
    type: 'datePicker',
    field: 'dateRange1',
    props: {
      type: 'daterange',
    },
  },
  {
    type: 'input',
    field: 'text1',
  },
  {
    type: 'input',
    field: 'text2',
  },
  {
    type: 'datePicker',
    field: 'date',
  },
]

function search() {
  console.warn(model, $atSearch.value.$atForm.validate)
}
</script>

<template>
  <AtPageContainer>
    <AtSearch ref="$atSearch" :model="model" :configs="configs" min-width="250px" @search="search" />
  </AtPageContainer>
</template>
