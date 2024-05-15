# AtEmpty

相比 `NEmpty`，主要增加了 `height` 属性，若没传递 `height`，则会自动适应容器高度，并且会居中显示空状态组件。

## props

```ts
export interface AtEmptyProps extends /* @vue-ignore */ EmptyProps {
  height?: string
}
```

## demo

<demo title="基础示例" src="../examples/at-empty/basic.vue"></demo>
<demo title="自定义图标" src="../examples/at-empty/custom-icon.vue"></demo>
