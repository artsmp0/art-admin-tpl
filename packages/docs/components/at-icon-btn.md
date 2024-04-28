# AtIcon

按钮图标，避免写 `template #icon` 这个繁琐操作，支持 `AtIcon` 和 `NButton` 的所有属性。

### props

```ts
export interface AtIconButtonProps extends /* @vue-ignore */ ButtonProps {
  icon: string | Component
  spin?: boolean
  atIconProps?: AtIconProps
}
```

### demo

```vue
<AtIconBtn icon="i-ph-arrow-clockwise-duotone">
  刷新
</AtIconBtn>
```
