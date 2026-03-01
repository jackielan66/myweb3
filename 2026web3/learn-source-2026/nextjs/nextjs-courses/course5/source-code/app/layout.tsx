// app/layout.tsx
import './globals.css'; // 引入全局样式

// 定义 Metadata，用于 SEO
export const metadata = {
  title: '我的 Next.js 应用',
  description: '由 Next.js 驱动',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <header className='h-16 bg-gray-200 p-4'>我是全局导航栏</header>
        {children} {/* 页面内容会在这里被渲染 */}
        <footer className='h-16 bg-gray-200 p-4'>我是全局页脚</footer>
      </body>
    </html>
  );
}