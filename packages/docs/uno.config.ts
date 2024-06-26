import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      info: 'var(--info-color)',
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
    },
  },
  shortcuts: [
    {
      'fscw': 'flex justify-start items-center flex-wrap w-full',
      'at-demo_wrapper': 'p3 border border-light-700 rounded-sm dark:bg-dark-700 dark:border-#4C4D4F flex',
      'at-demo_actions': 'flex justify-end pt3 gap2 p2 border-1 border-x-0 border-solid border-gray/20',
      'at-demo_action_item': 'relative outline-none flex justify-center items-center w7 h7 p0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300',
      'at-demo_action_icon': 'c-#4E5969 dark:c-white',
    },
  ],
})
