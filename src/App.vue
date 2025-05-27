<template>
  <div>
    <div style="display: flex;">
      <el-button @click="callOpenAI">开始</el-button>
      <el-button @click="cancel()">停止</el-button>
      <el-button @click="status = 'end'">点我</el-button>
    </div>

    <div style="margin-bottom: 30px;">
      <el-button @click="handleClick" type="primary">add message</el-button>
      <el-button @click="handleTop">scroll to Top</el-button>
    </div>
    <BubbleList ref="bubbleListRef" :items="items" :roles="roles" style="height: 200px;overflow: auto;">
      <template #thinking="{ info }">
        <Thinking v-if="info.reason" v-model="info.modelValue" :status="info.status" :content="info.reason" />
      </template>
    </BubbleList>
  </div>
</template>

<script setup lang="ts">
import type { ThinkingStatus } from './components/Thinking/types'
import Thinking from './components/Thinking/Think.vue'
import Bubble from './components/Bubble/Bubble.vue'
import BubbleList from "@/components/BubbleList/BubbleList.vue";
import { ref, computed, reactive, watch } from 'vue'
import { useStream } from "@/hooks/useStream";
// import { useXStream } from './hooks/useXStream_orgign';
const isShow = ref<boolean>(true)
const status = ref<ThinkingStatus>('start')
const { startStream, cancel, data, error, isLoading } = useStream()
const handleChange = (value: boolean, status: ThinkingStatus) => {
  console.log(value, status)
}

interface MessageItem {
  role: string;
  content: string;
  headerProps?: string;
  reason?: string;
  modelValue?: boolean;
  status?: string;
}

const items = reactive<MessageItem[]>([
  {
    role: 'user',
    content: 'Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! ',
    headerProps: 'user头部'
  },
  // {
  //   role: 'ai',
  //   content: 'Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! ',
  //   headerProps: 'ai头部',
  //   reason: '我在思考!',
  //   modelValue: true,
  //   status: 'thinking',
  //   typing: false
  // },
  // {
  //   role: 'user',
  //   content: 'Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! ',
  //   headerProps: 'user头部'
  // },
])

const roles = {
  ai: {
    placement: 'start',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    typing: { step: 1, interval: 20 },
  },
  user: {
    placement: 'end',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  },
}

const bubbleListRef = ref()
const handleClick = () => {
  console.log(items);

}
const handleTop = () => {
  bubbleListRef.value?.scrollTo({
    key: 0,
    block: 'nearest',
  })
}

async function callOpenAI() {
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
      { role: 'user', content: '男子100米世界最好的成绩是多少。（请用中文回答， 10个字以内）' },
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
    items.push({
      role: 'ai',
      content: '',
      reason: '',
      modelValue: true,
      status: 'thinking',
    })
  } catch (error) {
    console.error('❌ 出错了：', error);
  }
}

const content = computed(() => {
  if (!data.value.length)
    return { text: '', textReason: '' }
  let textReason = ''
  let text = ''
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index].data

    try {
      const parsedChunk = JSON.parse(chunk).choices[0].delta

      // 优先处理 reasoning_content
      if (parsedChunk.reasoning_content !== null) {
        textReason += parsedChunk.reasoning_content
      }

      // 然后处理 content
      if (parsedChunk.content) {
        text += parsedChunk.content
      }
    }
    catch (error) {
      if (chunk === ' [DONE]') {
        // 处理数据结束的情况
      }
      else {
        console.error('解析数据时出错:', error)
      }
    }
  }
  return {
    text,
    textReason
  }
})

// 监听content变化，更新items中最后一个对象的content和reason
watch(() => content.value, (newVal) => {
  if (items.length > 0) {
    const lastItem = items[items.length - 1]
    if (lastItem.role === 'ai') {
      lastItem.content = newVal.text
      lastItem.reason = newVal.textReason
    }
  }
}, { deep: true })
</script>

<style scoped lang="scss"></style>