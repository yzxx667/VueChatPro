<template>
  <el-tooltip v-model:visible="opened" :content="info?.label" :disabled="inEllipsis && !opened"
    :placement="direction === 'ltr' ? 'left' : 'right'">
    <li :class="mergedCls" @click="onInternalClick">
      <slot name="icon" class="icon">
        <div v-if="info!.icon" :class="ns.b('icon')">
          <el-icon v-if="typeof info!.icon === 'string'">
            <component :is="info!.icon" />
          </el-icon>
          <component v-else :is="info!.icon" />
        </div>
      </slot>
      <div ref="textRef" :class="ns.b('label')" :style="{ 'textOverflow': 'ellipsis', '-webkit-line-clamp': line }"
        @mouseenter="textRefMouseenter">
        <slot name="label" :item="info">
          {{ info!.label }}
        </slot>
      </div>
      <Dropdown :disabled="info?.disabled" v-if="menu && !info?.disabled"
        :menu="Array.isArray(menu) ? menu : menu.items" :placement="direction === 'rtl' ? 'bottom-start' : 'bottom-end'"
        trigger="click" @command="handleCommand">
        <ElButton :disabled="info?.disabled" link @click="stopPropagation">
          <ElIcon :class="ns.b('menu-icon')">
            <!-- <MoreFilled /> -->
            <More />
          </ElIcon>
        </ElButton>
      </Dropdown>
    </li>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useClassMoudle } from '@/hooks/useClassMoudle';
import type { ItemProps } from '../types';
import { ref, computed } from 'vue';
import Dropdown from './Dropdown.vue';
const props = withDefaults(defineProps<ItemProps>(), {
  inEllipsis: true,
  line: 1,
})
const emit = defineEmits(['click'])

// tooltip 是否打开
const opened = ref(false)

const mergedCls = computed(() => [
  props.className,
  ns.b('item'),
  { [ns.b('item-active')]: props.active && !props.info?.disabled },
  { [ns.b('item-disabled')]: props.info?.disabled },
])

// 点击 item
const onInternalClick = () => {
  if (!props.info?.disabled) {
    emit('click', props.info)
  }
}

// 鼠标移入item的事件
const textRefMouseenter = () => {
  if (props.info?.disabled) {
    opened.value = false
    return
  }
  if (!textRef.value) return
  // !!(...) 用于将结果转成布尔值（true/false）。
  opened.value = Boolean(textRef.value?.scrollWidth > textRef.value?.offsetWidth || textRef.value?.scrollHeight > textRef.value?.offsetHeight)
}

// menu 菜单点击
const handleCommand = (e: any) => {
  if (Array.isArray(props.menu)) return
  if (!props.info) return
  props.menu?.onClick?.({ ...props.info, key: e })
}

const stopPropagation = (e: Event) => {
  e.stopPropagation()
}

const textRef = ref<HTMLDivElement>()

const ns = useClassMoudle('conversations')
</script>

<style scoped lang="scss">
@import '../style';
</style>