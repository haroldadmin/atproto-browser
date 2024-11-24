import React from "react";

export default function LinkSpan({ children }: React.PropsWithChildren) {
  return <span className="text-blue-500 underline">{children}</span>;
}
