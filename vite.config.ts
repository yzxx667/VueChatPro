import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), dts({ tsconfigPath: './tsconfig.build.json' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 库模式
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueChat',
      fileName: 'vue-chat',
    },
    rollupOptions: {
      // 排除
      external: ['vue'],
      output: {
        // 具名导出
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
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
