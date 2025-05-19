import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'

const alias = {
  '@': fileURLToPath(new URL('../../src', import.meta.url)),
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue_Chat',
  description: 'A VitePress Site',
  vite: {
    resolve: {
      alias,
    },
  },
  markdown: {
    config(md) {
      md.use(componentPreview, { alias })
      md.use(containerPreview, { alias })
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: 'Welcome 欢迎 👏🏻', link: '/components/welcome' },
          { text: 'Bubble 对话 💬', link: '/components/bubble' },
          { text: 'BubbleList 对话列表 💬', link: '/components/bubbleList' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
