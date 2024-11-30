import React from "react";
import { twMerge } from "tailwind-merge";

export default function LinkSpan({
  children,
  className,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  return (
    <span className={twMerge("text-blue-500 underline", className)}>
      {children}
    </span>
  );
}
