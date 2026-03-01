/**
 * 📄 动态路由演示 - [id] 参数获取 + Metadata
 * 
 * 🔄 迁移对照：
 * - Pages Router: pages/posts/[id].tsx + router.query.id
 * - App Router: app/posts/[id]/page.tsx + params.id
 * 
 * 💡 Metadata 迁移：
 * - Pages Router: <Head><title>...</title></Head>
 * - App Router: export async function generateMetadata() {...}
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// 模拟文章数据
const posts: Record<string, { title: string; content: string; author: string }> = {
  '1': { title: '理解 Server Components', content: '这是一篇关于 RSC 的深度解析...', author: '张三' },
  '2': { title: 'App Router 数据获取指南', content: '本文介绍 App Router 中的数据获取方式...', author: '李四' },
  '3': { title: '从 Pages Router 迁移实战', content: '记录我们团队迁移到 App Router 的经验...', author: '王五' },
};

type Props = {
  params: Promise<{ id: string }>;
};

// ✅ 动态生成 Metadata（替代 <Head>）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = posts[id];
  
  if (!post) {
    return { title: '文章未找到' };
  }
  
  return {
    title: `${post.title} | 博客`,
    description: post.content.slice(0, 50),
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = posts[id];

  // ✅ 使用 notFound() 触发 not-found.tsx
  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>📝 {post.title}</h1>
      
      <div className="card" style={{ background: '#f0f9ff' }}>
        <h3>🔄 迁移要点</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <strong>路由参数获取：</strong><br/>
          Pages Router: <code>router.query.id</code><br/>
          App Router: <code>params.id</code> (直接从 props 获取)
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <strong>SEO Metadata：</strong><br/>
          Pages Router: <code>&lt;Head&gt;&lt;title&gt;...&lt;/title&gt;&lt;/Head&gt;</code><br/>
          App Router: <code>export async function generateMetadata()</code>
        </p>
      </div>

      <div className="card">
        <p style={{ color: '#6b7280' }}>
          当前文章 ID：<code>{id}</code>
        </p>
        <p style={{ marginTop: '1rem' }}>{post.content}</p>
        <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          作者：{post.author}
        </p>
      </div>

      <div className="card" style={{ background: '#fef3c7' }}>
        <p>
          💡 <strong>试一试：</strong>访问 <code>/posts/999</code> 看看 404 页面
        </p>
      </div>
    </div>
  );
}
