<template>
  <div>
    <div style="display: flex; gap: 10px;margin-bottom: 20px;">
      <el-button @click="callOpenAI" :loading="isLoading" type="primary">开始流式请求</el-button>
      <el-button @click="cancel()" :disabled="!isLoading" type="danger">停止流式请求</el-button>
    </div>
    <Bubble :content="content" :styles="computedStyles" />
  </div>
</template>

<script setup lang="ts">
import Bubble from "@/components/Bubble/Bubble.vue";
import { useStream } from "@/hooks/useStream";
import { computed } from "vue";
import { createFakeSSEStream } from "@/hooks/fakeSSE";
const { startStream, cancel, data, error, isLoading } = useStream()

const computedStyles = {
  content: {
    // backgroundColor: '#f0f2f5',
    padding: '10px',
    borderRadius: '8px'
  },
  header: {},
  footer: {},
  avatar: {}
}

async function callOpenAI() {
  try {
    // 每次调用时创建新的流
    const stream = createFakeSSEStream(3, 1000);
    startStream({
      readableStream: stream,
    })
  } catch (error) {
    console.error('❌ 出错了：', error);
  }
}
// callOpenAI()


const content = computed(() => {
  if (!data.value.length)
    return ''
  let text = ''
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index].data

    try {
      const parsedChunk = JSON.parse(chunk)
      const choice = parsedChunk.choices[0]

      // 处理结束消息
      if (choice.finish_reason === 'stop') {
        console.log('流结束')
        continue
      }

      // 处理内容消息
      if (choice.delta.content) {
        console.log('收到内容:', choice.delta.content)
        text += choice.delta.content
      }
      // 处理开始消息
      else if (choice.delta.role === 'assistant') {
        console.log('流开始')
      }
    }
    catch (error) {
      console.error('解析数据时出错:', error)
    }
  }
  console.log('最终文本:', text)
  return text
})

</script>

<style scoped>
.sse-demo {
  padding: 1rem;
  border: 1px solid #ddd;
  max-width: 400px;
}

button {
  margin-right: 8px;
}

ul {
  margin-top: 12px;
  padding-left: 20px;
}
</style>
