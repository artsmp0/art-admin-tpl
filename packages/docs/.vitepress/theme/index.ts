import theme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './rainbow.css'
import './vars.css'
import './overrides.css'
import 'virtual:uno.css'
import '@art-admin/components/es/style.css'
import 'virtual:svg-icons-register'
import { h, watch } from 'vue'
import { setup } from '@css-render/vue3-ssr'
import NaiveLayout from '../components/NaiveLayout.vue'
import DemoBlock from '../components/DemoBlock.vue'

let homePageStyle: HTMLStyleElement | undefined
export default {
  ...theme,
  enhanceApp({ app, router }) {
    app.component('Demo', DemoBlock)
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
    if (typeof window === 'undefined')
      return

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true },
    )
  },

  Layout() {
    return h(NaiveLayout)
  },
} satisfies Theme

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome'))
    document.documentElement.classList.add('browser-chrome')
  else if (browser.includes('firefox'))
    document.documentElement.classList.add('browser-firefox')
  else if (browser.includes('safari'))
    document.documentElement.classList.add('browser-safari')
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
