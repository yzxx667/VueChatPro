<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex;">
      <el-button type="primary" @click="start" :disabled="loading">{{ loading ? '录音中...' : '开始录音' }}</el-button>
      <el-button @click="stop">停止录音</el-button>
    </div>

    <Sender v-model="audioValue">
      <template #actionsList>
        <div class="btn-list">
          <el-button v-if="!loading" :loading="loading" type="primary" circle color="#626aef" @click="handleStart">
            <el-icon>
              <Microphone />
            </el-icon>
          </el-button>

          <el-button v-else type="primary" circle color="#626aef" plain :z-index="99" @click="stop">
            <el-icon class="loading">
              <Loading />
            </el-icon>
          </el-button>
        </div>
      </template>
    </Sender>
  </div>
</template>

<script setup lang="ts">
import Sender from '@/components/Sender/Sender.vue';
import { useAudio } from '@/hooks/useAudio';
// const value = ref('')
const { start, value: audioValue, loading, stop } = useAudio({ lang: 'zh-CN', onEnd: handleEnd, onResult: handleResult })
console.log('audioValue:', audioValue.value)


function handleStart() {
  start()
}
function handleEnd(res: string) {
  console.log('end:', res)
}
function handleResult(res: string) {
  console.log('result:', res)
}
</script>

<style scoped lang="scss">
// 旋转
.loading {
  animation: rotate 1s linear infinite;
}

// 旋转样式
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>