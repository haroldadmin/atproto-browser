import { concat } from "lodash";
import { useState, useRef, useCallback } from "react";

export function useGenerator<T>(createGenerator: () => AsyncGenerator<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const ref = useRef(createGenerator());

  const generate = useCallback(async () => {
    try {
      setLoading(true);
      const next = await ref.current.next();
      if (next.value) {
        setItems(concat(items, next.value));
      }

      setHasMore(!next.done);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [items]);

  return { generate, items, hasMore, loading };
}
