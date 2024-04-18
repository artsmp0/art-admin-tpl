import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerAttributifyJsx, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerDirectives(), transformerAttributifyJsx()],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      info: 'var(--info-color)',
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
    },
  },
})
