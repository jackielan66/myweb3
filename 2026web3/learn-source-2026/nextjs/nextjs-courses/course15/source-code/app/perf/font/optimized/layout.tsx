import type { ReactNode } from 'react';
import { Playfair_Display } from 'next/font/google';

/**
 * next/font/google 优化字体加载
 * 
 * 用法：
 * 1. 从 next/font/google 导入字体函数
 * 2. 配置字体选项（subsets、weight、display 等）
 * 3. 通过 font.className 应用到组件
 * 
 * 配置选项：
 * - subsets: 字符集，减少字体文件大小
 * - weight: 字重，只加载需要的字重
 * - display: 'swap' 使用字体交换策略，避免文本不可见
 * - adjustFontFallback: 自动调整后备字体，减少 CLS
 * 
 * 优化效果：
 * ✅ 自动托管字体文件，避免外部请求
 * ✅ 构建时下载字体，零运行时开销
 * ✅ 自动优化字体加载策略
 * ✅ 减少 CLS (Cumulative Layout Shift)
 * ✅ 改善 LCP (Largest Contentful Paint)
 */
const font = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  adjustFontFallback: true
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={font.className}>
      <style>{`
        h1 {
          line-height: 1.02;
          letter-spacing: -0.03em;
        }
      `}</style>
      {children}
    </div>
  );
}