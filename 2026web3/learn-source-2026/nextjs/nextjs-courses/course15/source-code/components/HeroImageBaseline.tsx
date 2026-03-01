export default function HeroImageBaseline() {
  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ fontSize: 32, lineHeight: 1.2 }}>Next.js 性能优化实战</h1>
      <p style={{ fontSize: 16, opacity: 0.8 }}>
        目标：首屏更快出现（LCP），点击更顺畅（INP），页面不乱跳（CLS）。
      </p>

      <img
        src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=4000&auto=format&fit=crop"
        alt="hero"
        loading="lazy"
        style={{ width: '100%', borderRadius: 12, display: 'block' }}
      />
      <button style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }}>
        我在图片下面（如果图片晚到/无尺寸，容易看到位移）
      </button>
    </section>
  );
}