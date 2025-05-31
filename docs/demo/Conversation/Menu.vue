<template>
  <Conversation v-model:active-key="activeKey" :items="items" style="width: 300px" :menu="menuConfig" />
</template>

<script setup lang="ts">
import { Conversation } from 'vue-chat-pro'
import type { ConversationProps } from 'vue-chat-pro/types'
import { AddLocation, Aim, AlarmClock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const items = Array.from({ length: 4 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
  disabled: index === 3,
  group: index === 3 ? '工作' : '学习',
}))
const activeKey = ref('item1')

const menuConfig: ConversationProps['menu'] = () => ({
  items: [
    {
      label: 'Operation 1',
      icon: AddLocation,
      command: 'command1',
    },
    {
      label: 'Operation 2',
      icon: Aim,
      command: 'command2',
      disabled: true,
    },
    {
      label: 'Operation 3',
      icon: AlarmClock,
      command: 'command3',
    },
  ],
  onClick: (e) => {
    ElMessage.info(`You clicked ${e.label} - ${e.key}`)
  },
})
</script>

<style scoped></style>