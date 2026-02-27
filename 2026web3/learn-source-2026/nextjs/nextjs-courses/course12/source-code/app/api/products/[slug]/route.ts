// 📄 文件路径：app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ✅ 手动定义 Context 类型 (Next.js 没有导出 RouteContext)
// 注意：'params' 在 Next.js 15+ 是异步的
type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  request: NextRequest, 
  context: Context
) {
  // context.params 是一个 Promise，需要 await
  const { slug } = await context.params;

  return NextResponse.json({ 
    product: slug,
    price: 99.99
  });
}
