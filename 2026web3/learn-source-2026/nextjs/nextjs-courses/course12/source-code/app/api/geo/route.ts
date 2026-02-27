import { NextRequest, NextResponse } from 'next/server';

// 👇 加上这一行，你的 API 就会部署到全球边缘节点
export const runtime = 'edge'; 

export async function GET(request: NextRequest) {
  // 在 Edge Runtime 中，我们可以轻松获取地理位置信息
  // 注意：这在本地开发环境可能只会显示 localhost，但在 Vercel 部署后会非常精准
  // const { geo, ip } = request; // ❌ Property 'geo'/'ip' does not exist on type 'NextRequest' in newer Next.js types

  // ✅ 使用 Headers 获取 (Vercel Edge / Next.js)
  const ip = request.headers.get('x-forwarded-for') || 'Unknown';
  const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
  const country = request.headers.get('x-vercel-ip-country') || 'Unknown';

  return NextResponse.json({
    city,
    country,
    ip,
    message: "Hello from the Edge! 🌍"
  });
}
