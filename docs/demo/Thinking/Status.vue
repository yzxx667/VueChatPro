<template>
  <div style="display: flex; gap: 30px; flex-direction: column; align-items: flex-start; justify-content: flex-start;">
    <div>
      <Thinking v-model="thinking1" content="开始思考" status="start" />
    </div>
    <div>
      <Thinking v-model="thinking2" content="思考中..." status="thinking" />
    </div>
    <div>
      <Thinking v-model="thinking3" content="思考完成" status="end" />
    </div>
    <div>
      <Thinking v-model="thinking4" content="思考错误" status="error" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { Thinking } from 'vue-chat-pro'
import { ref } from 'vue'
const thinking1 = ref(false)
const thinking2 = ref(false)
const thinking3 = ref(false)
const thinking4 = ref(false)
</script>

<style scoped></style>