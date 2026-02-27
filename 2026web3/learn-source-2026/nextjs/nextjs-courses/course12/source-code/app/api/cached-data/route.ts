// 📄 文件路径：app/api/cached-data/route.ts
import { NextResponse } from 'next/server';

// 🟢 方式一：ISR (增量静态再生)
// 每 60 秒更新一次缓存。
// 在这 60 秒内，所有用户都会看到同一个结果，无需重复查询数据库。
export const revalidate = 60;

export async function GET() {
  // 模拟耗时操作
  const data = {
    timestamp: new Date().toISOString(),
    message: "这条数据被缓存了！刷新浏览器，时间戳在 60 秒内不会变。"
  };

  return NextResponse.json(data);
}