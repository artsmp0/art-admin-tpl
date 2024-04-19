import type { GlobalThemeOverrides } from 'naive-ui'
import { normal } from './normal'
import { antd } from './antd'

export type AtTheme = '默认' | 'antd'

export interface ThemeContent {
  dark?: GlobalThemeOverrides
  light: GlobalThemeOverrides
}

export type ThemeMap = Record<AtTheme, ThemeContent>

export const THEME_MAP: ThemeMap = {
  默认: normal,
  antd,
}
