# Course 19 示例代码：Next.js 构建体系与分层逻辑

此文件夹包含一个完整示例，覆盖了课件中所有核心知识点。

## 📁 文件结构与知识点对应

```
source-code/
├── middleware.ts                      # 📌 Edge Compiler + Edge Runtime
├── app/
│   ├── page.tsx                       # 📌 Server Component (入口)
│   └── components/
│       ├── EnvironmentCheck.tsx        # 📌 Client Component + 'use client' 边界 + 双重渲染
│       └── HydrationDemo.tsx          # 📌 Hydration Mismatch 演示与修复
└── lib/
    ├── db.ts                          # 📌 server-only 防泄漏保护
    └── analytics.ts                   # 📌 client-only 对称保护
```

## 📝 知识点覆盖清单

| 文件 | 对应课件章节 | 核心概念 |
|------|------------|---------|
| `page.tsx` | §1 核心架构, §2 边界处理 | Server Component、数据获取、边界跨越 |
| `EnvironmentCheck.tsx` | §3.2 双重渲染 | `'use client'`、双重渲染验证、Browser API 访问 |
| `HydrationDemo.tsx` | §3.2.3 水合不匹配 | Hydration Mismatch 错误演示与两种修复方案 |
| `middleware.ts` | §1.2 Edge Compiler | Edge Runtime 限制、路由保护 |
| `lib/db.ts` | §3.1 环境隔离 | `server-only` 包防止代码泄露 |
| `lib/analytics.ts` | §1.2 客户端编译器 | `client-only` 包对称保护 |

## 如何运行此代码

1.  **创建一个新的 Next.js 应用**：
    ```bash
    npx create-next-app@latest nextjs-course-demo --typescript --tailwind --eslint
    cd nextjs-course-demo
    ```

2.  **安装防护包**：
    ```bash
    npm install server-only client-only
    ```

3.  **复制文件**：
    - 复制 `middleware.ts` → 项目根目录 `middleware.ts`
    - 复制 `app/page.tsx` → `app/page.tsx`（覆盖现有文件）
    - 复制 `app/components/` → `app/components/`
    - 复制 `lib/` → `lib/`

4.  **运行开发服务器**：
    ```bash
    npm run dev
    ```

5.  **观察结果**：
    - 🔵 **终端**：查看 `[Server] 正在获取数据...` 日志（Server Component）
    - 🟢 **浏览器控制台**：查看 `[Client] ✅ Hydrated!` 和 `[Analytics]` 日志
    - 🟢 **终端 + 浏览器**：都会看到 `[EnvironmentCheck] Rendering...`（双重渲染验证）
    - ⚠️ **浏览器控制台**：观察 Hydration Mismatch 警告（HydrationDemo 组件）
    - 🟣 **Middleware**：尝试访问 `/admin`，会被重定向到 `/login`
    - 🟠 **client-only**：尝试在 `page.tsx` 中导入 `lib/analytics.ts`，构建会报错
