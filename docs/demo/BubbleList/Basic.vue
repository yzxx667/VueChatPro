<template>
  <div style="margin-bottom: 30px;">
    <el-button @click="handleClick" type="primary">添加AI消息</el-button>
    <el-button @click="handleTop">滚动到顶部</el-button>
  </div>
  <BubbleList ref="bubbleListRef" :items="items" style="height: 200px;overflow: auto;" />
</template>

<script setup lang="ts">
import { BubbleList } from 'vue-chat-pro'
import { reactive, ref } from 'vue';
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
    key: 'perset_ai_1',
  },
])

const bubbleListRef = ref<InstanceType<typeof BubbleList>>()
const handleClick = () => {
  items.push({
    role: 'ai',
    content: 'Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! ',
    headerProps: 'ai头部',
    placement: 'start',
    avatar: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp',
    typing: { step: 5, interval: 20 },
    key: 'perset_ai_' + (items.length + 1),
  })
}
const handleTop = () => {
  bubbleListRef.value?.scrollTo({
    key: 0,
    block: 'nearest',
  })
}
</script>

<style scoped lang="scss"></style>