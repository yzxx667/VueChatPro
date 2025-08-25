import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({ tsconfigPath: './tsconfig.build.json', outDir: 'dist/types' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueChat',
      fileName: 'vue-chat',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@element-plus/icons-vue', 'element-plus'],
      // external: ['vue'],
      output: {
        exports: 'named',
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'vue-chat.css') {
            return 'index.css'
          }
          return chunkInfo.name as string
        },
      },
    },
  },
})
