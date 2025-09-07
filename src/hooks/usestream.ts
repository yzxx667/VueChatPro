/**
 * @description 默认分隔符 {@link splitStream}
 */
const DEFAULT_STREAM_SEPARATOR = '\n\n'
/**
 * @description 默认分隔符 {@link splitPart}
 * @example "event: delta\ndata: {\"key\": \"value\"}"
 */
const DEFAULT_PART_SEPARATOR = '\n'
/**
 * @description 键值的默认分隔符，冒号(`:`)用于分隔键值
 * @example "event: delta"
 */
const DEFAULT_KV_SEPARATOR = ':'
import { ref, shallowRef } from 'vue'
export type SSEFields = 'data' | 'event' | 'id' | 'retry'
export type SSEOutput = Partial<Record<SSEFields, unknown>>

interface VueReadableStream<R = unknown> extends ReadableStream<R> {
  // 生成器每次 yield 的值的类型，即迭代产生的数据类型  生成器结束时返回的值的类型，即调用 return() 返回的值类型。  传入给生成器的 next(value) 方法的参数类型，即外部传入生成器的数据类型。
  [Symbol.asyncIterator]: () => AsyncGenerator<R, void, unknown>
}

export interface VueStreamOptions<Output> {
  /**
   * @description 可读的二进制数据流
   * @link https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
   */
  readableStream: ReadableStream<Uint8Array>

  /**
   * @description 支持可定制的transformStream来转换流
   * @default sseTransformStream
   * @link https://developer.mozilla.org/en-US/docs/Web/API/TransformStream
   */
  transformStream?: TransformStream<string, Output>
}
const isValidString = (str: string) => (str ?? '').trim() !== ''

function splitStream() {
  // 在转换之间存储不完整数据块的缓冲区
  let buffer = ''

  return new TransformStream<string, string>({
    /**
     *
     * @param streamChunk
     * @param controller
     * 类型：controller 是 TransformStreamDefaultController 类型。它提供了对流处理的控制能力。

      描述：controller 用于控制当前的流处理状态。它允许你：

      向下游发送数据：通过调用 controller.enqueue() 将转换后的数据传递到流的下一个阶段（比如下游的 WritableStream）。

      终止流：通过调用 controller.terminate() 可以提前终止流。

      关闭流：通过调用 controller.close() 来关闭流，这意味着没有更多的数据会被传递。

      在 transform 方法中的作用：controller 用于控制流的输出。你可以使用它将处理后的数据（比如解析后的事件块）排入下一个流处理阶段，或者最终输出到可消费的地方。
     */

    transform(streamChunk, controller) {
      buffer += streamChunk
      // console.log('bufferFirst', buffer)

      // 根据分隔符拆分缓冲区
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR)
      // console.log('parts', parts)

      // 将除最后一个不完整部分之外的所有完整部分排入队列
      parts.slice(0, -1).forEach((part) => {
        // 跳过空字符串
        if (isValidString(part)) {
          controller.enqueue(part)
        }
      })

      // 将最后一个未完成的部分保存回缓冲区，用于下一个块
      buffer = parts[parts.length - 1] as string
      // console.log('bufferLast', buffer)
    },
    // 流结束时触发
    flush(controller) {
      // 如果缓冲区中还有剩余数据，将其作为最后一部分排队
      // console.log('flush')
      // console.log('buffer', buffer)
      if (isValidString(buffer)) {
        controller.enqueue(buffer)
      }
    },
  })
}

/**
 * @description 将部分字符串转换为 {@link SSEOutput}
 * @example part string
 *
 * "event: delta\ndata: { key: 'world!' }\n"
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 *
 * 当处理带有 "内容类型:文本/事件流" 的响应时，通常会观察到以下标准做法:
 * - 双换行符(` \n\n `)用于分隔各个事件。
 * - 单个换行符(` \n `)用于分隔事件中的行。
 */
function splitPart() {
  return new TransformStream<string, SSEOutput>({
    transform(partChunk, controller) {
      // 使用partSeparator将块分割成键值对
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR)
      // console.log('lines', lines)

      const sseEvent = lines.reduce<SSEOutput>((acc, line) => {
        const separatorIndex = line.indexOf(DEFAULT_KV_SEPARATOR)

        if (separatorIndex === -1) {
          throw new Error(`键值分隔符 "${DEFAULT_KV_SEPARATOR}" 在sse行块中找不到!`)
        }

        // 提取从行首到分隔符的密钥
        const key = line.slice(0, separatorIndex)
        // console.log('key', key)
        // 冒号用于注释行，直接跳过
        if (!isValidString(key)) return acc

        // 从分隔符后的行中提取值
        const value = line.slice(separatorIndex + 1)
        // console.log('acc', acc)
        // console.log('key', { [key]: value })
        // console.log('sseEvent', { ...acc, [key]: value })

        return { ...acc, [key]: value }
      }, {})

      if (Object.keys(sseEvent).length === 0) return
      // console.log('sseEvent', sseEvent)
      // 将键-值对减少到单个对象中并排队
      controller.enqueue(sseEvent)
    },
  })
}

export function useStream() {
  const data = ref<SSEOutput[]>([])
  const error = ref<Error | null>(null)
  const isLoading = ref<boolean>(false)
  const abortController = shallowRef<AbortController | null>(null)
  const stream = shallowRef<VueReadableStream<SSEOutput> | null>(null)

  const startStream = async <Output = SSEOutput>(options: VueStreamOptions<Output>) => {
    const { readableStream } = options
    isLoading.value = true
    error.value = null
    data.value = []
    abortController.value = new AbortController()

    // 每次调用时创建新的 decoderStream
    const decoderStream = new TextDecoderStream()

    stream.value = readableStream
      .pipeThrough(decoderStream)
      .pipeThrough(splitStream())
      .pipeThrough(splitPart()) as VueReadableStream<SSEOutput>

    // console.log('stream', stream.value)

    const reader = stream.value.getReader()

    if (stream.value) {
      while (true) {
        if (abortController.value!.signal?.aborted) {
          await reader.cancel() // 主动取消 reader
          break
        }
        const { done, value } = await reader.read()
        if (value) data.value.push(value)
        if (done) break
      }
    }

    isLoading.value = false
    stream.value = null // 释放流引用
    abortController.value = null // 释放控制器

    /** support async iterator */
    // stream.value[Symbol.asyncIterator] = async function* () {
    //   const reader = this.getReader()

    //   while (true) {
    // if (abortController.value!.signal?.aborted) {
    //   await reader.cancel() // 主动取消 reader
    //   break
    // }
    //     const { done, value } = await reader.read()
    //     console.log('value', value)
    //     if (done) break

    //     if (value) yield value
    //   }
    // }

    // try {
    //   for await (const item of stream.value!) {
    //     data.value.push(item)
    //   }
    // } catch (err) {
    //   if (err instanceof Error) {
    //     error.value = err
    //   }
    // } finally {
    //   isLoading.value = false
    //   stream.value = null // 释放流引用
    //   abortController.value = null // 释放控制器
    // }
  }

  // 中断流式请求（强制关闭流）
  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort()
    }
  }

  return {
    startStream,
    cancel, // 新增中断方法
    data,
    error,
    isLoading,
  }
}
