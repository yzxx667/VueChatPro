<template>
  <Welcome title="欢迎使用 V-Chat 🌹" description="描述信息" :styles="titleStyle" extra="额外信息">
  </Welcome>
</template>
<script setup lang="ts">
import Welcome from '@/components/Welcome/Welcome.vue'
const titleStyle = {
  'title': {
    color: 'blue',
    fontSize: '20px',
  }, 'extra': {
    color: 'green',
    fontSize: '16px',
  }
}
</script>
<style></style>