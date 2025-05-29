<template>
  <Conversations v-model:active-key="activeKey" :items="items" style="width: 300px" />
</template>

<script setup lang="ts">
import Conversations from '@/components/Conversation/Conversation.vue'
import type { Conversation } from '@/components/Conversation/types'
import { ref } from 'vue'

const items: Conversation[] = Array.from({ length: 4 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
  disabled: index === 3,
}))
const activeKey = ref('item1')
</script>

<style scoped></style>