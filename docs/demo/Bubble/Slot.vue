<template>
  <div style="display: flex; flex-direction: column;">
    <el-text class="mx-1" type="primary" size="large">自定义头部和尾部</el-text>
    <Bubble content="hello" :typing="{ step: 1, interval: 50 }" shape="corner"
      avatar="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp">
      <template #header>我是头部</template>
      <template #footer>我是尾部</template>
    </Bubble>
    <br />
    <el-text class="mx-1" type="primary" size="large">自定义头像和加载状态</el-text>
    <Bubble content="hello" loading shape="corner">
      <template #avatar>我是头像</template>
      <template #loading>我是加载状态...</template>
    </Bubble>
  </div>
</template>

<script setup lang="ts">
import { Bubble } from 'vue-chat-pro'
</script>

<style scoped></style>
