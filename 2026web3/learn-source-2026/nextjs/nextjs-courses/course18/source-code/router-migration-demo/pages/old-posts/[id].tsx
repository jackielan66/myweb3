/**
 * 📄 Pages Router 示例 - 动态路由
 * 
 * 🔄 对比路径：
 * - Pages Router: /old-posts/[id] (pages/old-posts/[id].tsx)
 * - App Router:   /posts/[id] (app/posts/[id]/page.tsx)
 * 
 * 💡 核心区别：
 * - Pages Router: 使用 router.query.id 或 getServerSideProps 获取参数
 * - App Router: 直接从 params 获取，更简洁
 */

import Head from 'next/head';
import { useRouter } from 'next/router';  // ⚠️ Pages Router 使用 next/router
import Link from 'next/link';

// 模拟文章数据
const posts: Record<string, { title: string; content: string; author: string }> = {
  '1': { title: '理解 Server Components', content: '这是一篇关于 RSC 的深度解析...', author: '张三' },
  '2': { title: 'App Router 数据获取指南', content: '本文介绍 App Router 中的数据获取方式...', author: '李四' },
  '3': { title: '从 Pages Router 迁移实战', content: '记录我们团队迁移到 App Router 的经验...', author: '王五' },
};

export default function OldPostPage() {
  const router = useRouter();
  
  // ⚠️ Pages Router 使用 router.query 获取动态参数
  // 注意：首次渲染时 query 可能是空对象（hydration）
  const { id } = router.query;
  
  // 处理 id 未加载的情况
  if (!id || typeof id !== 'string') {
    return <div style={{ padding: '2rem 0' }}>加载中...</div>;
  }

  const post = posts[id];

  if (!post) {
    return (
      <div style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h1>🔍 文章未找到</h1>
        <p>ID: {id} 不存在</p>
        <Link href="/old-home">返回首页</Link>
      </div>
    );
  }

  return (
    <>
      {/* ⚠️ Pages Router 使用 <Head> 设置 SEO */}
      <Head>
        <title>{post.title} | 博客</title>
        <meta name="description" content={post.content.slice(0, 50)} />
      </Head>

      <div style={{ padding: '2rem 0' }}>
        <h1>📝 {post.title}</h1>
        
        <div style={{ 
          background: '#fef3c7', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <p><strong>当前位置：</strong><code>pages/old-posts/[id].tsx</code></p>
          <p style={{ marginTop: '0.5rem' }}>
            ⚠️ 使用 <code>router.query.id</code> 获取动态参数
          </p>
        </div>

        <div style={{ 
          background: '#fee2e2', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <h3>❌ Pages Router 的痛点</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#991b1b' }}>
            <li><code>router.query</code> 首次渲染时可能为空（需要处理）</li>
            <li>查询参数和动态参数混在一起（都在 query 里）</li>
            <li>SEO 需要手动写 <code>&lt;Head&gt;</code> 组件</li>
          </ul>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#6b7280' }}>
            当前文章 ID：<code>{id}</code>
          </p>
          <p style={{ marginTop: '1rem' }}>{post.content}</p>
          <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            作者：{post.author}
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href={`/posts/${id}`} style={{ color: '#4f46e5' }}>
            → 查看 App Router 版本对比
          </a>
        </div>
      </div>
    </>
  );
}
