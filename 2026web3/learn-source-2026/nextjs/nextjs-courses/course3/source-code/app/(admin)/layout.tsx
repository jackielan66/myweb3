// app/(admin)/layout.tsx
import Link from 'next/link'
import React from 'react'

// layout 组件的参数是一个对象，包含了被包裹的页面内容 children
// 参照官方文档 https://nextjs.org/docs/app/api-reference/file-conventions/layout#layout-props-helper
export default function AdminLayout({
  children, // `children` 代表被这个布局包裹的页面内容
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-lg mb-4">管理后台</h2>
        <ul className="flex flex-col gap-2">
          <li><Link href="/dashboard" className="hover:underline">仪表盘</Link></li>
          <li><Link href="/dashboard/settings" className="hover:underline">设置</Link></li>
        </ul>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </section>
  )
}