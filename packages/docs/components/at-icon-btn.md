# AtIconBtn

按钮图标，避免写 `template #icon` 这个繁琐操作，支持 `AtIcon` 和 `NButton` 的所有属性。

### props

```ts
export interface AtIconButtonProps extends /* @vue-ignore */ ButtonProps {
  icon: string | Component
  /** 图标旋转 */
  spin?: boolean
  /** 图标接收的 props */
  atIconProps?: AtIconProps
}
```

### demo

<demo src="../examples/at-icon/at-icon-btn.vue"></demo>
