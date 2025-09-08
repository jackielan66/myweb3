import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Header from "@/components/layout/Header";
import { Web3Provider } from "@/components/providers/Web3Provider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaNodeSwap - 去中心化交易所",
  description: "基于区块链的去中心化代币交换平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen font-sans`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="dex-ui-theme"
        >
          <Web3Provider>
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
