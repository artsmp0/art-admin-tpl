# 样式

> 本项目默认使用 `scss` 作为样式的预处理器，辅以 `unocss` 进行简单的样式编写。项目使用到的通用样式均放在 `src/styles` 中，`main.scss` 为入口文件。

## 过渡动画

本项目提供了多种过渡动画效果，均在 `src/styles/transition` 文件夹下，以下列出所有支持的过渡动画的名称：
```bash
fade
fade-up
fade-down
fade-slide
fade-scale

list
```

## Unocss

在使用本项目前，需要对于 `原子化 css` 有一定的了解。其有关的配置文件在 `uno.config.ts` 中，并且对其自带的类名进行了一定的扩展：

```ts
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerAttributifyJsx, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives(), transformerAttributifyJsx()],
  theme: {
    colors: {
      // 获取到 Naive UI 使用的主色调、下面依次为 信息、 成功、警告、错误 的颜色。
      // 此处配置后，在代码中可以写形如 bg-primary text-info border-success 等样式类名
      primary: 'var(--primary-color)',
      info: 'var(--info-color)',
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
    },
  },
  shortcuts: [
    {
      // Naive UI 的通用圆角大小
      'rounded-base': 'rounded-[var(--border-radius)]',
      // Naive UI 的明暗色切换时的卡片背景色，及当切换主题色时，这个类名会有黑和白两种颜色
      'bg-base': 'bg-[var(--card-color)]',
      // 同上，只是模态框的背景色
      'bg-modal': 'bg-[var(--modal-color)]',
      // 同上，只是字体颜色
      'text-base': 'text-[var(--text-color-1)]',
      // 同上，只是表示阴影
      'shadow-base': 'shadow-[--box-shadow-1]',
    },
    // 等同于基础边框，使用：bd-base bd-base-l:表示仅有左边框
    [/^bd-base(-[blrt])?$/, ([, c]) => `border-solid border-#efeff5  dark:border-#ffffff1a ${c ? `border${c}-1` : `border-1`} `],
    // 这个对象里可以把一些通用样式抽离成一个类名
    {
      // 网格居中
      'g-center': 'grid place-content-center',
      // flex 居中
      'f-center': 'flex items-center justify-center',
    },
  ],
})
```

## 使用 Unocss Icon

本项目推荐使用纯 css 图标。其图标种类丰富，只需要安装对应的图标包即可。搜索图标可以看 [icones](https://icones.js.org/) 这个网站。目前本项目只使用到 `@iconify-json/ph` 这个图标库。

当然本项目还提供了 svg icon 以及 naive icon（不推荐），两种图标使用方式，具体请查看 [AtIcon](/components/at-icon) 组件文档。

:::tip
注意：请使用 `i-` 开头去引用图标。
:::
