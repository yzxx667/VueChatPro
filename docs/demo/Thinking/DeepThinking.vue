<template>
  <div>
    <div style="display: flex">
      <el-button @click="callOpenAI" type="primary" :disabled="showOnce">开始请求Open AI</el-button>
    </div>

    <BubbleList ref="bubbleListRef" :items="items" style="height: 200px; overflow: auto">
      <template #header="{ info }">
        <div>
          {{ info.role === 'ai' ? 'VueChat 🍧' : '🧁 用户' }}
        </div>
      </template>
      <template #content="{ info }">
        <Thinking v-if="info.reason" v-model="info.modelValue" :status="info.status" :content="info.reason"
          @change="handleChange" autoCollapse />
        <div>
          {{ info.content }}
        </div>
      </template>
      <template #footer="{ info }">
        <div class="footer-wrapper">
          <div class="footer-container">
            <el-button type="info" :icon="Refresh" size="small" circle />
            <el-button type="success" :icon="Search" size="small" circle />
            <el-button type="warning" :icon="Star" size="small" circle />
            <el-button color="#626aef" :icon="DocumentCopy" size="small" circle />
          </div>
          <div class="footer-time">
            {{ info.role === 'ai' ? '下午 2:32' : '下午 2:33' }}
          </div>
        </div>
      </template>
    </BubbleList>
  </div>
</template>

<script setup lang="ts">
import type { BubbleDataType } from '@/components/BubbleList/BubbleList.vue'
import { DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue'
import type { ThinkingStatus } from '@/components/Thinking/types'
import Thinking from '@/components/Thinking/Thinking.vue'
import BubbleList from '@/components/BubbleList/BubbleList.vue'
import { ref, computed, reactive, watch } from 'vue'
const bubbleListRef = ref<InstanceType<typeof BubbleList>>()
const data = ref<any[]>([])
const showOnce = ref<boolean>(false)
const handleChange = (value: boolean, status: ThinkingStatus) => {
  console.log(value, status)
}



const items = reactive<BubbleDataType[]>([
  {
    role: 'user',
    content: '男子100米世界最好的成绩是多少。（请用中文回答， 10个字以内）',
    headerProps: 'user头部',
    modelValue: true,
    placement: 'end',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    key: `persit_0`,
  }
])



// 模拟数据生成函数
function createMockResponse() {
  const mockData = [
    {
      data: JSON.stringify({
        choices: [{
          delta: {
            reasoning_content: "让我思考一下...\n"
          }
        }]
      })
    },
    {
      data: JSON.stringify({
        choices: [{
          delta: {
            reasoning_content: "我需要查找男子100米的世界纪录...\n"
          }
        }]
      })
    },
    {
      data: JSON.stringify({
        choices: [{
          delta: {
            reasoning_content: "根据最新数据，男子100米世界纪录是9.58秒，由博尔特创造。\n"
          }
        }]
      })
    },
    {
      data: JSON.stringify({
        choices: [{
          delta: {
            content: "9.58秒"
          }
        }]
      })
    },
    {
      data: ' [DONE]'
    }
  ]

  return mockData
}

async function callOpenAI() {
  showOnce.value = true
  // 添加新的消息项
  items.push({
    role: 'ai',
    content: '',
    headerProps: 'ai头部',
    reason: '',
    modelValue: true,
    status: 'thinking',
    placement: 'start',
    avatar: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp',
    loading: true,
    key: `persit_${items.length}`,
    transparent: true
  })

  // 使用模拟数据
  const mockResponse = createMockResponse()

  // 模拟流式响应
  for (const chunk of mockResponse) {
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟延迟
    data.value.push(chunk)
  }
}

const content = computed(() => {
  if (!data.value.length) return { text: '', textReason: '' }
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
    } catch (error) {
      if (chunk === ' [DONE]') {
        // 处理数据结束的情况
      } else {
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
watch(
  () => content.value,
  newVal => {
    if (items.length > 0) {
      const lastItem = items[items.length - 1]
      if (lastItem.role === 'ai') {
        if (newVal.text.length > 0) {
          lastItem.content = newVal.text
          lastItem.status = 'end'
          lastItem.loading = false
        }
        if (newVal.textReason.length > 0) {
          lastItem.reason = newVal.textReason
          lastItem.loading = false
        }
      }
    }
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.footer-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;

  .footer-time {
    font-size: 12px;
    margin-top: 3px;
  }
}

.footer-container {
  :deep(.el-button+.el-button) {
    margin-left: 8px;
  }
}
</style>
