// app/dashboard/layout.tsx
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <nav className="w-1/4 bg-gray-200 p-4">
        <h2>后台管理</h2>
        <ul>
          <li><Link href="/dashboard">仪表盘</Link></li>
          <li><Link href="/dashboard/settings">设置</Link></li>
        </ul>
      </nav>
      <main className="w-3/4 p-8">{children}</main>
    </section>
  );
}