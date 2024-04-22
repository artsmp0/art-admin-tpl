import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

const componentIndex = fileURLToPath(new URL('./index.ts', import.meta.url))
const preserveModulesRoot = fileURLToPath(new URL('.', import.meta.url))
const outputEs = fileURLToPath(new URL('./es', import.meta.url))
const componentDir = fileURLToPath(new URL('./packages/components', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    dts({ outDir: outputEs }),
    Components({ dts: false, dirs: ['src/components', componentDir], extensions: ['vue', 'tsx', 'jsx'], resolvers: [NaiveUiResolver()] }),
    AutoImport({
      dts: false,
      imports: [
        'vue',
        { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] },
      ],
    }),
  ],
  build: {
    lib: {
      entry: componentIndex,
    },
    rollupOptions: {
      external: ['vue', 'naive-ui'],
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
