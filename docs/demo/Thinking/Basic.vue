<template>
  <div>
    <Thinking v-model="thinking" content="思考中..." />
  </div>
</template>

<script setup lang="ts">
import { Thinking } from 'vue-chat-pro'
import { ref } from 'vue'
const thinking = ref<boolean>(false)
</script>

<style scoped></style>