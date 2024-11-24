import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATProto browser",
  description: "Experimental browser for the Atmosphere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
