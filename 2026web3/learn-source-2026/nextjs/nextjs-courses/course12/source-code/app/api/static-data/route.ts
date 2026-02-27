// 📄 文件路径：app/api/static-data/route.ts
import { NextResponse } from 'next/server';

// 🔵 Static 模式：构建时生成，永久缓存
// 适合省市区列表、配置字典等基本不变的数据
export const dynamic = 'force-static';

export async function GET() {
  const data = {
    content: "这是一条静态数据，构建后永远不会变",
    builtAt: new Date().toISOString(),
  };

  return NextResponse.json(data);
}