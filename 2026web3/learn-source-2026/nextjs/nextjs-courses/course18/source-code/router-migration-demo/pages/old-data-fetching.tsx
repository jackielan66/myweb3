/**
 * 📄 Pages Router 示例 - 数据获取
 * 
 * 🔄 对比路径：
 * - Pages Router: /old-data-fetching (pages/old-data-fetching.tsx)
 * - App Router:   /data-fetching (app/data-fetching/page.tsx)
 * 
 * 💡 核心区别：
 * - Pages Router 必须使用 getServerSideProps 或 getStaticProps
 * - App Router 直接在组件里 await fetch()
 */

import Head from 'next/head';
import { GetServerSideProps } from 'next';

// 定义 Props 类型
type Post = {
  id: number;
  title: string;
  views: number;
};

type Props = {
  posts: Post[];
  fetchTime: string;
};

// ⚠️ Pages Router 必须使用这个函数获取数据
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // 模拟数据获取
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const posts: Post[] = [
    { id: 1, title: '理解 Server Components', views: 1234 },
    { id: 2, title: 'App Router 数据获取指南', views: 567 },
    { id: 3, title: '从 Pages Router 迁移实战', views: 890 },
  ];

  return {
    props: {
      posts,
      fetchTime: new Date().toLocaleTimeString('zh-CN'),
    },
  };
};

// 组件通过 props 接收数据（不能直接 await）
export default function OldDataFetchingPage({ posts, fetchTime }: Props) {
  return (
    <>
      <Head>
        <title>Pages Router - 数据获取示例</title>
      </Head>

      <div style={{ padding: '2rem 0' }}>
        <h1>📊 Pages Router 数据获取</h1>
        
        <div style={{ 
          background: '#fef3c7', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <p><strong>当前位置：</strong><code>pages/old-data-fetching.tsx</code></p>
          <p style={{ marginTop: '0.5rem' }}>
            ⚠️ 使用 <code>getServerSideProps</code> 获取数据
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
            <li>必须使用特定的函数名 (getServerSideProps)</li>
            <li>数据只能通过 props 传递</li>
            <li>无法在组件内部直接 await</li>
            <li>需要单独定义 Props 类型</li>
          </ul>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem',
          border: '1px solid #e5e7eb'
        }}>
          <h2>📝 文章列表</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            数据获取时间：<code>{fetchTime}</code>
          </p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {posts.map(post => (
              <li key={post.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{post.title}</strong>
                <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                  👁️ {post.views} 次阅读
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href="/data-fetching" style={{ color: '#4f46e5' }}>
            → 查看 App Router 版本对比
          </a>
        </div>
      </div>
    </>
  );
}
