<template>
  <div style="display: flex; gap: 30px; flex-direction: column; align-items: flex-start; justify-content: flex-start;">
    <div>
      <Thinking v-model="thinking1" disabled content="欢迎使用 Vue3_Chat" status="start" />
    </div>

    <div>
      <Thinking v-model="thinking2" disabled content="欢迎使用 Vue3_Chat" status="thinking" />
    </div>

    <div>
      <Thinking v-model="thinking3" disabled content="欢迎使用 Vue3_Chat" status="end" />
    </div>

    <div>
      <Thinking v-model="thinking4" disabled content="欢迎使用 Vue3_Chat" status="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Thinking } from 'vue-chat-pro'
import type { ThinkingStatus } from 'vue-chat-pro/types'
const statusValue = ref<ThinkingStatus>('thinking')
import { ref } from 'vue'
const thinking1 = ref(false)
const thinking2 = ref(false)
const thinking3 = ref(false)
const thinking4 = ref(false)
</script>

<style scoped></style>