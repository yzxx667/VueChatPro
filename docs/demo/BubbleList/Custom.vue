<template>
  <BubbleList ref="bubbleListRef" :items="items" style="height: 200px;overflow: auto;">
  </BubbleList>
</template>

<script setup lang="ts">
import { BubbleList } from 'vue-chat-pro'
import { reactive, ref, h } from 'vue';
import type { BubbleDataType } from 'vue-chat-pro/types'
const items = reactive<BubbleDataType[]>([
  {
    role: 'user',
    content: 'Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! ',
    headerProps: 'user头部',
    key: 'perset_user_1',
  },
  {
    role: 'ai',
    content: 'Mock Ai content! Mock Ai content! Mock Ai content! ',
    headerProps: 'ai头部',
    placement: 'start',
    avatar: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp',
    typing: { step: 5, interval: 20 },
    loadingRender: () => h('div', { style: { color: 'red' } }, 'Custom loading...'),
    key: 'perset_ai_1',
    loading: true,
  },
])

const bubbleListRef = ref<InstanceType<typeof BubbleList>>()
</script>

<style scoped lang="scss"></style>