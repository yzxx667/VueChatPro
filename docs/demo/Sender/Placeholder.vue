<template>
  <Sender v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sender } from 'vue-chat-pro'
const value = ref('')
</script>

<style scoped></style>