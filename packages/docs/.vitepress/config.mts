import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Art-Admin',
  description: '一个基于 vue3+vite+naive-ui 的中后台模板, 拥有一套可扩展并且功能丰富的组件库, 以及完善的使用文档',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/quick-start' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'AtIcon', link: '/components/at-icon' },
            { text: 'AtIconBtn', link: '/components/at-icon-btn' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
