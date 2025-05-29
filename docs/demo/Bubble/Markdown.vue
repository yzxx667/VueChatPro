<template>
  <Bubble :content="text" typing
    avatar="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
    :message-render="msgRender" />
</template>

<script setup lang="ts">
import Bubble from '@/components/Bubble/Bubble.vue'
import markdownit from 'markdown-it'
const md = markdownit({ html: true })
const text = `
> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)
`.trim()
const msgRender = (text: string) => md.render(text)
</script>

<style scoped></style>
