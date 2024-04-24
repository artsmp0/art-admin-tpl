import type { IconProps } from 'naive-ui'
import type { Component } from 'vue'

export interface AtIconProps {
  /** 针对 naive icon 的配置 */
  iconProps?: Omit<IconProps, 'themeOverrides' | 'component'>
  /** 针对 SvgIcon 的配置 */
  svgIconProps?: {
    color?: string
    size?: string
    spin?: boolean
  }
  icon: string | Component
}
