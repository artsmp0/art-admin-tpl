# AtConfirm

`NConfirm` 在确认按钮点击时，不支持异步显示 `loading`，并且写起来一堆 `template` 略显麻烦，所以有了这个组件。并且它的触发按钮采用 [AtIconBtn](/components/at-icon-btn)

### props

```ts
interface Props {
  message: string
  buttonProps?: /* vue-ignore */ ButtonProps
  onConfirm?: () => Promise<any>
}
```

### demo

<demo title="基础示例" src="../examples/at-confirm/basic.vue"></demo>
<demo title="自定义 Popconfirm 和触发按钮" src="../examples/at-confirm/custom-button.vue"></demo>
