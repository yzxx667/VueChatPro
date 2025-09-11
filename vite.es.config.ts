import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({ tsconfigPath: './tsconfig.build.json', outDir: 'dist/types' }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    libInjectCss(),
    // visualizer({
    //   open: true, //生成后自动打开浏览器查看
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist/es',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/Bubble/index': resolve(__dirname, 'src/components/Bubble/index.ts'),
        'components/BubbleList/index': resolve(__dirname, 'src/components/BubbleList/index.ts'),
        'components/Conversation/index': resolve(__dirname, 'src/components/Conversation/index.ts'),
        'components/Sender/index': resolve(__dirname, 'src/components/Sender/index.ts'),
        'components/Thinking/index': resolve(__dirname, 'src/components/Thinking/index.ts'),
        'components/Welcome/index': resolve(__dirname, 'src/components/Welcome/index.ts'),
        'hooks/useAudio': resolve(__dirname, 'src/hooks/useAudio.ts'),
        'hooks/useStream': resolve(__dirname, 'src/hooks/useStream.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@element-plus/icons-vue'],
      output: {
        exports: 'named',
        entryFileNames: '[name].js',
      },
    },
  },
})
