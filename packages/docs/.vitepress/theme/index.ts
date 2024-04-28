import theme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import '@art-admin/components/es/style.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import DemoBlock from '../components/DemoBlock.vue'

export default {
  ...theme,
  enhanceApp({ app }) {
    app.component('Demo', DemoBlock)
  },
} satisfies Theme
