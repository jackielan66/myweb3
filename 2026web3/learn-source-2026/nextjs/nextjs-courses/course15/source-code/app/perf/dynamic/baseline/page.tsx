import HeavyPanel from '../../../../components/HeavyPanel';

export default function Page() {
  return (
    <main style={{maxWidth: 860, margin: '0 auto', padding: 24}}>
      <h1 style={{fontSize: 28}}>dynamic 对比：baseline</h1>
      <p style={{opacity: 0.8, marginTop: 8}}>首屏直接渲染重组件，JS 压力更大。</p>
      <HeavyPanel />
    </main>
  );
}