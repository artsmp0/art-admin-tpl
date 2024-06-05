# 项目配置

## env

1. 项目的环境变量配置位于项目根目录下的 `.env`、`.env.development`、`.env.production`。
2. 项目会自动收集环境变量，并生成类型到 `types/env.d.ts` 中。

更详细的配置，具体可以参考 [Vite](https://cn.vitejs.dev/guide/env-and-mode.html) 文档。

```bash
# 一般不需要修改(vite 的 base 配置)
VITE_PUBLIC_PATH=./

# 本地存储时使用的 key
VITE_APP_STORAGE_KEY="dt-standard-pc"

# 是否使用 mock.json 作为路由配置，线上记得关闭
VITE_USE_MOCK_DATA=true

# 默认接口请求路径，一般不做修改，而修改 vite config 的代理地址即可
VITE_APP_API_URL=/dev-api

# 走用户中心需配置
VITE_USER_API_URL=/bmo-auth-api-zhuji/api
VITE_LOGIN_URL=/bmo-auth-pc-zhuji/#/login
```

::: tip
只有以 VITE_ 开头的变量会被嵌入到客户端侧的包中，你可以在项目代码中这样访问它们：
```ts
console.log(import.meta.env.VITE_PROT)
```
:::

## 主题配置

```json
{
  "CUR_THEME": "antd", // 当前主题
  "SHOW_BREADCRUMB": false, // 是否展示面包屑
  "TAB_POSITION": "top", // 标签栏位置
  "SHOW_REFRESH_BTN": true, // 是否显示刷新
  "SHOW_FULLSCREEN_BTN": true, // 是否显示全屏切换
  "SHOW_THEME_BTN": true, // 是否显示明暗主题切换
  "SHOW_AVATAR": true, // 是否展示头像
  "SIDE_WIDTH": 230, // 边栏宽度
  "PAGE_ANIMATION": "fade-up", // 页面过渡动效
  "STORAGE_TAB": true // 是否持久化标签栏
}
```

## 如何新增一个主题
1. 新增一个文件 `src/composables/theme/config/new-theme.ts`，具体配置可参考 `antd` 这个主题：
```ts
import type { ThemeContent } from '.'
export const antd: ThemeContent = {
  light: {
    common: commonLight,
    Radio: {
      // ...
    },
  },
  dark: {
    common: commonDark,
    Button: {
      // ...
    },
  },
}
```

2. 修改 `src/composables/theme/config/index.ts` 文件
```ts
import type { GlobalThemeOverrides } from 'naive-ui'
import { normal } from './normal'
import { antd } from './antd'
import { newTheme } from './new-theme' // [!code ++]

export type AtTheme = '默认' | 'antd' | 'newTheme' // [!code ++]

export interface ThemeContent {
  dark?: GlobalThemeOverrides
  light: GlobalThemeOverrides
}

export type ThemeMap = Record<AtTheme, ThemeContent>

export const THEME_MAP: ThemeMap = {
  默认: normal,
  antd,
  newTheme // [!code ++]
}
```
