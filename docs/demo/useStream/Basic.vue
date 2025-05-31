<template>
  <div>
    <div style="display: flex; gap: 10px;margin-bottom: 20px;">
      <el-button @click="callOpenAI" :loading="isLoading" type="primary">开始流式请求</el-button>
      <el-button @click="cancel()" :disabled="!isLoading" type="danger">停止流式请求</el-button>
    </div>
    <Bubble :content="content" :styles="computedStyles" v-if="content" />
  </div>
</template>

<script setup lang="ts">
import { Bubble } from 'vue-chat-pro'
import { useStream } from 'vue-chat-pro'
import { computed } from 'vue'
const { startStream, cancel, data, error, isLoading } = useStream()

/**
 * 创建一个模拟的 SSE 数据流
 * @param messageCount 要生成的消息数量
 * @param interval 每条消息之间的间隔时间（毫秒）
 * @returns ReadableStream<Uint8Array>
 */
function createFakeSSEStream(
  messageCount: number,
  interval: number
): ReadableStream<Uint8Array> {
  let messageIndex = 0;

  return new ReadableStream({
    async start(controller) {
      // 模拟流式响应开始
      const startMessage = {
        id: crypto.randomUUID(),
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: "deepseek-reasoner",
        system_fingerprint: "fp_5417b77867_prod0425fp8",
        choices: [
          {
            index: 0,
            delta: {
              role: "assistant",
              content: null,
              reasoning_content: "",
            },
            logprobs: null,
            finish_reason: null,
          },
        ],
      };
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify(startMessage)}\n\n`)
      );
    },
    async pull(controller) {
      if (messageIndex >= messageCount) {
        // 发送结束标记
        const doneMessage = {
          id: crypto.randomUUID(),
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: "deepseek-reasoner",
          system_fingerprint: "fp_5417b77867_prod0425fp8",
          choices: [
            {
              index: 0,
              delta: {},
              logprobs: null,
              finish_reason: "stop",
            },
          ],
        };
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify(doneMessage)}\n\n`)
        );
        controller.close();
        return;
      }

      // 等待指定的时间间隔
      await new Promise((resolve) => setTimeout(resolve, interval));

      // 构造 SSE 格式的消息
      const message = {
        id: crypto.randomUUID(),
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: "deepseek-reasoner",
        system_fingerprint: "fp_5417b77867_prod0425fp8",
        choices: [
          {
            index: 0,
            delta: {
              content: `这是第 ${messageIndex + 1} 条消息  `,
              reasoning_content: "",
            },
            logprobs: null,
            finish_reason: null,
          },
        ],
      };

      // 发送 SSE 格式的数据
      const sseMessage = `data: ${JSON.stringify(message)}\n\n`;
      controller.enqueue(new TextEncoder().encode(sseMessage));

      messageIndex++;
    },
  });
}


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
  // console.log('最终文本:', text)
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
