'use client';

import { useMemo, useState, useTransition } from 'react';

type Item = { id: number; text: string };

function buildData(total: number): Item[] {
  return Array.from({ length: total }, (_, id) => ({
    id,
    text: `Item ${id} - ${'react concurrent rendering '.repeat(4)}`
  }));
}

/**
 * INP 优化演示组件
 * 
 * 核心原理：使用 React 并发特性将更新分为两个优先级
 * 1. 紧急更新(setInput)：立即响应用户输入，保证输入框流畅
 * 2. 过渡更新(startTransition)：延迟列表过滤和渲染，可被新输入中断
 * 
 * 效果对比：
 * - 未优化：输入触发同步渲染 → 主线程阻塞 → INP 值高（卡顿）
 * - 已优化：输入立即响应 + 列表延迟更新 → INP 值低（流畅）
 */
export default function InpPanelOptimized() {
  // useTransition 用于管理过渡更新
  // isPending 表示当前是否在过渡更新中
  // startTransition 将更新标记为低优先级，可被中断
  const [isPending, startTransition] = useTransition();
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
    <section style={{ marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 12 }}>
      <h2 style={{ fontSize: 20 }}>INP 对比：optimized</h2>
      <p style={{ opacity: 0.8 }}>
        输入框是紧急更新；过滤与渲染列表是过渡更新。输入更跟手，列表允许“慢一点”。
      </p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
        >
          点击计数：{clicks}
        </button>
        <input
          value={input}
          onChange={(e) => {
            const next = e.target.value;
            setInput(next); // 🔴 紧急更新：立即更新输入框，高优先级
            startTransition(() => setQuery(next)); // 🟡 过渡更新：延迟触发列表过滤，低优先级
          }}
          placeholder="快速输入，观察是否更顺…"
          style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
        <span style={{ width: 120, fontSize: 12, opacity: 0.7 }}>渲染上限：{limit}</span>
        <input
          type="range"
          aria-label="render-limit"
          min={1000}
          max={20000}
          step={1000}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{ flex: 1 }}
        />
      </div>

      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
        {isPending ? '处理中…' : '就绪'} / total: {data.length} / rendered: {Math.min(filtered.length, limit)} / query: &quot;{query}&quot;
      </div>

      <div style={{ marginTop: 12, height: 260, overflow: 'auto', border: '1px solid #eee', borderRadius: 8 }}>
        {filtered.slice(0, limit).map((item) => (
          <div key={item.id} style={{ padding: '6px 10px', borderBottom: '1px solid #f3f3f3' }}>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
