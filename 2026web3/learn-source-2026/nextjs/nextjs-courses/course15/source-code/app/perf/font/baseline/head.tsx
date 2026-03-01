/**
 * Next.js App Router 的 head 组件
 * 
 * 作用：在页面 <head> 中注入 Google Fonts 字体链接
 * - 加载 Playfair Display 字体（400、700、900 字重）
 * - display=swap 使用字体交换策略，避免文本不可见
 * 
 * 性能影响（Baseline 基线测试）：
 * ❌ 外部字体加载可能阻塞渲染
 * ❌ 可能导致 FOUT (Flash of Unstyled Text) 或 FOIT (Flash of Invisible Text)
 * ❌ 影响 LCP 和 CLS 等 Web Vitals 指标
 * 
 * 优化建议：使用 next/font 自动优化字体加载
 */
export default function Head() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
    </>
  );
}