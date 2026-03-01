import HeavyPanelLazy from '../../../../components/HeavyPanelLazy';

export default function Page() {
  return (
    <main style={{maxWidth: 860, margin: '0 auto', padding: 24}}>
      <h1 style={{fontSize: 28}}>dynamic 对比：optimized</h1>
      <p style={{opacity: 0.8, marginTop: 8}}>
       “ 用 `dynamic ssr:false` 把重组件延后加载，并提供 loading 占位。“
      </p>
      <HeavyPanelLazy />
    </main>
  );
}