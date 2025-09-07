import { ref, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { Ref } from 'vue'

export interface useAudioProps {
  // 语言
  lang?: 'zh-CN' | 'en-US' | 'ja-JP' | 'es-ES' | 'hi-IN'
  // 是否连续识别
  continuous?: boolean
  // 是否实时返回结果
  interimResults?: boolean
  onError?: (err: unknown) => void
  onStart?: () => void
  onEnd?: (value: string) => void
  onResult?: (res: string) => void
}

export interface useAudioReturn {
  start: () => void
  stop: () => void
  value: Ref<string>
  loading: Ref<boolean>
}

export function useAudio(props: useAudioProps): useAudioReturn {
  const {
    lang = 'zh-CN',
    continuous = true,
    interimResults = true,
    onError,
    onStart,
    onEnd,
    onResult,
  } = props
  const value = ref<string>('')
  const loading = ref<boolean>(false)
  const recognition = ref<null | SpeechRecognition>(null)

  const start = () => {
    if ('webkitSpeechRecognition' in window) {
      recognition.value = new webkitSpeechRecognition()
      recognition.value.continuous = continuous
      recognition.value.interimResults = interimResults
      recognition.value.lang = lang
      recognition.value.onstart = () => {
        loading.value = true
        value.value = ''
        onStart?.()
      }
      recognition.value.onend = () => {
        loading.value = false
        onEnd?.(value.value)
      }
      recognition.value.onerror = (e: unknown) => {
        loading.value = false
        onError?.(e)
      }
      recognition.value.onresult = (e: unknown) => {
        let res = ''
        for (let i = 0; i < e.resultIndex + 1; i++) {
          res += e.results[i][0].transcript
        }
        value.value = res
        onResult?.(res)
      }
      recognition.value.start()
    } else {
      ElMessage.error('当前浏览器不支持语音识别')
    }
  }

  const stop = () => {
    if (recognition.value) {
      recognition.value.stop()
    }
  }

  onUnmounted(() => {
    stop()
    recognition.value = null
  })

  return { start, stop, value, loading }
}
