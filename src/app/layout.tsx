import Navigation from "@/components/navigation";
import type { Metadata } from "next";
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
      <body className="dark p-4 lg:p-16 min-h-screen">
        <header className="mb-4">
          <h1 className="text-4xl font-bold">ATProto Browser</h1>
          <p className="text-lg text-gray-500">
            Experimental browser for the Atmosphere
          </p>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
