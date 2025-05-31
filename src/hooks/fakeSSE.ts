// fakeSSE.ts
/**
 * 创建一个模拟的 SSE 数据流
 * @param messageCount 要生成的消息数量
 * @param interval 每条消息之间的间隔时间（毫秒）
 * @returns ReadableStream<Uint8Array>
 */
export function createFakeSSEStream(
  messageCount: number,
  interval: number
): ReadableStream<Uint8Array> {
  let messageIndex = 0;

  return new ReadableStream({
    async start(controller) {
      // 模拟流式响应开始
      const startMessage = {
        id: crypto.randomUUID(),
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: "deepseek-reasoner",
        system_fingerprint: "fp_5417b77867_prod0425fp8",
        choices: [
          {
            index: 0,
            delta: {
              role: "assistant",
              content: null,
              reasoning_content: "",
            },
            logprobs: null,
            finish_reason: null,
          },
        ],
      };
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify(startMessage)}\n\n`)
      );
    },
    async pull(controller) {
      if (messageIndex >= messageCount) {
        // 发送结束标记
        const doneMessage = {
          id: crypto.randomUUID(),
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: "deepseek-reasoner",
          system_fingerprint: "fp_5417b77867_prod0425fp8",
          choices: [
            {
              index: 0,
              delta: {},
              logprobs: null,
              finish_reason: "stop",
            },
          ],
        };
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify(doneMessage)}\n\n`)
        );
        controller.close();
        return;
      }

      // 等待指定的时间间隔
      await new Promise((resolve) => setTimeout(resolve, interval));

      // 构造 SSE 格式的消息
      const message = {
        id: crypto.randomUUID(),
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: "deepseek-reasoner",
        system_fingerprint: "fp_5417b77867_prod0425fp8",
        choices: [
          {
            index: 0,
            delta: {
              content: `这是第 ${messageIndex + 1} 条消息  `,
              reasoning_content: "",
            },
            logprobs: null,
            finish_reason: null,
          },
        ],
      };

      // 发送 SSE 格式的数据
      const sseMessage = `data: ${JSON.stringify(message)}\n\n`;
      controller.enqueue(new TextEncoder().encode(sseMessage));

      messageIndex++;
    },
  });
}
