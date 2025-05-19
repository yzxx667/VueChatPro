import type { TypingOption } from '../types'

import { computed } from 'vue'

function useTypingConfig(typing: boolean | TypingOption) {
  const typingConfig = computed(() => {
    if (!typing) return [false, 0, 0]

    let baseConfig = {
      step: 1,
      interval: 50,
    }

    // 将对象中的属性合并到 baseConfig 中
    if (typeof typing === 'object') {
      baseConfig = { ...baseConfig, ...typing }
    }

    return [true, baseConfig.interval, baseConfig.step]
  })
  return typingConfig.value
}

export default useTypingConfig
