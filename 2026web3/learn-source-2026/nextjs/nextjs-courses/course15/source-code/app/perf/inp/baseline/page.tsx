import InpPanelBaseline from '@/components/InpPanelBaseline';

export default function Page() {
  return (
    <main style={{maxWidth: 860, margin: '0 auto', padding: 24}}>
      <h1 style={{fontSize: 28}}>INP 对比</h1>
      <InpPanelBaseline />
    </main>
  );
}