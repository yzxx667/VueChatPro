<template>
  <div>
    点击切换：
    <ElSwitch v-model="isLoading" />
  </div>
  <Bubble content="hello world!" :loading="isLoading"
    avatar="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bubble } from 'vue-chat-pro'
const isLoading = ref<boolean>(true)
</script>

<style scoped></style>
