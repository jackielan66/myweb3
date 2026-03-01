export default function Page() {
  return (
    <main style={{maxWidth: 860, margin: '0 auto', padding: 24}}>
      <h1 style={{fontSize: 56, maxWidth: 520}}>
        Font Loading Demo: Watch This Heading Reflow and Shift
      </h1>
      <p style={{fontSize: 22, marginTop: 24, lineHeight: 1.55, maxWidth: 520}}>
        Baseline：先用系统字体渲染，约 1.8 秒后再切换到 Web Font。把窗口缩窄一些，然后硬刷新几次，
        你会更容易看到标题换行与下面参考线的位移（CLS）。
      </p>
      <div style={{marginTop: 20, padding: 12, borderRadius: 10, background: '#111', color: '#fff', maxWidth: 520}}>
        Tip：观察标题行高变化与换行位置变化
      </div>
      <div style={{marginTop: 28, padding: 20, background: '#eee', maxWidth: 520}}>
        Reference line: I get pushed down when the font swaps
      </div>
    </main>
  );
}