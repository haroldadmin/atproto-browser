export function streamMessages(
  connection: WebSocket
): ReadableStream<MessageEvent> {
  const stream = new ReadableStream<MessageEvent>(
    {
      start: () => {},
      pull: async (controller) => {
        const message = await nextMessage(connection);
        controller.enqueue(message);
      },
      cancel: () => {
        connection.close();
      },
    },
    new CountQueuingStrategy({ highWaterMark: 1 })
  );

  return stream;
}

async function nextMessage(connection: WebSocket) {
  const message = await new Promise<MessageEvent>((resolve, reject) => {
    connection.onmessage = resolve;
    connection.onerror = reject;
  });

  return message;
}
