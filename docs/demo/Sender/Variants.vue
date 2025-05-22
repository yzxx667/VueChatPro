<template>
  <Sender v-model="value" variants="default" />
  <br />
  <Sender v-model="value" variants="updown">
    <template #prefix>
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <el-button round plain color="#626aef">
          <el-icon>
            <Paperclip />
          </el-icon>
        </el-button>

        <div :class="{ isSelect }"
          style="display: flex; align-items: center; gap: 4px; padding: 2px 12px; border: 1px solid silver; border-radius: 15px; cursor: pointer; font-size: 12px;"
          @click="isSelect = !isSelect">
          <el-icon>
            <ElementPlus />
          </el-icon>
          <span>深度思考</span>
        </div>

        左边是自定义 prefix 前缀 右边是自定义 操作列表
      </div>
    </template>
  </Sender>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sender from '@/components/Sender/Sender.vue';
import { Paperclip, ElementPlus } from '@element-plus/icons-vue'
const value = ref('')
const isSelect = ref(false)
</script>

<style scoped lang="scss">
.isSelect {
  color: #626aef;
  border: 1px solid #626aef !important;
  border-radius: 15px;
  padding: 3px 12px;
  font-weight: 700;
}
</style>