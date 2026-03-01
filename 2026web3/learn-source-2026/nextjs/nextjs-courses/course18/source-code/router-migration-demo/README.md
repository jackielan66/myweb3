# 🚀 App Router 迁移演示项目

这是一个面向 **Next.js 初学者** 的演示项目，用于配合课件《App Router vs Pages Router 对比与迁移实战》学习。

## 📦 快速开始

### 系统要求

- **Node.js**: 18.17 或更高版本（推荐使用 LTS 版本）
- **包管理工具**: npm 9+、pnpm 8+ 或 yarn 4+

查看你的 Node.js 版本：

```bash
node --version
npm --version
```

### 安装和运行

```bash
# 1. 进入项目目录
cd router-migration-demo

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# 自动打开: http://localhost:3000
# 或手动访问浏览器地址栏输入: http://localhost:3000
```

完成！你将看到一个包含左侧导航菜单的首页，点击菜单项可切换不同的演示页面。

## 📚 演示内容

### App Router (新写法) - `app/` 目录

| 页面路径 | 知识点 | 说明 |
|:---|:---|:---|
| `/` | 首页 | Server Component 基础演示 |
| `/server-vs-client` | Server vs Client | 理解两种组件的区别 |
| `/data-fetching` | 数据获取 | 告别 getServerSideProps |
| `/posts/1` | 动态路由 + Metadata | [id] 参数获取、generateMetadata |
| `/posts/999` | 404 页面 | not-found.tsx 演示 |
| `/dashboard` | Loading UI + 嵌套布局 | loading.tsx + dashboard/layout.tsx |
| `/dashboard/settings` | 嵌套布局 | 侧边栏保持不变 |
| `/dashboard/analytics` | 嵌套布局 | 侧边栏保持不变 |
| `/navigation-demo` | 路由钩子 | usePathname, useSearchParams 等 |
| `/api/user` | API Routes | Route Handlers (GET/POST/PUT/DELETE) |

### Pages Router (旧写法) - `pages/` 目录

| 页面路径 | 对比的 App Router 路径 | 说明 |
|:---|:---|:---|
| `/old-home` | `/` | 传统首页 + `<Head>` 组件 |
| `/old-data-fetching` | `/data-fetching` | getServerSideProps 写法 |
| `/old-posts/1` | `/posts/1` | router.query 获取参数 |
| `/old-about` | - | 全局布局演示（`_app.tsx`） |
| `/api/user` | `/api/user` | API 路由（handler 函数） |

### Pages Router 全局布局示例

| 文件 | 对比的 App Router 文件 | 说明 |
|:---|:---|:---|
| `pages/_app.tsx` | `app/layout.tsx` | 全局布局（导航栏、页脚、全局状态） |
| `pages/_document.tsx` | `app/layout.tsx` | 自定义 HTML 结构（`<html>`、`<body>`） |

> 💡 **学习建议**：先访问 Pages Router 页面了解"旧写法"，再访问对应的 App Router 页面对比"新写法"

## 🗂️ 项目结构

```
router-migration-demo/
├── app/                         # 🆕 App Router (新写法)
│   ├── layout.tsx               # Root Layout（替代 _app + _document）
│   ├── globals.css              # 全局样式
│   ├── page.tsx                 # 首页
│   ├── server-vs-client/        # Server vs Client 对比
│   │   ├── page.tsx
│   │   └── ClientCounter.tsx
│   ├── data-fetching/           # async 组件 + 数据获取
│   │   └── page.tsx
│   ├── posts/[id]/              # 动态路由 + Metadata
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── dashboard/               # Loading UI + 嵌套布局
│   │   ├── layout.tsx           # Dashboard 专属布局（侧边栏）
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── settings/
│   │   │   └── page.tsx         # 嵌套布局演示
│   │   └── analytics/
│   │       └── page.tsx         # 嵌套布局演示
│   ├── navigation-demo/         # 路由钩子
│   │   ├── page.tsx
│   │   └── NavigationClient.tsx
│   └── api/                     # 🆕 Route Handlers（API 路由）
│       └── user/
│           └── route.ts         # GET/POST/PUT/DELETE 方法
│
└── pages/                       # 🕰️ Pages Router (旧写法，用于对比)
    ├── _app.tsx                 # 全局布局（对比 app/layout.tsx）
    ├── _document.tsx            # 自定义 HTML 结构
    ├── old-home.tsx             # 对比 app/page.tsx
    ├── old-about.tsx            # 全局布局效果演示
    ├── old-data-fetching.tsx    # 对比 app/data-fetching/page.tsx
    ├── old-posts/
    │   └── [id].tsx             # 对比 app/posts/[id]/page.tsx
    └── api/                     # 🕰️ API Routes（旧写法）
        └── user.ts              # 对比 app/api/user/route.ts
```

