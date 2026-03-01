/**
 * 📄 Pages Router 示例 - 自定义 Document (_document.tsx)
 * 
 * 🔄 对比：
 * - Pages Router: pages/_document.tsx (自定义 HTML 结构)
 * - App Router:   app/layout.tsx 中直接写 <html> <body>
 * 
 * 💡 _document.tsx 的作用：
 * - 自定义 <html> 和 <body> 标签属性
 * - 添加全局 <head> 内容（字体、第三方脚本等）
 * - 只在服务端渲染，不会在客户端更新
 * 
 * ⚠️ 注意事项：
 * - 只在服务端执行
 * - 不能添加事件处理程序
 * - 不能使用 React hooks
 */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        {/* 
          全局 <head> 内容
          注意：这里的 Head 是 next/document 的，不是 next/head 的
          用于添加所有页面都需要的内容
        */}
        
        {/* 预连接到外部资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        
        {/* 全局 favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* 全局 meta 标签 */}
        <meta name="theme-color" content="#fbbf24" />
        
        {/* 
          ⚠️ Pages Router 的局限：
          - 每个页面的 title 需要用 next/head 的 <Head> 单独设置
          - 动态 meta 标签也需要在每个页面单独处理
        */}
      </Head>
      
      <body style={{ margin: 0, padding: 0 }}>
        {/* 主要内容渲染位置 */}
        <Main />
        
        {/* Next.js 脚本注入位置 */}
        <NextScript />
        
        {/* 
          可以在这里添加全局脚本
          例如：Google Analytics、第三方 SDK 等
        */}
      </body>
    </Html>
  );
}
