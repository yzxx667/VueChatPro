<template>
  <div style="margin-bottom: 30px;">
    <el-button @click="handleClick" type="primary">add message</el-button>
    <el-button @click="handleTop">scroll to Top</el-button>
  </div>
  <BubbleList ref="bubbleListRef" :items="items" :roles="roles" style="height: 200px;overflow: auto;">
    <!-- <template #header="{ info }">
        {{ info.headerProps }}
      </template> -->
  </BubbleList>
</template>

<script setup lang="ts">
import BubbleList from "@/components/BubbleList/BubbleList.vue";
import { reactive, ref } from 'vue';
const items = reactive([
  {
    role: 'user',
    content: 'Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! ',
    headerProps: 'user头部'
  },
  {
    role: 'ai',
    content: 'Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! Mock Ai content! ',
    headerProps: 'ai头部',
    typing: false
  },
  {
    role: 'user',
    content: 'Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! Mock User content! ',
    headerProps: 'user头部'
  },
])

const roles = {
  ai: {
    placement: 'start',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    typing: { step: 1, interval: 20 },
  },
  user: {
    placement: 'end',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  },
}
const bubbleListRef = ref()
const handleClick = () => {
  items.push({
    role: 'ai',
    content: 'Mock Ai content!',
    headerProps: 'ai头部'
  })
  console.log(items);

}
const handleTop = () => {
  bubbleListRef.value?.scrollTo({
    key: 0,
    block: 'nearest',
  })
}
</script>

<style scoped lang="scss"></style>