// middleware.ts
// ============================================================
// 📌 知识点：Edge Compiler（边缘编译器）
// ============================================================
// 此文件由 Edge Compiler 单独编译，运行在 Edge Runtime 中。
// Edge Runtime 是一个轻量级的 V8 隔离环境，具有以下特点：
//   ✅ 支持标准 Web API (Request, Response, fetch)
//   ✅ 冷启动极快（毫秒级）
//   ❌ 不支持 Node.js 原生模块 (fs, path, crypto 等)
//   ❌ 不支持大部分 npm 包（依赖 Node API 的）
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 运行在 Edge Runtime，可以使用标准 Web API
    const url = request.nextUrl.clone();

    // 示例 1：路由保护 —— 未登录用户访问 /admin 时重定向到 /login
    if (url.pathname === '/admin') {
        console.log('[Edge Middleware] 拦截到 /admin 请求，重定向至 /login');
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // 示例 2：添加自定义请求头（可以在 Server Component 中读取）
    const response = NextResponse.next();
    response.headers.set('x-middleware-timestamp', Date.now().toString());

    // ❌ 以下代码会导致构建失败！Edge 环境没有文件系统
    // import fs from 'fs';                // 构建报错
    // const data = fs.readFileSync('...');  // 构建报错

    return response;
}

// 配置 Middleware 生效的路由范围
export const config = {
    matcher: [
        // 匹配所有路径，排除静态资源和 API
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
