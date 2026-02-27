import { Suspense } from 'react';
import ClientTime from '@/app/components/ClientTime';

type Props = {
  params: Promise<{ id: string }>;
};

async function getNews(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    // 👇 关键修改：设置 revalidate 时间（秒）
    next: { revalidate: 60 } 
  });
  if (!res.ok) throw new Error('News not found');
  return res.json();
}

// 即使是 ISR，我们也可以预生成一部分热门新闻
export async function generateStaticParams() {
  const newsItems = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
  return newsItems.slice(0, 10).map((item: any) => ({
    id: item.id.toString(),
  }));
}

async function NewsContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = await getNews(id);

  return (
    <>
      <div className="mb-4 text-red-600 font-bold uppercase tracking-wider">News (ISR - 60s)</div>
      <h1 className="capitalize">{news.title}</h1>
      <p>{news.body}</p>
      <div className="text-xs text-gray-400 mt-8">
        Last Updated: <ClientTime />
      </div>
    </>
  );
}

export default function NewsPage({ params }: Props) {
  return (
    <div className="prose mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <Suspense fallback={<div className="text-gray-400">Loading news...</div>}>
        <NewsContent params={params} />
      </Suspense>
    </div>
  );
}
