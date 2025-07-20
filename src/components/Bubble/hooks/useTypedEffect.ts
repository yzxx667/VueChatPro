import type { Ref, VNode } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'

function isString(str: unknown): str is string {
  return typeof str === 'string'
}

/**
 * Return typed content and typing status when typing is enabled.
 * Or return content directly.
 */
function useTypedEffect(
  content: Ref<string>,
  typingEnabled: boolean,
  typingStep: number,
  typingInterval: number,
): [typedContent: Ref<() => string | VNode>, isTyping: Ref<boolean>] {
  const prevContent = ref<string>('')
  const typingIndex = ref<number>(1)

  const mergedTypingEnabled = ref(typingEnabled && isString(content.value))

  // Reset typing index when content changed
  watch(
    () => content.value,
    () => {
      console.log('content.value:', content.value, 'prevContent.value', prevContent.value)
      if (!mergedTypingEnabled.value && isString(content.value)) {
        typingIndex.value = content.value.length
      } else if (
        isString(content.value) &&
        isString(prevContent.value) &&
        content.value.indexOf(prevContent.value) !== 0
      ) {
        typingIndex.value = 1
      }
      prevContent.value = content.value
    },
  )

  // Start typing
  watchEffect(() => {
    if (mergedTypingEnabled.value && typingIndex.value < (content.value as string).length) {
      const id = setTimeout(() => {
        const num = (prev: number) => prev + typingStep
        typingIndex.value = num(typingIndex.value)
      }, typingInterval)

      return () => {
        clearTimeout(id)
      }
    }
  })

  const mergedTypingContent = computed(() => {
    const contentText = mergedTypingEnabled.value
      ? content.value.slice(0, typingIndex.value)
      : content.value
    return () => contentText
  })
  const isTyping = computed(
    () => mergedTypingEnabled.value && typingIndex.value < content.value.length,
  )

  return [mergedTypingContent, isTyping]
}

export default useTypedEffect
