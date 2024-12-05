import { useCallback, useEffect, useState } from "react";

export function useDocumentVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  const onVisibilityChange = useCallback(() => {
    const visible = !globalThis.document.hidden;
    setIsVisible(visible);
  }, []);

  useEffect(() => {
    globalThis.document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );
    return () => {
      globalThis.document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
    };
  }, [onVisibilityChange]);

  return isVisible;
}
