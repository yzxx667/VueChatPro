<template>
  <Welcome title="欢迎使用 VueChat 🌹" description="描述信息"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
  <br />
  <Welcome title="欢迎使用 VueChat 🌹" description="描述信息" variant="borderless"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
  <br />
  <Welcome title="欢迎使用 VueChat 🌹" description="描述信息" directions="left"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
  <br />
  <Welcome title="欢迎使用 VueChat 🌹" description="描述信息" directions="right" variant="borderless"
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp">
    <template #extra>
      <el-button size="small" round type="primary">Round el-button</el-button>
    </template>
  </Welcome>
</template>
<script setup lang="ts">
import Welcome from '@/components/Welcome/Welcome.vue'
</script>
<style></style>
