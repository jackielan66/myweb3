// components/DemoNav.tsx
import Link from 'next/link';

// 默认是 Server Component，无需 'use client'
// 优势：HTML 直出，SEO 友好，且零 JavaScript 发送到客户端（除非包含 Client Component）
export function DemoNav() {
  return (
    <div className="flex gap-4 mt-4 p-4 border rounded bg-gray-50">
      <Link href="/comments" className="text-blue-500 underline hover:text-blue-700">
        Server Actions 演示 (/comments)
      </Link>
      <Link href="/api/comments/123" className="text-blue-500 underline hover:text-blue-700">
        API Route 演示 (/api/comments/123)
      </Link>
    </div>
  );
}