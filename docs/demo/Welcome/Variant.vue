<template>
  <Welcome title="欢迎使用 V-Chat 🌹" description="描述信息"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*k0oYSZQMoBwAAAAAAAAAAAAADgCCAQ/original">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
  <br />
  <Welcome title="欢迎使用 V-Chat 🌹" description="描述信息" variant="borderless"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*k0oYSZQMoBwAAAAAAAAAAAAADgCCAQ/original">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
  <br />
  <Welcome title="欢迎使用 V-Chat 🌹" description="描述信息" directions="left"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*k0oYSZQMoBwAAAAAAAAAAAAADgCCAQ/original">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
  <br />
  <Welcome title="欢迎使用 V-Chat 🌹" description="描述信息" directions="right" variant="borderless"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*k0oYSZQMoBwAAAAAAAAAAAAADgCCAQ/original">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
</template>
<script setup>
import Welcome from '@/components/Welcome/Welcome.vue'
</script>
<style></style>
