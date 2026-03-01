import Link from 'next/link';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='bg-yellow-200 p-4'>
      <nav>
        <Link href="/">Marketing 首页</Link>
        <Link href="/pricing">Marketing 定价</Link>
      </nav>
      {children}
    </section>
  );
}