import type { ButtonProps, IconProps } from 'naive-ui'
import type { Component } from 'vue'

export interface AtIconProps {
  /** 针对 naive icon 的配置 */
  iconProps?: /* @vue-ignore */ Omit<IconProps, 'themeOverrides' | 'component'>
  size?: string
  spin?: boolean
  icon: string | Component
}

export interface AtIconButtonProps extends /* @vue-ignore */ ButtonProps {
  icon?: string | Component
  spin?: boolean
  atIconProps?: AtIconProps
}
