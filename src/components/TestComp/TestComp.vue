<template>
  <div style="border: 1px solid red">
    <!-- <Transition @before-enter="onBeforeEnter" @enter="onEnter">
      <div v-if="input" ref="headerRef" style="box-sizing: border-box;">
        <slot name="header"></slot>
      </div>
    </Transition> -->
    <Transition name="header-slide">
      <div v-if="input" ref="headerRef" style="box-sizing: border-box">
        <slot name="header"></slot>
      </div>
    </Transition>
    <el-input v-model="input" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
const input = ref('')
const headerRef = ref<HTMLDivElement | null>(null)

// 使用nextTick确保DOM完全更新后再获取scrollHeight
watch(input, async (newVal) => {
  if (newVal && headerRef.value) {
    await nextTick()
    console.log('更新后的scrollHeight:', headerRef.value.scrollHeight)
  }
})

// 类型修正：将HTMLDivElement改为Element
// function onBeforeEnter(el: Element) {
//   ; (el as HTMLElement).style.height = '0px'
//     ; (el as HTMLElement).style.opacity = '0'
// }

// 类型修正：将HTMLDivElement改为Element，添加done参数
// function onEnter(el: Element, done?: () => void) {
//   // 使用nextTick确保渲染完成后再获取scrollHeight
//   nextTick(() => {
//     const htmlEl = el as HTMLElement
//     htmlEl.style.height = `${htmlEl.scrollHeight}px`
//     htmlEl.style.opacity = '1'
//     htmlEl.style.transition = 'all 1s'

//     if (done) {
//       // 动画完成后调用done
//       htmlEl.addEventListener('transitionend', done, { once: true })
//     }
//   })
// }
</script>

<style scoped lang="scss">
.header-slide-enter-active,
.header-slide-leave-active {
  height: calc-size(max-content, size);
  /* 改为auto而不是calc-size函数 */
  opacity: 1;
  transition: all 1s;
  overflow: hidden;
}

.header-slide-enter-from,
.header-slide-leave-to {
  height: 0;
  opacity: 0 !important;
}
</style>
