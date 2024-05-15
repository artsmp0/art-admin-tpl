<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { useFormItem } from 'naive-ui/es/_mixins'
import { computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const emit = defineEmits<{
  'update:value': [string]
}>()

const localVal = computed({
  get() {
    return props.value
  },
  set(newV) {
    emit('update:value', newV)
  },
})

// const value = defineModel<string>('value', { local: false, required: true });
const formItem = useFormItem({})
const themes = useThemeVars()
</script>

<template>
  <div w-full>
    <input
      v-model="localVal"
      type="text"
      class="outline-none w-full p1 bg-gray/10"
      :style="{
        border: `1px solid ${themes.primaryColor}`,
        borderColor: formItem.mergedStatusRef.value === 'error' ? themes.errorColor : themes.primaryColor,
      }"
      @blur="formItem.nTriggerFormBlur"
      @focus="formItem.nTriggerFormFocus"
    >
  </div>
</template>
