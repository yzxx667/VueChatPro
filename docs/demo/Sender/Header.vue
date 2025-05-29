<template>
  <div style="height: 350px; display: flex;flex-direction: column;justify-content: space-between;">
    <el-button @click="handleClick">打开header</el-button>
    <Sender v-model="senderValue" ref="senderRef" @on-input="handleChange" @on-submit="handleSubmit" variants="updown">
      <template #prefix>
        <el-button type="primary" @click="handleClickClose">关闭header</el-button>
      </template>

      <template #header>
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">
              💯 欢迎使用 VueChat
            </div>
            <div class="header-right">
              <el-button @click="handleClickClose">
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
    </Sender>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sender from '@/components/Sender/Sender.vue'
const senderValue = ref('')
const senderRef = ref<InstanceType<typeof Sender>>()

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
const handleSubmit = (e) => {
  console.log(e);
}
</script>

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
</style>