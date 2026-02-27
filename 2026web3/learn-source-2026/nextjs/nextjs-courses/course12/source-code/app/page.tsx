// app/page.tsx
import { DemoNav } from '@/components/DemoNav';

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <div className="text-4xl font-bold text-gray-800 dark:text-white">hello, next.js</div>
     <DemoNav />
    </main>
  );
}
