# AtForm

一个声明式的支持自动处理联动依赖关系的表单封装。

### props

```ts
export interface AtFormProps {
  configs: FormItemConfig[]
  layout?: GridProps
  model: object
  initValue?: object
  scrollToFirstError?: boolean
  nFormProps?: Omit<FormProps, 'themeOverrides' | 'model'>
  titleBarCls?: string
}
const model = defineModel<Recordable>('model', { required: true })
```

### demos

<demo title="支持的所有表单类型" src="../examples/at-form/basic.vue"></demo>
<demo title="一个三级联动的例子" src="../examples/at-form/linked-form.vue"></demo>
<demo title="响应式配置例子" src="../examples/at-form/reactive-form.vue"></demo>
