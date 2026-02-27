import ClientWidgetDemo from '@/components/ClientWidgetDemo';
import LikeButton from '@/components/LikeButton'

export default function Home() {
  const initialCount = 3

  return (
    <div className='p-8'>
      hello, next.js
      <h1 className="text-2xl font-bold mb-2">首页（RSC）</h1>
      <p className="mb-4">下面是一个客户端交互按钮：</p>
      <LikeButton initialCount={initialCount} />
      <ClientWidgetDemo />
    </div>
  );
}
