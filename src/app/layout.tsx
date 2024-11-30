import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/footer";
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
      <body className="dark px-4 py-8 lg:p-16 min-h-screen flex flex-col">
        <header>
          <Link href="/">
            <h1 className="text-4xl font-bold">ATProto Browser</h1>
          </Link>
          <p className="text-lg text-gray-500">
            Experimental browser for the Atmosphere
          </p>
        </header>
        <div className="py-8 flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
