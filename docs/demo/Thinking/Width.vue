<template>
  <div>
    <Thinking v-model="thinking1" button-width="250px" max-width="100%" content="欢迎使用 Vue3_Chat" />
  </div>
</template>

<script setup lang="ts">
import Thinking from '@/components/Thinking/Thinking.vue'
import { ref } from 'vue'
const thinking1 = ref<boolean>(false)
</script>

<style scoped></style>