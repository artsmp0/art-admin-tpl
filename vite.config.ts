import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'

const iconDirs = [fileURLToPath(new URL('./src/assets/icons', import.meta.url))]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    createSvgIconsPlugin({
      iconDirs,
      symbolId: 'icon-[dir]-[name]',
    }),
    Components({
      dts: './types/components.d.ts',
      dirs: ['src/components'],
      extensions: ['vue', 'tsx', 'jsx'],
      resolvers: [],
    }),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
      ],
    }),
  ],
})
