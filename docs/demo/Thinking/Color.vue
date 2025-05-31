<template>
  <div>
    <Thinking v-model="thinking1" color="#fff"
      backgroundColor="linear-gradient(to bottom right, rgba(190, 126, 246, 1), rgba(95, 13, 245, 1), rgba(186, 74, 227, 1))"
      :lb="false" content="欢迎使用 Vue3_Chat" />
  </div>
</template>

<script setup lang="ts">
import { Thinking } from 'vue-chat-pro'
import { ref } from 'vue'
const thinking1 = ref(false)
</script>

<style scoped></style>