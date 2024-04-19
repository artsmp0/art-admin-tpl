import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const componentIndex = fileURLToPath(new URL('./src/components/index.ts', import.meta.url))
const preserveModulesRoot = fileURLToPath(new URL('./src/components', import.meta.url))
const outputEs = fileURLToPath(new URL('./es', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    dts({ tsconfigPath: './tsconfig.build.json', outDir: outputEs }),
    Components({ dts: './types/components.d.ts', dirs: ['src/components'], extensions: ['vue', 'tsx', 'jsx'], resolvers: [NaiveUiResolver()] }),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
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
