<template>
  <div :class="[ns.b(), props?.rootClassName]" ref="senderRef">
    <div :class="[ns.b('header')]" v-show="headerShow">
      <slot name="header"></slot>
    </div>
    <div :class="computedContainerClass">
      <template v-if="props.variants === 'default'">
        <div :class="[ns.b('prefix')]" v-if="solts.prefix">
          <slot name="prefix"></slot>
        </div>
        <el-input v-model="inputValue" :placeholder="props?.placeholder" :disabled="props?.disabled" autosize
          resize="none" type="textarea" :readonly="props?.readonly" :class="computedInputClass"
          :style="{ ...props?.styles?.input }" :submitType="props?.submitType" @change="props?.onChange"
          @keypress="handleKeyPress">
        </el-input>
        <div :class="[ns.b('actionsList')]" v-if="solts.actionsList">
          <slot name="actionsList"></slot>
        </div>
        <div :class="[ns.b('actionsList-default')]" v-else>
          <el-button circle type="primary">
            <el-icon>
              <Promotion />
            </el-icon>
          </el-button>
        </div>
      </template>
      <template v-else>
        <el-input v-model="inputValue" :placeholder="props?.placeholder" :disabled="props?.disabled" autosize
          resize="none" type="textarea" :readonly="props?.readonly" :class="computedInputClass"
          :style="{ ...props?.styles?.input }" :submitType="props?.submitType" @change="props?.onChange"
          @keypress="handleKeyPress">
        </el-input>
        <div class="foo">
          <div :class="[ns.b('prefix')]">
            <slot name="prefix"></slot>
          </div>
          <div :class="[ns.b('actionsList')]">
            <slot name="actionsList"></slot>
          </div>
        </div>
      </template>
    </div>
    <div :class="[ns.b('footer')]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassMoudle } from '@/hooks/useClassMoudle';
import type { SenderProps, SenderMethods } from './types';
import { useSlots, computed, ref } from 'vue';
const ns = useClassMoudle('sender');
const props = withDefaults(defineProps<SenderProps>(), {
  variants: 'default'
});

const senderRef = ref<HTMLDivElement>()
// 头部是否打开
const headerShow = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
}>();

const solts = useSlots();
console.log(solts);


const computedInputClass = computed(() => {
  return [
    ns.b('input'),
    props?.className?.input,
  ]
})

const computedContainerClass = computed(() => {
  return [
    ns.b('container'),
    {
      [ns.b('default')]: props.variants === 'default',
      [ns.b('updown')]: props.variants === 'updown',
    }
  ]
})


// 当输入框变化时触发双向绑定更新
function onInput(value: string) {
  emit('update:modelValue', value)
}


const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => onInput(value)
})

// 键盘按下事件
const handleKeyPress = (e: KeyboardEvent) => {
  if (props.submitType === 'enter') {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      emit('submit', props.modelValue) // 发出 submit 事件
    }
  }
  if (props.submitType === 'shiftEnter') {
    if (e.key === 'Enter' && !e.shiftKey) {
      // 默认允许换行
      return
    }
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      emit('submit', props.modelValue)
    }
  }
}

const handleHeaderClose = () => {
  headerShow.value = false
}

const handleHeaderOpen = () => {
  headerShow.value = true
}

defineExpose<SenderMethods>({
  handleHeaderClose,
  handleHeaderOpen,
})
</script>

<style scoped lang="scss">
@import './style'
</style>