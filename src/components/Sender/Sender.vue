<template>
  <div :class="[ns.b(), props?.rootClassName]" ref="senderRef">
    <Transition name="header-slide">
      <div :class="[ns.b('header')]" v-if="headerShow">
        <slot name="header"></slot>
      </div>
    </Transition>
    <div :class="computedContainerClass">
      <template v-if="props.variants === 'default'">
        <div :class="[ns.b('prefix')]" v-if="solts.prefix">
          <slot name="prefix"></slot>
        </div>
        <el-input
          ref="inputRefDefault"
          v-model="inputValue"
          :placeholder="props?.placeholder"
          :disabled="props?.disabled"
          autosize
          resize="none"
          type="textarea"
          :readonly="props?.readonly || props?.loading"
          :class="computedInputClass"
          :style="{ ...props?.styles?.input }"
          :submitType="props?.submitType"
          @input="handleChange"
          @keypress="handleKeyPress"
        >
        </el-input>
        <div :class="[ns.b('actionsList')]" v-if="solts.actionsList">
          <slot name="actionsList"></slot>
        </div>
        <div v-else-if="props?.loading" :class="[ns.b('actionsList')]">
          <ElButton circle type="primary" :disabled="!inputValue">
            <ElIcon color="white" size="32">
              <StopLoading />
            </ElIcon>
          </ElButton>
        </div>
        <div :class="[ns.b('actionsList-default')]" v-else>
          <el-button circle type="primary" :disabled="props?.disabled || !inputValue">
            <el-icon>
              <Promotion @click="handleSubmit" />
            </el-icon>
          </el-button>
        </div>
      </template>
      <template v-else>
        <el-input
          ref="inputRefupDown"
          v-model="inputValue"
          :placeholder="props?.placeholder"
          :disabled="props?.disabled"
          autosize
          resize="none"
          type="textarea"
          :readonly="props?.readonly || props?.loading"
          :class="computedInputClass"
          :style="{ ...props?.styles?.input }"
          :submitType="props?.submitType"
          @input="handleChange"
          @keypress="handleKeyPress"
        >
        </el-input>
        <div class="foo">
          <div :class="[ns.b('prefix')]">
            <slot name="prefix"></slot>
          </div>
          <div :class="[ns.b('actionsList')]" v-if="solts.actionsList">
            <slot name="actionsList"></slot>
          </div>
          <div v-else-if="props?.loading" :class="[ns.b('actionsList')]">
            <ElButton circle type="primary" :disabled="!inputValue">
              <ElIcon color="white" size="32">
                <StopLoading />
              </ElIcon>
            </ElButton>
          </div>
          <div :class="[ns.b('actionsList-default')]" v-else>
            <el-button circle type="primary" :disabled="props?.disabled || !inputValue">
              <el-icon>
                <Promotion @click="handleSubmit" />
              </el-icon>
            </el-button>
          </div>
        </div>
      </template>
    </div>
    <Transition name="header-slide">
      <div :class="[ns.b('footer')]" v-if="footerShow">
        <slot name="footer"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useClassMoudle } from '@/hooks/useClassMoudle'
import type { SenderProps, SenderMethods } from './types'
import { useSlots, computed, ref } from 'vue'
import StopLoading from './Loading.vue'
const ns = useClassMoudle('sender')
const props = withDefaults(defineProps<SenderProps>(), {
  variants: 'default',
  submitType: 'enter',
})

const senderRef = ref<HTMLDivElement>()
// 头部是否打开
const headerShow = ref<boolean>(false)
const inputRefDefault = ref<HTMLInputElement>()
const inputRefupDown = ref<HTMLInputElement>()
const footerShow = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'on-input', value: string): void
  (e: 'on-submit', value: string): void
}>()

const solts = useSlots()
// console.log(solts);

const computedInputClass = computed(() => {
  return [ns.b('input'), props?.className?.input]
})

const computedContainerClass = computed(() => {
  return [
    ns.b('container'),
    {
      [ns.b('default')]: props.variants === 'default',
      [ns.b('updown')]: props.variants === 'updown',
    },
  ]
})

// 当输入框变化时触发双向绑定更新
function onInput(value: string) {
  emit('update:modelValue', value)
}

const handleChange = (e: string) => {
  emit('on-input', e)
}

const handleSubmit = (e: string) => {
  emit('on-submit', e)
}

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => onInput(value),
})

// 键盘按下事件
const handleKeyPress = (e: KeyboardEvent) => {
  if (props.submitType === 'enter' && !props?.loading) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(props.modelValue)
    }
  }
  if (props.submitType === 'shiftEnter') {
    if (e.key === 'Enter' && !e.shiftKey && !props?.loading) {
      // 默认允许换行
      return
    }
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      handleSubmit(props.modelValue)
    }
  }
}

const handleHeaderClose = () => {
  headerShow.value = false
}

const handleHeaderOpen = () => {
  headerShow.value = true
}

const handleFocusDefault = () => {
  inputRefDefault.value?.focus()
}

const handleFocusupDown = () => {
  inputRefupDown.value?.focus()
}

const handleFooterClose = () => {
  footerShow.value = false
}
const handleFooterOpen = () => {
  footerShow.value = true
}

const handleInputSubmit = () => {
  if (inputValue.value) {
    handleSubmit(inputValue.value)
  }
}

const handleInputClear = () => {
  inputValue.value = ''
}

defineExpose<SenderMethods>({
  handleHeaderClose,
  handleHeaderOpen,
  handleFocusDefault,
  handleFocusupDown,
  handleFooterClose,
  handleFooterOpen,
  handleInputSubmit,
  handleInputClear,
})
</script>

<style scoped lang="scss">
@import './style';
</style>
