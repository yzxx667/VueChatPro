<template>
  <Sender v-model="value">
    <!-- 自定义操作列表 -->
    <template #actionsList>
      <div class="action-list-self-wrap">
        <el-button type="danger" circle>
          <el-icon>
            <Delete />
          </el-icon>
        </el-button>
        <el-button type="primary" circle style="rotate: -45deg;">
          <el-icon>
            <Position />
          </el-icon>
        </el-button>
      </div>
    </template>
  </Sender>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sender } from 'vue-chat-pro'
import { Delete, Position } from '@element-plus/icons-vue'
const value = ref('')
</script>

<style scoped lang="scss">
.action-list-self-wrap {
  display: flex;
  align-items: center;

  &>span {
    width: 120px;
    font-weight: 600;
    color: var(--el-color-primary);
  }
}
</style>