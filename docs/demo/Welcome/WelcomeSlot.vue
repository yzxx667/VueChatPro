<template>
  <Welcome title="欢迎使用 V-Chat 🌹" description="描述信息">
    <template #icon>
      <el-image
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"></el-image>
    </template>
    <template #extra>
      <el-button size="small" round type="primary">Round Button</el-button>
    </template>
  </Welcome>
</template>
<script setup>
import Welcome from '@/components/Welcome/Welcome.vue'
</script>
<style></style>
