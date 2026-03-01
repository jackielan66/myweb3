import Link from 'next/link';

export default function Page() {
  return (
    <section>
      <h1>仪表盘</h1>
      <p>欢迎回来！这里是你的数据总览。</p>
      <p>
        前往 <Link href="/dashboard/settings">设置</Link>
      </p>
    </section>
  );
}