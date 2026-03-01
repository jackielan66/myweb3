import type {ReactNode} from 'react';
import Link from 'next/link';
import WebVitalsReporter from '@/components/WebVitalsReporter';

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div style={{maxWidth: 960, margin: '0 auto', padding: 24}}>
      <WebVitalsReporter />
      <nav style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16}}>
        <Link href="/perf">目录</Link>
        <Link href="/perf/font/baseline">Font Baseline</Link>
        <Link href="/perf/font/optimized">Font Optimized</Link>
        <Link href="/perf/image/baseline">Image Baseline</Link>
        <Link href="/perf/image/optimized">Image Optimized</Link>
        <Link href="/perf/dynamic/baseline">Dynamic Baseline</Link>
        <Link href="/perf/dynamic/optimized">Dynamic Optimized</Link>
        <Link href="/perf/inp/baseline">INP Baseline</Link>
        <Link href="/perf/inp/optimized">INP Optimized</Link>
      </nav>
      {children}
    </div>
  );
}