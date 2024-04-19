import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'

const componentIndex = fileURLToPath(new URL('./index.ts', import.meta.url))
const preserveModulesRoot = fileURLToPath(new URL('.', import.meta.url))
const outputEs = fileURLToPath(new URL('./es', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    dts({ outDir: outputEs }),
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
