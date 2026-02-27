// 📄 文件路径：app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// 为了方便浏览器演示，这里使用 GET。生产环境建议使用 POST 并配合签名校验。
export async function GET(request: NextRequest) {
//   // 1. 安全校验 (防止恶意刷新)
//   const secret = request.nextUrl.searchParams.get('secret');
//   if (secret !== process.env.MY_SECRET_TOKEN) {
//     return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
//   }
  
  // 2. 获取要刷新的标签
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) {
    // 3. 触发 Next.js 缓存清除
    // Next.js 16+: revalidateTag 推荐传入第二个参数来控制缓存行为。
    // 这里使用 { expire: 0 } 表示立即过期（Hard Refresh），符合 CMS 内容更新后希望立即看到结果的场景。
    // 如果传入 'max'，则会标记为 Stale（旧数据），下一次访问先展示旧数据，后台更新。
    revalidateTag(tag, { expire: 0 });
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }
  
  return NextResponse.json({ revalidated: false, now: Date.now() });
}