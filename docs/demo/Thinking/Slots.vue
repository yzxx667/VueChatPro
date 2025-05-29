<template>
  <el-radio-group v-model="statusValue" style="margin-bottom: 12px;">
    <el-radio-button value="start">
      start
    </el-radio-button>
    <el-radio-button value="thinking">
      thinking
    </el-radio-button>
    <el-radio-button value="end">
      end
    </el-radio-button>
    <el-radio-button value="error">
      error
    </el-radio-button>
  </el-radio-group>

  <Thinking v-model="thinking" :status="statusValue" content="欢迎使用 Vue3_Chat" button-width="200px" max-width="100%">
    <template #icon="{ status }">
      <span v-if="status === 'start'">😄</span>
      <span v-else-if="status === 'error'">😭</span>
      <span v-else-if="status === 'thinking'">🤔</span>
      <span v-else-if="status === 'end'">😊</span>
    </template>

    <template #label="{ status }">
      <span v-if="status === 'start'">有什么指示嘛？</span>
      <span v-else-if="status === 'thinking'">容我想想</span>
      <span v-else-if="status === 'end'">想出来了</span>
      <span v-else-if="status === 'error'">想不出来</span>
    </template>

    <template #arrow>
      <span>👇</span>
    </template>

    <template #content="{ content, status }">
      <span>{{ status }}: {{ content }}</span>
    </template>

    <template #error>
      <span>抱歉，无法解决您的问题</span>
    </template>
  </Thinking>
</template>

<script setup lang="ts">
import Thinking from '@/components/Thinking/Thinking.vue'
import { ref } from 'vue'
const thinking = ref(false)
const statusValue = ref('start')
</script>

<style scoped></style>