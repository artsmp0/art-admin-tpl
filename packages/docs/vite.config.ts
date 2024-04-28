import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const iconDirs = [fileURLToPath(new URL('./examples/at-icon/svg', import.meta.url))]

export default defineConfig({
  plugins: [UnoCSS(), createSvgIconsPlugin({ iconDirs, symbolId: 'icon-[dir]-[name]' })],
})
