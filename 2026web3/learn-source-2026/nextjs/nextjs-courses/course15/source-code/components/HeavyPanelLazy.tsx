'use client';

import dynamic from 'next/dynamic';

const HeavyPanel = dynamic(() => import('./HeavyPanel'), {
  ssr: false,
  loading: () => (
    <div style={{marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 12}}>
      正在加载面板…
    </div>
  )
});

export default function HeavyPanelLazy() {
  return <HeavyPanel />;
}