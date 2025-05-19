<script setup lang="ts">
import { reactive } from 'vue'
import Bubble from "./components/Bubble/Bubble.vue";
import BubbleList from "./components/BubbleList/BubbleList.vue";
// import { ElButton, ElSpace } from 'element-plus'
import { ref } from 'vue'

// const repeat = ref(1)
// const text = ref('hello world！')


import markdownit from 'markdown-it'

const md = markdownit({ html: true })
const text = `
> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)
`.trim()

const msgRender = (text: string) => md.render(text)

const items = reactive([
  {
    role: 'ai',
    content: '123',
    headerProps: 'ai头部'
  },
  {
    role: 'user',
    content: '567',
    headerProps: 'user头部',

  },
])

const roles = {
  ai: {
    placement: 'start',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    typing: { step: 1, interval: 100 },
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
    content: '789',
    headerProps: 'ai头部',
    onTypingComplete: () => {
      console.log('打字完成');
    }
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

<template>
  <div>
    <!-- <Bubble content="hello world！" />
    <br />
    <ElSpace direction="vertical" alignment="align-start" style="width: 100%">
      <div class="btns">
        <ElButton style="float: right" type="primary" @click="repeat = repeat < 5 ? repeat + 1 : 1">
          Repeat {{ repeat }} Times
        </ElButton>
      </div>
      <Bubble :content="text.repeat(repeat)"
        avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        :typing="{ step: 2, interval: 50 }" />
    </ElSpace> -->


    <!-- <Bubble :content="text" typing avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      :message-render="msgRender" /> -->
    <el-button @click="handleClick">add message</el-button>
    <el-button @click="handleTop">to Top</el-button>
    <div style="margin: 10px;"></div>
    <BubbleList ref="bubbleListRef" :items="items" :roles="roles" style="height: 100px;overflow: auto;">
      <template #header="{ info }">
        {{ info.headerProps }}
      </template>
    </BubbleList>
  </div>
</template>

<style scoped></style>
