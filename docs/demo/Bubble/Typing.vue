<template>
  <el-button style="float: right" type="primary" @click="text += ' hello world!'">
    点击添加文本
  </el-button>
  <br />
  <Bubble :content="text" :typing="{ step: 1, interval: 50 }"
    avatar="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp">
  </Bubble>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bubble } from 'vue-chat-pro'
const text = ref<string>('hello world！')
</script>

<style scoped></style>
