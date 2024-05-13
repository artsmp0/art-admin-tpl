<script setup lang="ts">
import { type InputProps, NInput } from 'naive-ui'
import { ref } from 'vue'
import { AtIcon } from '../../icon'

defineOptions({
  name: 'AtSearchInput',
})

const props = withDefaults(
  defineProps<Props>(),
  { placeholder: '按回车搜索' },
)
const emit = defineEmits<{
  search: [string]
}>()
interface Props extends /* @vue-ignore */ InputProps {}

const value = ref('')

function handleSearch(clear = false) {
  if (clear)
    value.value = ''
  emit('search', value.value)
}
</script>

<template>
  <NInput v-bind="{ ...props, ...$attrs }" v-model:value="value" clearable @keydown.enter="handleSearch()" @clear="handleSearch(true)">
    <template #prefix>
      <AtIcon icon="i-ph-magnifying-glass-duotone" />
    </template>
  </NInput>
</template>
