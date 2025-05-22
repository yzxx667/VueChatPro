<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <el-radio-group v-model="activeName">
      <el-radio-button value="enter">
        enter
      </el-radio-button>
      <el-radio-button value="shiftEnter">
        shiftEnter
      </el-radio-button>
    </el-radio-group>
    <Sender v-model="senderValue" :submit-type="activeName" :loading="senderLoading" @onSubmit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sender from '@/components/Sender/Sender.vue'
import type { SenderProps } from '@/components/Sender/types'
import { ElMessage } from 'element-plus'
const activeName = ref<SenderProps['submitType']>('enter')
const senderValue = ref('')
const senderLoading = ref(false)

const handleSubmit = (value: string) => {
  ElMessage.info(`发送中`)

  senderLoading.value = true
  setTimeout(() => {
    // 可以在控制台 查看打印结果
    console.log('submit-> value：', value)
    console.log('submit-> senderValue', senderValue.value)
    senderLoading.value = false
    ElMessage.success(`发送成功`)
  }, 2000)
}
</script>

<style scoped></style>