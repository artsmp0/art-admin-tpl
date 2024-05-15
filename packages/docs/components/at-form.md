# AtForm

一个声明式的支持自动处理联动依赖关系的表单封装。
- 完备的类型提示
- 嵌套表单，支持**对象**或者**对象数组**的形式
- 动态增减表单项
- 自定义标签渲染
- 校验错误滚动到第一个错误项
- 支持代码编辑器，存在和 `naive-ui` 一样的表单域校验状态
- 支持自动 `fetch` 下拉数据
- 支持自动处理表单项之间依赖和外部依赖，仅需声明依赖和依赖处理函数即可。
- 上传文件支持将后端数据转成 `naive-ui` 需要的文件列表
- 上传文件支持 `isSuccess` 判断是否成功上传，返回 `false` 表示上传失败。

## props

```ts
export interface AtFormProps {
  configs: FormItemConfig[]
  layout?: GridProps
  model: object
  /** 重置表单操作发生时使用的值 @default 首次传入的 `model` 对象 */
  initValue?: object
  /** 校验失败滚动到首个失败项 @default true */
  scrollToFirstError?: boolean
  nFormProps?: Omit<FormProps, 'themeOverrides' | 'model'>
  /** titleBar 的类样式 */
  titleBarCls?: string
}
const model = defineModel<Recordable>('model', { required: true })
```
## methods

```ts
defineExpose(
  reactive({
    /** 表单验证，等同于 naive */
    validate,
    /** 表单重置：重置值为初始值并去除校验状态 */
    resetValue,
    /** 表单设置值 */
    setValue,
    /** 去除校验状态 */
    restoreValidation,
    /** 获取真实的 form 元素 */
    getEl() { return (formRef.value as any).$el },
  }),
)
```

## demos

#### 支持的所有表单类型
这里是所有的支持的类型：`input`、`switch`、`inputNumber`、`select`、`cascader`、`datePicker`、`treeSelect`、`radio`、`upload`、`monacoEditor`、`multipleBlock`、`custom`、`titleBar`。

<demo src="../examples/at-form/basic.vue"></demo>

#### 三级联动
该例子展示了如何声明式的处理依赖和动态获取下拉数据。当然你也可以通过响应式配置，来获取异步加载的下拉数据，具体示例请看 [隐藏还是显示？](#隐藏还是显示)。
<demo src="../examples/at-form/linked-form.vue"></demo>

#### 隐藏还是显示？
如果表单要控制某一项的显示隐藏，则必须使用 `computed` 来包裹 `configs`，这样当你的 configs 依赖的响应式数据变化时，表单会更新。如果在这里使用到自定义组件，则还需要使用 `markRaw` 包裹。
<demo src="../examples/at-form/hide-or-show-field.vue"></demo>
