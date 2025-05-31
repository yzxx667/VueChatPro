<template>
  <div class="sse-demo">
    {{ isLoading }}
    <el-button @click="callOpenAI">开始</el-button>
    <el-button @click="cancel()">停止</el-button>
    <Bubble :content="content" :typing="{
      interval: 100,
      step: 10
    }" />
    <br />
    <Bubble :content="content2" :typing="{
      interval: 100,
      step: 10
    }">
      <template #header>
        <div>
          {{ content3 }}
        </div>
      </template>
    </Bubble>
    <!-- <h2>🛰️ 流式消息测试</h2>
    <button @click="start" :disabled="isLoading">开始模拟流</button>
    <button @click="cancel" :disabled="!isLoading">停止接收</button>

    <p v-if="isLoading">接收中...</p>
    <p v-if="error">❌ 出错：{{ error.message }}</p>

    <ul>
      <li v-for="(item, index) in data" :key="index">{{ item.data }}</li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import markdownit from 'markdown-it'
import hljs from 'highlight.js';
import Bubble from "./components/Bubble/Bubble.vue";
import { useStream } from "@/hooks/useStream";
import { computed, ref } from "vue";
import { createFakeSSEStream } from "@/hooks/fakeSSE";
// const fakeStream = createFakeSSEStream(3, 1000);
const { startStream, cancel, data, error, isLoading } = useStream()
// const { stream, data } = ArtStream()
// const data = ref([])
async function callOpenAI() {
  const apiKey = 'sk-68c46bf2db2d4bf8b80941300e886cf5'; // ⚠️ 切勿在前端暴露密钥
  const url = 'https://api.deepseek.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const body = {
    model: 'deepseek-chat',
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

    // const [stream, data] = ArtStream({
    //   readableStream: response.body!,
    // })

    // for await (const chunk of stream) {
    //   // console.log('接收到 chunk:', chunk);
    //   data.value.push(chunk)
    //   // 输出形如: { data: '这是第 1 条消息' }
    // }

    // console.log('全部接收完毕');

    startStream({
      readableStream: response.body!,
    })
    console.log('data', data.value);







    // const result = await response.json();
    // const reply = result.choices?.[0]?.message?.content;

    // console.log('✅ AI 回复：', reply);
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
      const parsedChunk = JSON.parse(chunk).choices[0].delta.content
      console.log('parsedChunk', parsedChunk);
      text += parsedChunk
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
    // console.log('New chunk:', chunk)
  }
  console.log('Text:', text)
  return text
})

const content2 = ref('你好呀')
const content3 = ref('你好呀3')

// const md = markdownit({
//   html: true
// })
// const msgRender = (content: string) => md.render(content)


// const fakeStream = response.body;

// const stream = ArtStream({
//   readableStream: fakeStream,
// });
// console.log('stream', stream);


// (async () => {
//   for await (const chunk of stream) {
//     console.log('接收到 chunk:', chunk);
//     // 输出形如: { data: '这是第 1 条消息' }
//   }

//   console.log('全部接收完毕');
// })();
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