> ⚠️ **注意**：Next.js 支持 `app/` 和 `pages/` 目录共存，这是增量迁移的基础！

## 🛠️ 开发指南

### 在开发服务器启动后

1. **浏览器会自动打开** <http://localhost:3000>（或手动打开）
2. **看到首页导航菜单** - 左侧显示所有演示页面
3. **点击菜单项切换页面** - 每个页面展示不同的 Next.js 特性
4. **打开开发者工具** - 按 `F12` 或右键选择"检查"，查看控制台日志和网络请求

### 修改代码和热更新

- **自动刷新**：修改任何 `.tsx` 或 `.css` 文件后，浏览器会自动刷新页面
- **保留状态**：大多数情况下能保留组件状态（Fast Refresh）
- **查看变化**：修改 `app/page.tsx` 中的文本，保存文件立即看到更新

### 常见的开发命令

```bash
# 启动开发服务器（默认 http://localhost:3000）
npm run dev

# 指定不同的端口
npm run dev -- -p 3001

# 构建生产版本（检查类型错误和优化）
npm run build

# 在生产模式下本地运行（需先 npm run build）
npm start

# 打开 TypeScript 严格检查
npm run typecheck  # 如果 package.json 中配置了此脚本
```

### npm 安装慢或失败？

如果在国内使用 npm 安装很慢，可以配置国内镜像源：

```bash
# 临时使用淘宝源（仅当前命令）
npm install --registry https://registry.npmmirror.com

# 永久配置淘宝源
npm config set registry https://registry.npmmirror.com

# 或者使用 pnpm（更快的包管理器）
npm install -g pnpm
pnpm install
pnpm dev
```

## ❓ 常见问题排查

| 问题 | 原因 | 解决方案 |
|:---|:---|:---|
| `Cannot find module 'next'` | 依赖未安装或安装不完整 | 删除 `node_modules` 和 `package-lock.json`，重新运行 `npm install` |
| `Port 3000 already in use` | 端口被其他程序占用 | 运行 `npm run dev -- -p 3001` 使用其他端口，或关闭占用 3000 的程序 |
| `TypeError: Cannot read property of undefined` | 组件中使用了浏览器 API（如 `localStorage`）在服务器端 | 添加 `'use client'` 声明，将其改为客户端组件 |
| TypeScript 类型错误 | 类型定义版本不匹配 | 运行 `npm install` 重新安装依赖 |
| 页面显示空白 | 组件抛出未捕获的错误 | 打开浏览器 DevTools（F12）查看 Console 标签的错误信息 |
| 修改代码后页面不刷新 | 开发服务器崩溃 | 查看终端输出，停止服务器（Ctrl+C）后重新运行 `npm run dev` |

## 🔍 调试技巧

### 在浏览器中调试

1. **打开开发者工具**：`F12` 或右键 → "检查"
2. **查看 Console 标签**：看代码输出的日志和错误信息
3. **使用 Network 标签**：观察网络请求和响应数据
4. **在代码中打印日志**：

   ```tsx
   console.log('调试信息:', data);  // 在浏览器 Console 中看到
   ```

### 在服务器端调试

```tsx
// 在 Server Component 中直接使用 console.log
export default async function Page() {
  console.log('服务器端日志');  // 在终端输出中看到
  const data = await fetch(...);
  return <div>{data}</div>;
}
```

### VS Code 调试配置

在项目根目录创建 `.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

然后在 VS Code 中按 `F5` 启动调试模式。

## 🔑 核心知识点速查

### 1. Server vs Client Component

```tsx
// Server Component（默认）- 可以直接 await
export default async function Page() {
  const data = await fetch(...);
  return <div>{data}</div>;
}

// Client Component - 需要声明 'use client'
'use client';
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 2. 数据获取迁移

```tsx
// ❌ Pages Router (旧)
export async function getServerSideProps() {
  return { props: { data } };
}

// ✅ App Router (新)
export default async function Page() {
  const data = await fetch(..., { cache: 'no-store' });
  return <div>{data}</div>;
}
```

### 3. 路由钩子迁移

```tsx
// ❌ Pages Router (旧)
import { useRouter } from 'next/router';
const { pathname, query } = useRouter();

// ✅ App Router (新)
import { usePathname, useSearchParams, useParams } from 'next/navigation';
const pathname = usePathname();
const searchParams = useSearchParams();
const params = useParams();
```

### 4. API Routes 迁移

```tsx
// ❌ Pages Router (旧) - pages/api/user.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ name: '张三' });
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(201).json({ message: `创建 ${name}` });
  }
}

// ✅ App Router (新) - app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ name: '张三' });
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  return NextResponse.json({ message: `创建 ${name}` }, { status: 201 });
}
```

## 📝 License

MIT - 仅供学习使用
