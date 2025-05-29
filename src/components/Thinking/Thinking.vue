<template>
  <div :class="ns.b()">
    <div>
      <button :class="ns.b('top')" :disabled="disabled" :style="computedTopStyle" @click="handleArrowClick">
        <span :class="ns.b('icon')">
          <slot name="icon" :status="status">
            <el-icon v-if="status === 'start'" style="color: var(--start-color)">
              <Opportunity />
            </el-icon>
            <el-icon v-else-if="status === 'thinking'" style="color: var(--thinking-color)" class="thinking-loading">
              <Loading />
            </el-icon>
            <el-icon v-else-if="status === 'end'" style="color: var(--end-color)">
              <SuccessFilled />
            </el-icon>
            <el-icon v-else-if="status === 'error'" style="color: var(--error-color)">
              <CircleCloseFilled />
            </el-icon>
          </slot>
        </span>
        <span :class="ns.b('label')">
          <slot name="label" :status="status">
            {{ defalutLabel }}
          </slot>
        </span>
        <span :class="[ns.b('arrow'), { 'is-open': isOpen }]" :style="computedArrowStyle">
          <slot name="arrow">
            <el-icon class="el-icon-center">
              <ArrowUpBold />
            </el-icon>
          </slot>
        </span>
      </button>
    </div>
    <div :class="[ns.b('content'),
    { [ns.b('content-lb')]: lb }]" v-show="isOpen" :style="computedContentStyle">
      <template v-if="slots.error && status === 'error'">
        <slot name="error"></slot>
      </template>
      <template v-else>
        <slot name="content" :status="status" :content="content">
          {{ content }}
        </slot>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassMoudle } from '@/hooks/useClassMoudle'
import type { ThinkingProps, ThinkingStatus, ThinkingEmits } from './types'
import { useSlots, computed, watch } from 'vue'
import {
  ArrowUpBold,
  CircleCloseFilled,
  Loading,
  Opportunity,
  SuccessFilled
} from '@element-plus/icons-vue'

const ns = useClassMoudle('thinking')
const props = withDefaults(defineProps<ThinkingProps>(), {
  content: '',
  modelValue: true,
  status: 'start' as ThinkingStatus,
  disabled: false,
  autoCollapse: false,
  buttonWidth: '160px',
  duration: '0.2s',
  maxWidth: '500px',
  color: '#00',
  isBorder: false,
  lb: true
})

const defalutLabel = computed(() => {
  return props.status === 'start'
    ? '开始思考'
    : props.status === 'thinking'
      ? '思考中'
      : props.status === 'end'
        ? '思考完成'
        : '思考失败'
})

const emit = defineEmits<ThinkingEmits>()

const slots = useSlots()

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const handleArrowClick = () => {
  isOpen.value = !isOpen.value
  emit('change', !isOpen.value, props.status)
}

const computedTopStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.buttonWidth) {
    style.width = props.buttonWidth
  }
  if (props.isBorder) {
    style.border = '1px solid var(--border-color)'
  }
  return style
})

const computedContentStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.maxWidth) {
    style.maxWidth = props.maxWidth
  }
  if (props.backgroundColor) {
    if (props.backgroundColor.includes('linear-gradient')) {
      style.background = props.backgroundColor
    } else {
      style.backgroundColor = props.backgroundColor
    }
  }
  if (props.color) {
    style.color = props.color
  }

  return style
})

const computedArrowStyle = computed(() => {
  return {
    transition: props.duration
      ? `transform ${props.duration} ease`
      : `transform $motion-duration-slow ease`
  }
})

// 自动收起
watch(
  () => props.status,
  newVal => {
    if (props.autoCollapse && newVal === 'end') {
      isOpen.value = false
      console.log('isOpen.value', isOpen.value)
    }
  }
)

watch(
  () => isOpen.value,
  newVal => {
    console.log('Watch isOpen.value', newVal)
  }
)
</script>

<style scoped lang="scss">
@import './style';
</style>
