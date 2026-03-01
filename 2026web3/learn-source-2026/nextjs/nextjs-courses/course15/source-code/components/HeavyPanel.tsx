'use client';

import {useMemo, useState} from 'react';

function buildItems(count: number) {
  return Array.from({length: count}, (_, id) => ({
    id,
    title: `Card ${id}`,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }));
}

export default function HeavyPanel() {
  const [count, setCount] = useState(6000);
  const items = useMemo(() => buildItems(count), [count]);

  return (
    <section style={{marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 12}}>
      <h2 style={{fontSize: 20}}>一个“偏重”的面板（用于演示）</h2>
      <p style={{opacity: 0.8}}>把它放在首屏，会明显拖慢首屏渲染与水合。</p>

      <label style={{display: 'flex', gap: 12, alignItems: 'center', marginTop: 12}}>
        <span>渲染数量</span>
        <input
          type="range"
          min={1000}
          max={12000}
          step={1000}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <span>{count}</span>
      </label>

      <div style={{marginTop: 12, fontSize: 12, opacity: 0.7}}>items: {items.length}</div>

      <div style={{marginTop: 12, height: 240, overflow: 'auto', border: '1px solid #eee', borderRadius: 8}}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              gap: 12,
              padding: 10,
              borderBottom: '1px solid #f3f3f3'
            }}
          >
            <div style={{width: 28, height: 28, borderRadius: 999, background: '#eaeaea'}} />
            <div style={{display: 'grid', gap: 4}}>
              <strong>{item.title}</strong>
              <span style={{fontSize: 12, opacity: 0.75}}>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}