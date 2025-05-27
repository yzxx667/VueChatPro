// fakeSSE.ts
export function createFakeSSEStream(
  total = 5,
  intervalMs = 1000
): ReadableStream<Uint8Array> {
  let count = 0;

  return new ReadableStream<Uint8Array>({
    start(controller) {
      const interval = setInterval(() => {
        count++;

        const message = `data: 这是第 ${count} 条消息\n\n`;
        controller.enqueue(new TextEncoder().encode(message));

        if (count >= total) {
          clearInterval(interval);
          controller.close();
        }
      }, intervalMs);
    },
  });
}
