import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 演示场景: 
    // 如果访问 /dashboard 且 URL 参数带 ?error=true，则重写响应头
    // 真实场景通常是检查 Cookie

    const response = NextResponse.next();

    // 场景 3: A/B 测试（添加自定义 header）
    const variant = Math.random() > 0.5 ? 'A' : 'B';
    response.headers.set('x-variant', variant);

    // 简单的控制台日志，方便演示
    console.log(`[Middleware] Visiting: ${request.nextUrl.pathname}, assigned variant: ${variant}`);

    return response;
}

// 配置 Middleware 生效的路径
export const config = {
    matcher: [
        // 匹配所有路径，除了 api、_next/static、_next/image、favicon.ico
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
