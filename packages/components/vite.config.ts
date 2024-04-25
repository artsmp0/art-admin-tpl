import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const iconDirs = [fileURLToPath(new URL('./src/svg', import.meta.url))]
const componentIndex = fileURLToPath(new URL('./src/index.ts', import.meta.url))
const preserveModulesRoot = fileURLToPath(new URL('./src', import.meta.url))
const outputEs = fileURLToPath(new URL('./es', import.meta.url))
const componentDir = fileURLToPath(new URL('./packages/components', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    createSvgIconsPlugin({ iconDirs, symbolId: 'icon-[dir]-[name]' }),
    dts({ outDir: outputEs }),
    Components({ dts: true, dirs: ['src/components', componentDir], extensions: ['vue', 'tsx', 'jsx'], resolvers: [NaiveUiResolver()] }),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        'vue-router',
        { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] },
      ],
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: componentIndex,
    },
    rollupOptions: {
      external: [
        'vue',
        /^naive-ui/,
        'vue-router',
        'lodash-unified',
        '@vueuse/core',
        'sortablejs',
        '@monaco-editor/loader',
      ],
      output: [
        {
          format: 'esm',
          dir: outputEs,
          exports: undefined,
          preserveModules: true,
          preserveModulesRoot,
          entryFileNames: `[name].mjs`,
        },
      ],
    },
  },
})
