<template>
  <el-text class="mx-1" type="primary">禁用状态</el-text>
  <Sender ref="senderRef" v-model="value" placeholder="请输入内容" disabled />
  <br />
  <el-text class="mx-1" type="success">只读状态</el-text>
  <Sender ref="senderRef2" v-model="value2" readonly />
  <br />
  <el-text class="mx-1" type="info">Loading状态</el-text>
  <Sender ref="senderRef3" v-model="value3" loading />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sender } from 'vue-chat-pro'
const value = ref('')
const value2 = ref('只读状态')
const value3 = ref('loading状态')
const senderRef = ref<InstanceType<typeof Sender>>()
const senderRef2 = ref<InstanceType<typeof Sender>>()
const senderRef3 = ref<InstanceType<typeof Sender>>()
</script>

<style scoped></style>
loading