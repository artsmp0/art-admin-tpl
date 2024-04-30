# AtIcon

该组件同时支持 `Naive Icon`，`Unocss Icon` 以及 `SvgIcon`。

1. 如果使用 Svg Icon 请注意需要配置 [`vite-plugin-svg-icons`](https://github.com/vbenjs/vite-plugin-svg-icons) 这个插件，并且传递的 icon 需要是以 `svg-` 开头的字符串。
2. 如果使用 Naive Icon，需要根据 [Naive 文档](https://www.naiveui.com/zh-CN/os-theme/components/icon) 安装对应的图标包，传递的 icon 属性是对应的图标组件。
3. 如果使用 Unocss Icon，则需要安装 [Unocss](https://unocss.dev/) 以及对应的 [图标包](https://icones.js.org/)，传递的 icon 属性需要是以 `i-` 开头的字符串。

> [!IMPORTANT]
> 注意 vite-plugin-svg-icons 插件的一个配置项 customDomId，默认值是 `__svg__icons__dom__`，@art-admin/components 采用 `__@art-admin/components__svg__icons__dom__`，若是出现重复图标会被覆盖导致无法显示的问题。

## props

```ts
export interface AtIconProps {
  /** 针对 naive icon 的配置 */
  iconProps?: /* @vue-ignore */ Omit<IconProps, 'themeOverrides' | 'component'>
  /** 图标尺寸 */
  size?: string
  /** 是否旋转 */
  spin?: boolean
  /** 图标名称或者组件 */
  icon: string | Component
}
```

### demo

<demo src="../examples/at-icon/at-icon.vue"></demo>
