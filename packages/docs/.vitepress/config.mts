import { defineConfig } from 'vitepress'
import { applyPlugins } from './plugins/code'

const fileAndStyles: Record<string, string> = {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Art-Admin',
  description: '一个基于 vue3+vite+naive-ui 的中后台模板, 拥有一套可扩展并且功能丰富的组件库, 以及完善的使用文档',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    outline: { level: 'deep' },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '^/guide/' },
      { text: '组件', link: '/components/', activeMatch: '^/components/' },
    ],
    sidebar: {
      '/guide/': [
        {
          items: [
            { text: '项目介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '配置与主题', link: '/guide/settings' },
            { text: '路由与菜单', link: '/guide/routes-and-menus' },
            { text: '样式', link: '/guide/style' },
          ],
        },
      ],
      '/components/': [
        {
          items: [
            { text: 'AtIcon', link: '/components/at-icon' },
            { text: 'AtIconBtn', link: '/components/at-icon-btn' },
            { text: 'AtConfirm', link: '/components/at-confirm' },
            { text: 'AtEmpty', link: '/components/at-empty' },
            { text: 'AtExpandTransition', link: '/components/at-expand-transition' },
            { text: 'AtIconMessage', link: '/components/at-icon-message' },
            { text: 'AtLoading', link: '/components/at-loading' },
            { text: 'AtMonacoEditor', link: '/components/at-monaco-editor' },
            { text: 'AtPageContainer', link: '/components/at-page-container' },
            { text: 'AtSearchInput', link: '/components/at-search-input' },
            { text: 'AtPageHeader', link: '/components/at-page-header' },
            { text: 'AtUpload', link: '/components/at-upload' },
            { text: 'AtForm', link: '/components/at-form' },
            { text: 'AtSearch', link: '/components/at-search' },
            { text: 'AtTable', link: '/components/at-table' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config(md) {
      applyPlugins(md)
    },
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  postRender(context) {
    const styleRegex = /<css-render-style>(([\s\S])+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style)
      fileAndStyles[vitepressPath] = style

    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html)
      return
    const style = fileAndStyles[`/${html}`]
    if (style)
      return code.replace(/<\/head>/, `${style}</head>`)
  },
})
