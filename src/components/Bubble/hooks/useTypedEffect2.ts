import type { Ref } from 'vue'
import { ref, watch, watchEffect, computed } from 'vue'

const isString = (val: unknown): boolean => typeof val === 'string'
const useTypedEffect2 = (
  contents: Ref<string>,
  typeEnable: boolean,
  step: number,
  interval: number,
) => {
  let prevContent = ref<string>('')
  let currentIndex = ref<number>(1)

  const mergeEnable = ref(typeEnable && isString(contents.value))

  // 设置 currentIndex
  watch(
    () => contents.value,
    () => {
      console.log(contents.value)
      console.log(prevContent.value)

      if (!mergeEnable.value && isString(contents.value)) {
        currentIndex.value = contents.value.length
      } else if (mergeEnable.value && contents.value.indexOf(prevContent.value) !== 0) {
        currentIndex.value = 1
      }
      prevContent.value = contents.value
    },
  )

  // 打字逻辑
  watchEffect(() => {
    // console.log(currentIndex.value, contents.value.length)

    if (mergeEnable.value && currentIndex.value < contents.value.length) {
      const uniqueId = setTimeout(() => {
        const num = (prev: number) => prev + step
        currentIndex.value = num(currentIndex.value)
      }, interval)

      return () => clearTimeout(uniqueId)
    }
  })

  const mergeContent = computed(() => {
    if (mergeEnable.value && currentIndex.value < contents.value.length) {
      return () => contents.value.slice(0, currentIndex.value)
    } else {
      return () => contents.value
    }
  })

  const isTyping = computed(() => mergeEnable.value && currentIndex.value < contents.value.length)

  return [mergeContent, isTyping]
}

export default useTypedEffect2
