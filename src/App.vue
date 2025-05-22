<script setup lang="ts">
import { reactive } from 'vue'
import Bubble from "./components/Bubble/Bubble.vue";
import BubbleList from "./components/BubbleList/BubbleList.vue";
import Conversations from "./components/Conversation/Conversation.vue";
// import { ElButton, ElSpace } from 'element-plus'
import { ref } from 'vue'
import { AddLocation, Aim, AlarmClock, CircleClose } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Sender from './components/Sender/Sender.vue';
import TestComp from './components/TestComp/TestComp.vue';
// const repeat = ref(1)
// const text = ref('hello world！')


// import markdownit from 'markdown-it'

// const md = markdownit({ html: true })
// const text = `
// > Render as markdown content to show rich text!

// Link: [Ant Design X](https://x.ant.design)
// `.trim()

// const msgRender = (text: string) => md.render(text)

// const items = reactive([
//   {
//     role: 'ai',
//     content: '123',
//     headerProps: 'ai头部'
//   },
//   {
//     role: 'user',
//     content: '567',
//     headerProps: 'user头部',

//   },
// ])

// const roles = {
//   ai: {
//     placement: 'start',
//     avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
//     typing: { step: 1, interval: 100 },
//   },
//   user: {
//     placement: 'end',
//     avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
//   },
// }
// const bubbleListRef = ref()
// const handleClick = () => {
//   items.push({
//     role: 'ai',
//     content: '789',
//     headerProps: 'ai头部',
//     onTypingComplete: () => {
//       console.log('打字完成');
//     }
//   })
//   console.log(items);

// }
// const handleTop = () => {
//   bubbleListRef.value?.scrollTo({
//     key: 0,
//     block: 'nearest',
//   })
// }

// const items = Array.from({ length: 4 }).map((_, index) => ({
//   key: `item${index + 1}`,
//   label: `Conversation Item ${index + 1}`,
//   disabled: index === 3,
//   group: index === 3 ? '工作' : '学习',
// }))
// const activeKey = ref('item1')

// const menuConfig = () => ({
//   items: [
//     {
//       label: 'Operation 1',
//       icon: AddLocation,
//       command: 'command1',
//     },
//     {
//       label: 'Operation 2',
//       icon: Aim,
//       command: 'command2',
//       disabled: true,
//     },
//     {
//       label: 'Operation 3',
//       icon: AlarmClock,
//       command: 'command3',
//     },
//   ],
//   onClick: (e) => {
//     ElMessage.info(`You clicked ${e.label} - ${e.key}`)
//   },
// })

// const groupableConfig = {
//   sort: (a, b) => {
//     const order: Record<string, number> = { 学习: 0, 工作: 1 }
//     const orderA = order[a] !== undefined ? order[a] : 999
//     const orderB = order[b] !== undefined ? order[b] : 999
//     return orderA - orderB
//   },
//   title: undefined
// }


const senderValue = ref('')
const senderRef = ref()
// const handleSubmit = (e) => {
//   console.log(e);
// }
const handleClick = () => {
  senderRef.value?.handleHeaderOpen()

  senderRef.value?.handleFocusDefault()
}
const handleClickClose = () => {
  senderRef.value?.handleHeaderClose()
  senderRef.value?.handleFocusDefault()
}
const handleChange = (e) => {
  console.log(e);
}
const handleKeypress = (e) => {
  console.log(e);
}
const handleSubmit = (e) => {
  console.log(e);
}
</script>

<template>
  <div>
    <!-- <TestComp>
      <template #header>
        <div style="margin: 20px;overflow: auto;">Template</div>
      </template>
</TestComp> -->

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
    <!-- <el-button @click="handleClick">add message</el-button>
    <el-button @click="handleTop">to Top</el-button>
    <div style="margin: 10px;"></div>
    <BubbleList ref="bubbleListRef" :items="items" :roles="roles" style="height: 100px;overflow: auto;">
      <template #header="{ info }">
        {{ info.headerProps }}
      </template>
</BubbleList> -->

    <!-- <Conversations v-model:active-key="activeKey" :items="items" style="width: 300px" :menu="menuConfig"
      :groupable="groupableConfig" /> -->
    <!-- <Conversations v-model:active-key="activeKey" :items="items" style="width: 300px" :menu="menuConfig" /> -->
    <div style="height: 300px; display: flex;flex-direction: column;justify-content: space-between;">
      <el-button @click="handleClick">点击</el-button>
      <el-button @click="senderRef?.handleInputClear">清空内容</el-button>
      <el-button @click="senderRef?.handleInputClear">清空内容</el-button>
      <Sender v-model="senderValue" ref="senderRef" @on-input="handleChange" @on-submit="handleSubmit"
        variants="updown">
        <template #prefix>
          <el-button type="primary" @click="handleClickClose">关闭header</el-button>
        </template>
        <template #header>
          <div class="header-self-wrap">
            <div class="header-self-title">
              <div class="header-left">
                💯 欢迎使用 Element Plus X
              </div>
              <div class="header-right">
                <el-button>
                  <el-icon>
                    <CircleClose />
                  </el-icon>
                  <span>关闭头部</span>
                </el-button>
              </div>
            </div>
            <div class="header-self-content">
              🦜 自定义头部内容
            </div>
          </div>
        </template>
        <!-- <template #header>
        header
      </template> -->
        <!-- <template #footer>
        footer
      </template> -->
        <!-- <template #actionsList>
        <el-button type="warning">警告牌</el-button>
      </template> -->
      </Sender>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-self-wrap {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 200px;

  .header-self-title {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
  }

  .header-self-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #626aef;
    font-weight: 600;
  }
}

// @import './style'</style>
