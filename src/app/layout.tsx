import Footer from "@/components/footer";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import logo from "../../public/atproto-browser.svg";
import ogCard from "../../public/og-card.png";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "ATProto Browser",
  description: "Experimental browser for the Atmosphere",
  openGraph: {
    type: "website",
    title: "ATProto Browser",
    description: "Experimental browser for the Atmosphere",
    siteName: "ATProto Browser",
    images: [ogCard.src],
    url: "https://www.atproto-browser.dev",
  },
  twitter: {
    title: "ATProto Browser",
    description: "Experimental browser for the Atmosphere",
    site: "https://www.atproto-browser.dev",
    images: [ogCard.src],
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://www.atproto-browser.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="px-4 py-8 lg:px-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src={logo}
                  width={52}
                  height={52}
                  alt="ATProto Browser"
                />
              </Link>
              <div>
                <Link href="/">
                  <h1 className="text-2xl md:text-4xl font-bold">
                    ATProto Browser
                  </h1>
                </Link>
                <p className="md:text-lg text-gray-600 dark:text-gray-300">
                  Experimental browser for the Atmosphere
                </p>
              </div>
            </div>
          </header>
          <div className="px-4 lg:px-16 flex-grow">{children}</div>
          <Footer className="px-4 lg:px-16" />
        </ThemeProvider>
      </body>
    </html>
  );
}
