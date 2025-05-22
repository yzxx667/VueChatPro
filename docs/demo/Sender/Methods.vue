<template>
  <div style="display: flex;flex-direction: column;gap: 10px;">
    <el-button @click="senderRef?.handleInputSubmit">提交内容</el-button>
    <el-button @click="senderRef?.handleInputClear">清空内容</el-button>
    <Sender ref="senderRef" v-model="value" placeholder="请输入内容" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sender from '@/components/Sender/Sender.vue';
const value = ref('')
const senderRef = ref()


</script>

<style scoped></style>