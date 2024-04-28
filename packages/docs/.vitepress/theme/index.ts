import theme from 'vitepress/theme'
import { type Theme, useData } from 'vitepress'
import '@art-admin/components/es/style.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import { h } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import DemoBlock from '../components/DemoBlock.vue'

export default {
  ...theme,
  enhanceApp({ app }) {
    app.component('Demo', DemoBlock)
  },

  Layout() {
    const { isDark } = useData()

    return h(NConfigProvider, { theme: isDark.value ? darkTheme : null }, {
      default: () => h(theme.Layout),
    })
  },
} satisfies Theme
