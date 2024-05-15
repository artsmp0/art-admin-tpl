import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'

const iconDirs = [fileURLToPath(new URL('./examples/at-icon/svg', import.meta.url))]
export default defineConfig({
  plugins: [
    vueJsx(),
    UnoCSS(),
    createSvgIconsPlugin({ iconDirs, symbolId: 'icon-[dir]-[name]' }),
  ],
  ssr: {
    noExternal: ['naive-ui', 'date-fns', 'vueuc'],
  },

})
