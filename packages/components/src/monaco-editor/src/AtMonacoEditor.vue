<script setup lang="ts">
import type { editor } from 'monaco-editor'
import loader from '@monaco-editor/loader'
import { useThemeVars } from 'naive-ui'
import useFormItem from 'naive-ui/es/_mixins/use-form-item'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import type { AtMonacoEditorProps } from './type'

defineOptions({
  name: 'GpMonacoEditor',
})

const props = withDefaults(defineProps<AtMonacoEditorProps>(), {
  options: () => ({ readOnly: false, language: 'shell' }),
})

const emit = defineEmits<{
  'blur': []
  'focus': []
  'change': [string]
  'update:value': [string]
  'updateValue': [string]
}>()

let editorInst = null as editor.IStandaloneCodeEditor | null
const formItem = useFormItem({})
const editorRef = shallowRef()
const getValue = () => editorInst?.getValue()
function initMonacoEditor() {
  const dom = editorRef.value
  if (dom) {
    loader.init().then((monaco) => {
      editorInst = monaco.editor.create(dom, {
        ...props.options,
        value: props.defaultValue ?? props.value,
        readOnly: formItem.mergedDisabledRef.value || props.options?.readOnly,
        automaticLayout: true,
        theme: 'vs-dark',
        scrollbar: {
          alwaysConsumeMouseWheel: false,
        },
      })
      editorInst.onDidChangeModelContent(() => {
        const value = editorInst?.getValue() || ''

        emit('update:value', value)
        emit('updateValue', value)
        emit('change', value)
        formItem.nTriggerFormChange()
        formItem.nTriggerFormInput()
      })
      editorInst.onDidBlurEditorWidget(() => {
        emit('blur')
        formItem.nTriggerFormBlur()
      })
      editorInst.onDidFocusEditorWidget(() => {
        emit('focus')
        formItem.nTriggerFormFocus()
      })
    })
  }
}
watch(() => props.value, (val) => {
  if (val !== getValue())
    editorInst?.setValue(val ?? '')
})

watch(() => formItem.mergedDisabledRef.value, (value) => {
  editorInst?.updateOptions({ readOnly: value })
})

onMounted(() => initMonacoEditor())
onUnmounted(() => editorInst?.dispose())

const themes = useThemeVars()
</script>

<template>
  <div
    ref="editorRef"
    class="h300 w-full rounded-base bd-base"
    :style="{
      borderColor: formItem.mergedStatusRef.value === 'error' ? themes.errorColor : undefined,
    }"
  />
</template>
