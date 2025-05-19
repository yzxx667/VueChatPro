<template>
  <div style="display: flex; flex-direction: column;">
    <el-text class="mx-1" type="primary" size="large">自定义头部和尾部</el-text>
    <Bubble content="hello" :typing="{ step: 1, interval: 50 }" shape="corner"
      avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
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
import Bubble from '@/components/Bubble/Bubble.vue'
</script>

<style scoped></style>
