import Image from 'next/image';

export default function HeroImageOptimized() {
  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ fontSize: 32, lineHeight: 1.2 }}>Next.js 性能优化实战</h1>
      <p style={{ fontSize: 16, opacity: 0.8 }}>
        目标：首屏更快出现（LCP），点击更顺畅（INP），页面不乱跳（CLS）。
      </p>
      {/* 
        Next.js Image 组件核心优化原理：
        
        1. 自动优化：
           - 自动转换为 WebP/AVIF 格式（根据浏览器支持）
           - 自动压缩图片大小
           - 生成多个响应式尺寸
        
        2. priority 属性：
           - 使用 <link rel="preload"> 预加载关键资源
           - 禁用懒加载，首屏图片立即加载
           - 改善 LCP (Largest Contentful Paint)
        
        3. width/height 属性：
           - 浏览器提前知道图片尺寸，预留空间
           - 减少 CLS (Cumulative Layout Shift)
           - 避免图片加载后的布局偏移
        
        4. sizes 属性：
           - 响应式加载：移动端加载小图，桌面端加载大图
           - 节省带宽，不浪费流量
           - 更快的加载速度
      */}
      <Image
        src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=4000&auto=format&fit=crop"
        alt="hero"
        width={1200}
        height={800}
        priority
        sizes="(max-width: 768px) 100vw, 800px"
        style={{ width: '100%', height: 'auto', borderRadius: 12 }}
      />
      <button style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }}>
        我在图片下面（有尺寸 + priority 时更稳定）
      </button>
    </section>
  );
}