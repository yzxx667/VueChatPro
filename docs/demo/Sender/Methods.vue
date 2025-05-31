<template>
  <div style="display: flex;flex-direction: column;gap: 10px;">
    <div style="display: flex;">
      <el-button type="primary" @click="handleSubmit" :disabled="!value">提交内容</el-button>
      <el-button type="warning" @click="handleClear" :disabled="!value">清空内容</el-button>
    </div>
    <Sender ref="senderRef" v-model="value" placeholder="请输入内容" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sender } from 'vue-chat-pro'
import { ElMessage } from 'element-plus'
const value = ref('')
const senderRef = ref<InstanceType<typeof Sender>>()

const handleSubmit = () => {
  senderRef.value?.handleInputSubmit()
  ElMessage.success('提交成功')
}

const handleClear = () => {
  senderRef.value?.handleInputClear()
  ElMessage.success('清空成功')
}
</script>

<style scoped></style>