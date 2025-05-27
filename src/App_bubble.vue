<template>
  <div>
    <div style="display: flex;">
      <el-button @click="callOpenAI">开始</el-button>
      <el-button @click="cancel()">停止</el-button>
      <el-button @click="status = 'end'">点我</el-button>
    </div>
    <!-- <Think v-model="isShow" @change="handleChange" :status="status" auto-collapse :content="content.textReason">
      <template #label v-if="status === 'end'">
        思考用时3s
      </template>
</Think> -->
    <br />
    <Bubble :content="content.text"
      avatar="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp">
      <template #thinking>
        <Think v-model="isShow" @change="handleChange" collapse :status="status" :content="content.textReason">
          <template #label v-if="status === 'end'">
            思考用时3s
          </template>
        </Think>
      </template>
    </Bubble>

  </div>
</template>

<script setup lang="ts">
import type { ThinkingStatus } from './components/Thinking/types'
import Think from './components/Thinking/Think.vue'
import Bubble from './components/Bubble/Bubble.vue'
import { ref, computed, watch } from 'vue'
import { useStream } from "@/hooks/useStream";
// import { useXStream } from './hooks/useXStream_orgign';
const isShow = ref<boolean>(true)
const status = ref<ThinkingStatus>('start')
const { startStream, cancel, data, error, isLoading } = useStream()
const handleChange = (value: boolean, status: ThinkingStatus) => {
  console.log('handleChange', value, status)
}

const thinkStatus = ref<ThinkingStatus>('start')


async function callOpenAI() {
  thinkStatus.value = 'thinking'
  const apiKey = 'sk-68c46bf2db2d4bf8b80941300e886cf5'; // ⚠️ 切勿在前端暴露密钥
  const url = 'https://api.deepseek.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const body = {
    // model: 'deepseek-chat',
    model: 'deepseek-reasoner',
    messages: [
      { role: 'system', content: '你是一个有帮助的助手。' },
      { role: 'user', content: '男子100米世界最好的成绩是多少。' },
      // { role: 'user', content: '帮我用js写一个1-100的和的function' },
    ],
    stream: true,
    temperature: 0.7,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`请求失败：${response.status} ${response.statusText}`);
    }
    startStream({
      readableStream: response.body!,
    })
    console.log('data', data.value);

  } catch (error) {
    console.error('❌ 出错了：', error);
  }
}



const content = computed(() => {
  if (!data.value.length)
    return ''
  let textReason = ''
  let text = ''
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index].data

    try {
      const parsedChunk = JSON.parse(chunk).choices[0].delta

      // 优先处理 reasoning_content
      if (parsedChunk.reasoning_content !== null) {
        textReason += parsedChunk.reasoning_content
        // console.log('parsedChunkReason', parsedChunk.reasoning_content)
      }

      // 然后处理 content
      if (parsedChunk.content) {
        text += parsedChunk.content
        // console.log('parsedChunk', parsedChunk.content)
      }
    }
    catch (error) {
      // 这个 结束标识 是后端给的，所以这里这样判断
      // 实际项目中，以项目需要为准
      if (chunk === ' [DONE]') {
        // 处理数据结束的情况
        // console.log('数据接收完毕')
      }
      else {
        console.error('解析数据时出错:', error)
      }
    }
  }
  console.log('textReason', textReason)
  console.log('Text:', text)
  return {
    text,
    textReason
  }
})
watch(() => content.value.text, (newVal) => {
  console.log('content', newVal);
  if (newVal) {
    thinkStatus.value = 'end'
  }
})
</script>

<style scoped lang="scss"></style>