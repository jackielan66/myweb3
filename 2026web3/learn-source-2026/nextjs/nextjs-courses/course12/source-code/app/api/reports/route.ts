// 📄 文件路径：app/api/reports/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 1. 模拟从数据库获取数据
  const data = [
    { id: 1, content: "Next.js 16 is awesome!", author: "Alice" },
    { id: 2, content: "Server Actions saved my life.", author: "Bob" },
  ];

  // 2. 生成 CSV 字符串
  const csvHeader = "ID,Content,Author\n";
  const csvRows = data.map(row => `${row.id},"${row.content}",${row.author}`).join('\n');
  const csvContent = csvHeader + csvRows;

  // 3. 返回响应，设置 Headers 触发下载
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="comments-report.csv"',
    },
  });
}