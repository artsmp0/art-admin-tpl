<!-- eslint-disable new-cap -->
<script setup lang="ts">
import { useDark } from '@vueuse/core'
import * as monaco from 'monaco-editor'
import { useThemeVars } from 'naive-ui'
// @ts-expect-error missing types
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// @ts-expect-error missing types
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// @ts-expect-error missing types
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// @ts-expect-error missing types
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// @ts-expect-error missing types
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import useFormItem from 'naive-ui/es/_mixins/use-form-item'
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

window.MonacoEnvironment = {
  async getWorker(_, label) {
    if (label === 'json')
      return new jsonWorker()

    if (label === 'css' || label === 'scss' || label === 'less')
      return new cssWorker()

    if (label === 'html' || label === 'handlebars' || label === 'razor')
      return new htmlWorker()

    if (label === 'typescript' || label === 'javascript')
      return new tsWorker()

    return new editorWorker()
  },
}

let editorInst = null as monaco.editor.IStandaloneCodeEditor | null
const isDark = useDark()
const curTheme = computed(() => (isDark.value ? 'vs-dark' : 'vs'))
const formItem = useFormItem({})
const editorRef = shallowRef()
const getValue = () => editorInst?.getValue()
function initMonacoEditor() {
  const dom = editorRef.value
  if (dom) {
    editorInst = monaco.editor.create(dom, {
      ...props.options,
      readOnly: formItem.mergedDisabledRef.value || props.options?.readOnly,
      value: props.defaultValue ?? props.value,
      automaticLayout: true,
      theme: curTheme.value,
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
  }
}
watch(
  () => props.value,
  (val) => {
    if (val !== getValue())
      editorInst?.setValue(val ?? '')
  },
)

watch(
  () => formItem.mergedDisabledRef.value,
  (value) => {
    editorInst?.updateOptions({ readOnly: value })
  },
)

watch(
  () => isDark.value,
  () => {
    // editor?.dispose()
    // initMonacoEditor()
    editorInst?.updateOptions({ theme: curTheme.value })
  },
)

onMounted(() => initMonacoEditor())
onUnmounted(() => editorInst?.dispose())

const themes = useThemeVars()
</script>

<template>
  <div
    ref="editorRef"
    class="h300 w-full of-hidden rounded-base bd-base"
    :style="{
      borderColor: formItem.mergedStatusRef.value === 'error' ? themes.errorColor : undefined,
    }"
  />
</template>
