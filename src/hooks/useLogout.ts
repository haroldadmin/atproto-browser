import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useLogout(): [() => Promise<void>, boolean] {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    await fetch("/oauth/logout", { method: "POST" });
    router.refresh();
    setIsLoggingOut(false);
  }, [router]);

  return [logout, isLoggingOut];
}
