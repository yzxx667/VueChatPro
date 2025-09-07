import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // define: {
  //   // 为浏览器环境提供process.env的polyfill
  //   'process.env': JSON.stringify({
  //     NODE_ENV: 'production',
  //   }),
  // },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueChat',
      fileName: 'vue-chat',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue', '@element-plus/icons-vue', 'element-plus'],
      output: {
        format: 'umd',
        name: 'VueChat', // 浏览器全局变量
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
