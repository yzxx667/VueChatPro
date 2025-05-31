/**
 * @description 默认分隔符 {@link splitStream}
 */
const DEFAULT_STREAM_SEPARATOR = "\n\n";
/**
 * @description 默认分隔符 {@link splitPart}
 * @example "event: delta\ndata: {\"key\": \"value\"}"
 */
const DEFAULT_PART_SEPARATOR = "\n";
/**
 * @description 键值的默认分隔符，冒号(`:`)用于分隔键值
 * @example "event: delta"
 */
const DEFAULT_KV_SEPARATOR = ":";
import { ref } from "vue";

/**
 * 检查字符串是否不为空或者只包含空白字符
 */
const isValidString = (str: string) => (str ?? "").trim() !== "";

/**
 * @description 一个 TransformStream inst 根据条件将流分成几部分 {@link DEFAULT_STREAM_SEPARATOR}
 * @example
 *
 * `event: delta
 * data: { content: 'hello' }
 *
 * event: delta
 * data: { key: 'world!' }
 *
 * `
 */
function splitStream() {
  // 在转换之间存储不完整数据块的缓冲区
  let buffer = "";

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
      // console.log("streamChunk", streamChunk);
      // console.log("controller", controller);
      buffer += streamChunk;
      console.log("buffer", buffer);

      // 根据分隔符拆分缓冲区
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR);
      console.log("parts", parts);

      // 将除最后一个不完整部分之外的所有完整部分排入队列
      parts.slice(0, -1).forEach((part) => {
        // 跳过空字符串
        if (isValidString(part)) {
          controller.enqueue(part);
        }
      });

      // 将最后一个未完成的部分保存回缓冲区，用于下一个块
      buffer = parts[parts.length - 1] as string;
    },
    flush(controller) {
      // 如果缓冲区中还有剩余数据，将其作为最后一部分排队
      if (isValidString(buffer)) {
        controller.enqueue(buffer);
      }
    },
  });
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#fields
 */
export type SSEFields = "data" | "event" | "id" | "retry";

/**
 * @example
 * const sseObject = {
 *    event: 'delta',
 *    data: '{ key: "world!" }',
 * };
 */
export type SSEOutput = Partial<Record<SSEFields, any>>;

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
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR);

      const sseEvent = lines.reduce<SSEOutput>((acc, line) => {
        const separatorIndex = line.indexOf(DEFAULT_KV_SEPARATOR);

        if (separatorIndex === -1) {
          throw new Error(
            `键值分隔符 "${DEFAULT_KV_SEPARATOR}" 在sse行块中找不到!`
          );
        }

        // 提取从行首到分隔符的密钥
        const key = line.slice(0, separatorIndex);

        // 冒号用于注释行，直接跳过
        if (!isValidString(key)) return acc;

        // 从分隔符后的行中提取值
        const value = line.slice(separatorIndex + 1);

        return { ...acc, [key]: value };
      }, {});

      if (Object.keys(sseEvent).length === 0) return;

      // 将键-值对减少到单个对象中并排队
      controller.enqueue(sseEvent);
    },
  });
}

export interface ArtStreamOptions<Output> {
  /**
   * @description 可读的二进制数据流
   * @link https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
   */
  readableStream: ReadableStream<Uint8Array>;

  /**
   * @description 支持可定制的transformStream来转换流
   * @default sseTransformStream
   * @link https://developer.mozilla.org/en-US/docs/Web/API/TransformStream
   */
  transformStream?: TransformStream<string, Output>;
}

interface ArtReadableStream<R = any> extends ReadableStream<R> {
  [Symbol.asyncIterator]: () => AsyncGenerator<R, void, unknown>;
}

/**
 * @description 默认情况下，将 Uint8Array 二进制流转换为 {@link SSEOutput}
 * @warning "ArtStream" 仅支持 "utf-8" 编码。将来可能会有更多的编码支持。
 */
function ArtStream<Output = SSEOutput>(options: ArtStreamOptions<Output>) {
  const { readableStream, transformStream } = options;

  if (!(readableStream instanceof ReadableStream)) {
    throw new TypeError(
      "options.readableStream 必须是 readableStream 的实例。"
    );
  }

  // 默认编码是 "utf-8"
  const decoderStream = new TextDecoderStream();

  const stream = (
    transformStream
      ? /**
         * Uint8Array binary -> string -> Output
         */
        readableStream.pipeThrough(decoderStream).pipeThrough(transformStream)
      : /**
         * Uint8Array binary -> string -> SSE part string -> Default Output {@link SSEOutput}
         */
        readableStream
          .pipeThrough(decoderStream)
          .pipeThrough(splitStream())
          .pipeThrough(splitPart())
  ) as ArtReadableStream<Output>;
  console.log("stream", stream);

  /** support async iterator */
  stream[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      if (!value) continue;

      // Transformed data through all transform pipes
      yield value;
    }
  };

  return stream;
}

// const data = ref([]);
// async function ArtStream<Output = SSEOutput>(
//   options: ArtStreamOptions<Output>
// ) {
//   const { readableStream, transformStream } = options;

//   if (!(readableStream instanceof ReadableStream)) {
//     throw new TypeError(
//       "options.readableStream 必须是 readableStream 的实例。"
//     );
//   }

//   // 默认编码是 "utf-8"
//   const decoderStream = new TextDecoderStream();

//   const stream = (
//     transformStream
//       ? /**
//          * Uint8Array binary -> string -> Output
//          */
//         readableStream.pipeThrough(decoderStream).pipeThrough(transformStream)
//       : /**
//          * Uint8Array binary -> string -> SSE part string -> Default Output {@link SSEOutput}
//          */
//         readableStream
//           .pipeThrough(decoderStream)
//           .pipeThrough(splitStream())
//           .pipeThrough(splitPart())
//   ) as ArtReadableStream<Output>;
//   console.log("stream", stream);

//   /** support async iterator */
//   stream[Symbol.asyncIterator] = async function* () {
//     const reader = this.getReader();

//     while (true) {
//       const { done, value } = await reader.read();

//       if (done) break;

//       if (!value) continue;

//       // Transformed data through all transform pipes
//       yield value;
//     }
//   };

//   for await (const chunk of stream) {
//     // console.log('接收到 chunk:', chunk);
//     data.value.push(chunk);
//     // 输出形如: { data: '这是第 1 条消息' }
//   }

//   return { stream, data };
// }

// export default ArtStream;
