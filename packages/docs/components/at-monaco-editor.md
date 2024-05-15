# AtMonacoEditor

一个支持 naive 表单状态的编辑器。

## props

```ts
export interface AtMonacoEditorProps {
  /** 请查看文档 */
  options?: editor.IStandaloneEditorConstructionOptions
  defaultValue?: string
  value?: string
}
```

## events

```ts
const emit = defineEmits<{
  'blur': []
  'focus': []
  'change': [string]
  'update:value': [string]
  'updateValue': [string]
}>()
```

## demos

<demo src="../examples/at-monaco-editor/basic.vue"></demo>
