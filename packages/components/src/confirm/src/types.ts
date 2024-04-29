import type { PopconfirmProps } from 'naive-ui'
import type { AtIconButtonProps } from '../../icon'

export interface AtConfirmProps {
  message: string
  buttonProps?: /* @vue-ignore */ AtIconButtonProps
  confirmProps?: /* @vue-ignore */ Omit<PopconfirmProps, 'onPositiveClick' | 'onNegativeClick'>
  onConfirm?: () => Promise<any>
}
