import Link from 'next/link';

const items = [
  {href: '/perf/font/baseline', label: 'Font / Baseline'},
  {href: '/perf/font/optimized', label: 'Font / Optimized'},
  {href: '/perf/image/baseline', label: 'Image / Baseline'},
  {href: '/perf/image/optimized', label: 'Image / Optimized'},
  {href: '/perf/dynamic/baseline', label: 'Dynamic / Baseline'},
  {href: '/perf/dynamic/optimized', label: 'Dynamic / Optimized'},
  {href: '/perf/inp/baseline', label: 'INP / Baseline'},
  {href: '/perf/inp/optimized', label: 'INP / Optimized'}
];

export default function Page() {
  return (
    <main style={{display: 'grid', gap: 8}}>
      <h1 style={{fontSize: 28}}>性能对比目录</h1>
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </main>
  );
}