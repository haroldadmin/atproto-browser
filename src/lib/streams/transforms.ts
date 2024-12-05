export function sampled<T>(sampleRate: number) {
  return new TransformStream<T, T>({
    transform: (chunk, controller) => {
      if (Math.random() > sampleRate) {
        return;
      }
      controller.enqueue(chunk);
    },
  });
}

export function mapped<T, R>(mapper: (value: T) => R) {
  return new TransformStream<T, R>({
    transform: (chunk, controller) => {
      controller.enqueue(mapper(chunk));
    },
  });
}

export function collector<T>(callback: (value: T) => void) {
  return new WritableStream<T>({
    start: () => {},
    write: (chunk, controller) => {
      if (controller.signal.aborted) {
        return;
      }
      callback(chunk);
    },
  });
}
