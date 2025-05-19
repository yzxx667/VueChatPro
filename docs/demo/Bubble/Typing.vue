<template>
  <el-button style="float: right" type="primary" @click="text += ' hello world!'">
    点击添加文本
  </el-button>
  <br />
  <Bubble :content="text" :typing="{ step: 1, interval: 50 }"
    avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
  </Bubble>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bubble from '@/components/Bubble/Bubble.vue'
const text = ref('hello world！')
</script>

<style scoped></style>
