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
      <body className="p-4 lg:p-16">
        <header className="mb-4">
          <h1 className="text-4xl font-bold">ATProto Browser</h1>
          <p className="text-lg text-gray-500">
            Experimental browser for the Atmosphere
          </p>
        </header>
        {children}
      </body>
    </html>
  );
}
