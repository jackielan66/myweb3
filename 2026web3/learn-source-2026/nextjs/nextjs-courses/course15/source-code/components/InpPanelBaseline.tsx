'use client';

import {useMemo, useState} from 'react';

type Item = {id: number; text: string};

function buildData(total: number): Item[] {
  return Array.from({length: total}, (_, id) => ({
    id,
    text: `Item ${id} - ${'react concurrent rendering '.repeat(4)}`
  }));
}

export default function InpPanelBaseline() {
  const data = useMemo(() => buildData(80000), []);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(8000);
  const [clicks, setClicks] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => item.text.toLowerCase().includes(q));
  }, [data, query]);

  return (
    <section style={{marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 12}}>
      <h2 style={{fontSize: 20}}>INP 对比：baseline</h2>
      <p style={{opacity: 0.8}}>
        每次输入都会同步触发“过滤 + 渲染大量列表”，输入和按钮会明显卡顿。
      </p>

      <div style={{display: 'flex', gap: 12, alignItems: 'center', marginTop: 12}}>
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd'}}
        >
          点击计数：{clicks}
        </button>
        <input
          value={input}
          onChange={(e) => {
            const next = e.target.value;
            setInput(next);
            setQuery(next);
          }}
          placeholder="快速输入，观察卡顿…"
          style={{flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd'}}
        />
      </div>

      <div style={{display: 'flex', gap: 12, alignItems: 'center', marginTop: 12}}>
        <span style={{width: 120, fontSize: 12, opacity: 0.7}}>渲染上限：{limit}</span>
        <input
          type="range"
          aria-label="render-limit"
          min={1000}
          max={20000}
          step={1000}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{flex: 1}}
        />
      </div>

      <div style={{marginTop: 12, fontSize: 12, opacity: 0.7}}>
        total: {data.length} / rendered: {Math.min(filtered.length, limit)} / query: &quot;{query}&quot;
      </div>

      <div style={{marginTop: 12, height: 260, overflow: 'auto', border: '1px solid #eee', borderRadius: 8}}>
        {filtered.slice(0, limit).map((item) => (
          <div key={item.id} style={{padding: '6px 10px', borderBottom: '1px solid #f3f3f3'}}>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
