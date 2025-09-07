<template>
  <ul :class="mergeClass" :style="props.style">
    <template v-for="(item, index) in groupList" :key="index">
      <template v-if="isGroup">
        <li :key="item.name || `key-${index}`">
          <template v-if="item.title">
            <renderVnode :vNode="item.title" />
          </template>
          <template v-else>
            {{ item.name }}
          </template>
        </li>
        <ul :class="[ns.b('list')]">
          <ConversationItem
            v-for="(convInfo, convIndex) in item.data"
            :key="convInfo.key || `key-${convIndex}`"
            :active="mergedActiveKey === convInfo.key"
            :class-name="props.classNames?.item"
            :direction="props.direction"
            :info="convInfo"
            :menu="typeof props.menu === 'function' ? props.menu(convInfo) : props.menu"
            :style="props.styles?.item"
            @click="onConversationItemClick"
          >
            <template #label="{ item }">
              <slot :item="item" name="item" />
            </template>
            <template #icon>
              <slot name="icon" />
            </template>
          </ConversationItem>
        </ul>
      </template>
      <template v-else>
        <ConversationItem
          v-for="(convInfo, convIndex) in item.data"
          :key="convInfo.key || `key-${convIndex}`"
          :active="mergedActiveKey === convInfo.key"
          :class-name="props.classNames?.item"
          :direction="props.direction"
          :info="convInfo"
          :menu="typeof props.menu === 'function' ? props.menu(convInfo) : props.menu"
          :style="props.styles?.item"
          @click="onConversationItemClick"
        >
          <template #label="{ item }">
            <slot :item="item" name="item" />
          </template>
          <template #icon>
            <slot name="icon" />
          </template>
        </ConversationItem>
      </template>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useClassMoudle } from '@/hooks/useClassMoudle'
import { computed } from 'vue'
import type { ConversationProps } from './types'
import useGroupable from './hooks/useGroupable'
import renderVnode from '@/hooks/renderVnode'
import ConversationItem from './components/ConversationItem.vue'
const props = defineProps<ConversationProps>()
const emit = defineEmits(['update:activeKey'])
const ns = useClassMoudle('conversations')

const mergedActiveKey = computed(() => props.activeKey || props.defaultActiveKey || '')

console.log(props.items)

const [groupList, isGroup] = useGroupable(props.groupable, props.items)
console.log(groupList, isGroup)

// 计算外层class
const mergeClass = computed(() => [
  ns.b(),
  props.className,
  {
    [ns.b('rtl')]: props.direction === 'rtl',
  },
])

function onConversationItemClick(info: unknown) {
  if (props.onActiveChange) {
    const next = props.onActiveChange(info.key)
    if (next === false) return
  }
  emit('update:activeKey', info.key)
}
</script>

<style scoped lang="scss">
@import './style';
</style>
