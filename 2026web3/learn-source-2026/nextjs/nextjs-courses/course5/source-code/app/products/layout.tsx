'use client';
import { useState } from 'react';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');

  return (
    <div className='m-4'>
      <aside className=''>
        <input
          className=''
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索产品..."
        />
      </aside>
      <main className='main-content'>{children}</main>
    </div>
  );
}