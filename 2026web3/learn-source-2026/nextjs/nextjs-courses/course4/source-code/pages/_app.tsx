// pages/_app.tsx
import type { AppProps } from 'next/app'
import Link from 'next/link'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex gap-4">
        <Link href="/">首页</Link>
        <Link href="/blog">blog</Link>
      </header>
      <main className="flex-1 p-6">
        <Component {...pageProps} />
      </main>
      <footer className="border-t p-4 text-center">© 2025 My Blog</footer>
    </div>
  )
}