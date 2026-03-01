/**
 * 📄 Pages Router 示例 - 全局布局 (_app.tsx)
 * 
 * 🔄 对比：
 * - Pages Router: pages/_app.tsx (自定义 App 组件)
 * - App Router:   app/layout.tsx (根布局)
 * 
 * 💡 _app.tsx 的作用：
 * - 全局布局（导航栏、页脚）
 * - 全局状态（Context Provider）
 * - 全局样式
 * - 页面切换时保持布局不变
 */

import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

// 全局样式可以在这里引入
// import '../styles/globals.css';

// 简单的内联样式
const styles = {
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#78350f',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    color: '#78350f',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'background 0.2s',
  },
  navLinkActive: {
    background: 'rgba(255,255,255,0.3)',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '0 1rem',
  },
  footer: {
    background: '#fef3c7',
    padding: '1.5rem 2rem',
    marginTop: 'auto',
    textAlign: 'center' as const,
    borderTop: '1px solid #fcd34d',
  },
  badge: {
    display: 'inline-block',
    background: '#fbbf24',
    color: '#78350f',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  },
};

// 导航链接配置
const navLinks = [
  { href: '/old-home', label: '首页' },
  { href: '/old-data-fetching', label: '数据获取' },
  { href: '/old-posts/1', label: '文章详情' },
  { href: '/old-about', label: '关于' },
];

/**
 * 自定义 App 组件
 * 
 * ⚠️ Pages Router 的痛点：
 * - 只能有一个全局布局，无法嵌套
 * - 更换布局需要额外的逻辑处理
 * - 难以实现部分页面使用不同布局
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // 检查当前路径是否匹配
  const isActive = (href: string) => {
    if (href === '/old-home') {
      return router.pathname === '/old-home';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <div style={styles.layout}>
      {/* 全局导航栏 */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link href="/old-home" style={styles.logo}>
            🕰️ Pages Router Demo
            <span style={styles.badge}>Legacy</span>
          </Link>
          
          <nav style={styles.nav}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  ...styles.navLink,
                  ...(isActive(link.href) ? styles.navLinkActive : {}),
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* 页面内容 */}
      <main style={styles.main}>
        <Component {...pageProps} />
      </main>

      {/* 全局页脚 */}
      <footer style={styles.footer}>
        <p style={{ color: '#92400e', margin: 0 }}>
          ⚠️ 这是 <strong>Pages Router</strong> 的全局布局示例
        </p>
        <p style={{ color: '#b45309', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          通过 <code>pages/_app.tsx</code> 实现 | 
          <Link href="/" style={{ color: '#4f46e5', marginLeft: '0.5rem' }}>
            对比 App Router 版本 →
          </Link>
        </p>
      </footer>
    </div>
  );
}
