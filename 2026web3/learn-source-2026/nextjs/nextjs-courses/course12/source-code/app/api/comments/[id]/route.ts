// 📄 文件路径：app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 1. 定义动态参数类型
type Params = Promise<{ id: string }>;

// 2. 支持的标准 HTTP 方法：GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
// Next.js 16 注意：动态路由参数 (params) 现在是异步的，需要 await
export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;

  // 3. 获取查询参数 (Query Params)
  // 比如 URL 是 /api/comments/123?format=full
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get('format');

  console.log(`查询 ID: ${id}, 格式: ${format}`);

  // 4. 模拟数据库查询
  if (id === '999') {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
  }

  // 5. 返回标准 JSON 响应
  return NextResponse.json({
    id,
    content: "这是一条通过 API 获取的评论",
    createdAt: new Date().toISOString(),
    extra: format === 'full' ? "详细信息..." : undefined
  });
}

// 6. 支持多个 HTTP 方法
// 在同一个 route.ts 中，你可以同时导出 GET, POST, DELETE 等多个函数
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  
  // 模拟删除操作
  console.log(`Deleting comment ${id}`);

  return NextResponse.json({ success: true, message: "删除成功" });
}

// 浏览器控制台测试代码
// 打开浏览器控制台 (F12 -> Console)，输入以下代码回车即可测试 DELETE 请求：
// fetch('/api/comments/123', { method: 'DELETE' }).then(res => res.json()).then(console.log)
// 返回 { success: true, message: "删除成功" }