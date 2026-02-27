import { Suspense } from 'react';
import ClientTime from '@/app/components/ClientTime';

// 1. 复用类型和数据获取逻辑 (实际项目中可提取为公共函数)
type Props = {
  params: Promise<{ slug: string }>;
};

async function getDoc(slug: string) {
  // 模拟获取文档数据
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  if (!res.ok) throw new Error('Doc not found');
  return res.json();
}

// 2. 告诉 Next.js 在构建时预生成哪些 slug
export async function generateStaticParams() {
  // 获取前 10 篇文档的 ID
  const docs = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
  
  // 必须返回一个对象数组，每个对象包含参数 (slug)
  return docs.slice(0, 10).map((doc: any) => ({
    slug: doc.id.toString(),
  }));
}

async function DocContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getDoc(slug);

  return (
    <>
      <div className="mb-4 text-blue-600 font-bold uppercase tracking-wider">Documentation (SSG)</div>
      <h1 className="capitalize">{doc.title}</h1>
      <p>{doc.body}</p>
      <div className="text-xs text-gray-400 mt-8">
        Static Generated at: <ClientTime />
      </div>
    </>
  );
}

// 3. 页面组件
export default function DocPage({ params }: Props) {
  return (
    <div className="prose mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <Suspense fallback={<div className="text-gray-400">Loading documentation...</div>}>
        <DocContent params={params} />
      </Suspense>
    </div>
  );
}
