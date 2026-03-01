# Next.js 进阶指南：App Router 与 Pages Router 对比及迁移实战

> **👋 导读**：如果你是 Next.js 的新朋友，或者你是从老版本（Next.js 12 及以前）一路走来的老用户，你可能会对现在的 Next.js 感到困惑：为什么网上的教程有的写 `pages/`，有的写 `app/`？那些熟悉的 `getStaticProps` 去哪了？
>
> 这篇文章将带你彻底搞懂 **App Router** 和 **Pages Router** 的区别，并提供一份简单易懂的迁移手册，帮你轻松上手新版本。

---

## 1. 为什么会有两套路由？

简单来说，**Pages Router** 是 Next.js 的“过去”，而 **App Router** 是它的“现在”和“未来”。

*   **Pages Router (`pages/`)**: 经典的 Next.js 路由模式。它的优点是简单直观，文件即路由。但随着应用越来越复杂，想要实现复杂的嵌套布局和更快的页面加载速度，它就显得有点力不从心了。
*   **App Router (`app/`)**: 从 Next.js 13 开始引入的新模式。它基于 React 的最新特性（服务端组件），解决了 Pages Router 的痛点，性能更强，功能更灵活，写起来也更符合 Web 标准。

你可以把 Pages Router 想象成**传统的燃油车**（技术成熟、稳重），而 App Router 是**高性能电动车**（架构全新、速度快、但驾驶习惯需要适应一下）。

---

## 2. 核心差异对比：一眼看懂

让我们通过几个最常见的场景，看看两者的写法有什么不同。

### 2.1 目录结构与路由定义

这里有一张直观的对比图，展示了从 Pages 到 App 的结构变化：

```text
Pages Router (旧版)          App Router (新版)
└── pages                   └── app
    ├── index.tsx               ├── page.tsx           (首页)
    ├── about.tsx               ├── about
    │                           │   └── page.tsx       (关于页)
    ├── _app.tsx                ├── layout.tsx         (根布局)
    ├── api                     ├── api
    │   └── user.ts             │   └── user
    │                           │       └── route.ts   (API 接口)
    └── blog                    └── blog
        └── [id].tsx                └── [id]
                                        └── page.tsx   (动态路由)
```

| 特性 | Pages Router (`pages/`) | App Router (`app/`) |
| :--- | :--- | :--- |
| **路由文件** | `pages/about.tsx` | `app/about/page.tsx` |
| **动态路由** | `pages/blog/[id].tsx` | `app/blog/[id]/page.tsx` |
| **布局组件** | 需要使用 `_app.tsx` 进行特殊配置 | 内置 `layout.tsx`，支持多层嵌套布局 ✅ |
| **API 接口** | `pages/api/user.ts` | `app/api/user/route.ts` |

**💡 最大的变化**：
在 App Router 中，文件夹代表路径，只有名为 `page.tsx` 的文件才是用户能访问到的页面。你可以把组件、样式、工具函数等文件随便放在路由文件夹里，它们不会被当成页面访问。这让代码组织更加自由灵活。

**🗂️ 嵌套布局的威力**：

App Router 最强大的特性之一就是**嵌套布局**。每个文件夹都可以有自己的 `layout.tsx`，子页面会自动继承父布局。

```text
app/
├── layout.tsx          # 根布局（导航栏、页脚）
├── page.tsx            # 首页 /
└── dashboard/
    ├── layout.tsx      # Dashboard 专属布局（侧边栏）
    ├── page.tsx        # /dashboard
    ├── settings/
    │   └── page.tsx    # /dashboard/settings（继承两层布局）
    └── analytics/
        └── page.tsx    # /dashboard/analytics（继承两层布局）
```

```tsx
// app/dashboard/layout.tsx - Dashboard 专属布局
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      {/* 侧边栏 - 只在 /dashboard/* 页面显示 */}
      <aside style={{ width: '200px', background: '#f3f4f6' }}>
        <nav>
          <a href="/dashboard">概览</a>
          <a href="/dashboard/settings">设置</a>
          <a href="/dashboard/analytics">数据分析</a>
        </nav>
      </aside>
      {/* 主内容区 */}
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
```

> 💡 **Pages Router 做不到这一点**：在 Pages Router 中，你只能有一个全局布局（`_app.tsx`），想要不同页面使用不同布局需要手动处理，非常麻烦。

### 2.2 服务端组件 vs 客户端组件

这是 App Router 最重要的概念。

*   **Pages Router**: 所有的组件默认都是在浏览器端运行的（虽然支持服务端预渲染，但代码最终都会发送到浏览器）。
*   **App Router**: **所有组件默认都是服务端组件（Server Component）**。它们只在服务器运行，渲染好的 HTML 直接发给浏览器，代码不会发送到浏览器，网页加载更快。

**什么时候需要“变回”客户端组件？**
当且仅当你需要以下功能时，必须在文件顶部加上 `'use client'`：

| 场景 | 需要 'use client'? | 原因 |
| :--- | :--- | :--- |
| **获取数据** (fetch/数据库) | ❌ 不需要 | 服务端组件可以直接在服务器拿数据 |
| **使用 Hooks** (useState, useEffect) | ✅ 需要 | 状态管理和副作用是浏览器端的行为 |
| **交互事件** (onClick, onChange) | ✅ 需要 | 只有浏览器才能响应鼠标点击和键盘输入 |
| **浏览器 API** (window, localStorage) | ✅ 需要 | 服务器上没有 window 对象 |

> **🧠 记忆口诀**：有交互、有状态，就用 Client；只展示、读数据，就用 Server。

**🔀 混合使用：Server 组件嵌套 Client 组件**

实际开发中，一个页面往往需要同时使用两种组件。最佳实践是：**让 Server 组件作为父组件，Client 组件作为子组件**。

```tsx
// app/server-vs-client/page.tsx - Server Component（默认）
import ClientCounter from './ClientCounter';  // 导入 Client 组件

export default function ServerVsClientPage() {
  // ✅ 这行代码只在服务器执行，浏览器看不到
  const serverTime = new Date().toLocaleTimeString('zh-CN');
  console.log('🖥️ Server Component 渲染中...');  // 只在终端打印

  return (
    <div>
      <h1>⚡ Server vs Client Component</h1>
      
      {/* Server 部分：展示服务器时间 */}
      <div className="card">
        <p>服务器渲染时间：<code>{serverTime}</code></p>
        <p>⚠️ 刷新页面才会更新时间</p>
      </div>

      {/* Client 部分：需要交互的计数器 */}
      <ClientCounter />
    </div>
  );
}
```

```tsx
// app/server-vs-client/ClientCounter.tsx - Client Component
'use client'; // ⚠️ 必须在文件顶部声明！

import { useState } from 'react';

export default function ClientCounter() {
  const [count, setCount] = useState(0);
  console.log('💻 Client Component 渲染中...');  // 在浏览器控制台打印

  return (
    <div className="card">
      <p>计数器：<strong>{count}</strong></p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
}
```

> 📂 **演示代码**：`router-migration-demo/app/server-vs-client/` 目录

### 2.3 数据获取（怎么拿数据？）

这是初学者最容易晕的地方。那些熟悉的 `getStaticProps` 全都不见了！

**Pages Router (老写法):**
你需要记住 `getServerSideProps`、`getStaticProps` 等专用函数名。

```tsx
// pages/posts.tsx
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

export default function Posts({ posts }) {
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

**App Router (新写法):**
回归 JavaScript 本源。想要数据？直接在组件里 `await fetch()` 就行，不需要那些花哨的函数名。

```tsx
// app/posts/page.tsx
async function getPosts() {
  // 就像写普通 JS 一样请求数据
  const res = await fetch('https://api.example.com/posts', { 
    cache: 'no-store' // 👈 这一行就告诉 Next.js：不要缓存，每次都去拉新数据
  });
  return res.json();
}

// 组件本身就是 async 的
export default async function PostsPage() {
  const posts = await getPosts(); // 直接在组件里获取数据
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

**💡 核心逻辑**：
*   想要 `getServerSideProps` 的效果？ ➡️ `fetch(..., { cache: 'no-store' })`
*   想要 `getStaticProps` 的效果？ ➡️ `fetch(..., { cache: 'force-cache' })` (这是默认行为)
*   想要定时更新 (ISR)？ ➡️ `fetch(..., { next: { revalidate: 60 } })`

---

## 3. 迁移实战：关键点全覆盖

### 3.1 全局入口迁移：从 _app/_document 到 Root Layout

在 Pages Router 中，我们用 `_app.tsx` 处理全局样式，用 `_document.tsx` 处理 HTML 结构。
在 App Router 中，这两个文件合并成了 **Root Layout** (`app/layout.tsx`)。

**Pages Router (`_document.tsx`):**
写法比较繁琐，必须继承 Document 类。

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
// ...
```

**App Router (`app/layout.tsx`):**
写法更像普通的 React 组件，直观易懂。

```tsx
import './globals.css'; // ✅ 全局样式必须在这里引入

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

### 3.2 路由钩子迁移：useRouter 变了

这是迁移时最容易报错的地方。老版本的 `next/router` 在 App Router 中**不能用了**，功能被拆分成了三个主要的 Hooks（钩子函数）。

| 功能 | Pages Router (`next/router`) | App Router (`next/navigation`) |
| :--- | :--- | :--- |
| **跳转页面** | `const router = useRouter()`<br>`router.push('/home')` | `const router = useRouter()`<br>`router.push('/home')` |
| **获取当前路径** | `router.pathname` | `usePathname()` |
| **获取查询参数 (?id=1)** | `router.query.id` | `useSearchParams().get('id')` |
| **获取动态参数 ([id])** | `router.query.id` | `useParams().id` (注意区分！) |

**实战代码示例**：

```tsx
'use client'; // ⚠️ 使用 Hooks 必须是客户端组件

// ❌ 错误：import { useRouter } from 'next/router';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams(); // 获取动态路由参数，如 /blog/[id] 中的 id

  return (
    <div>
      <p>当前路径: {pathname}</p>
      <p>查询参数 type: {searchParams.get('type')}</p>
      <p>动态参数 id: {params.id}</p>
      
      <button onClick={() => router.push('/login')}>
        去登录
      </button>
    </div>
  );
}
```

### 3.3 SEO 迁移：告别 Head 组件

**Pages Router**: 使用 `<Head>` 组件手动插入 `<title>` 等标签。
**App Router**: 使用 `Metadata` API。你只需要导出名为 `metadata` 的对象或函数，Next.js 会自动帮你生成 SEO 标签。

**Pages Router (老写法):**

```tsx
// pages/posts/[id].tsx
import Head from 'next/head';

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article>{post.content}</article>
    </>
  );
}
```

**App Router (新写法):**

```tsx
// app/posts/[id]/page.tsx
import { Metadata } from 'next';

type Props = { params: { id: string } };

// 动态生成 Metadata（在组件渲染前执行）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  return {
    title: post.title,           // 自动生成 <title>
    description: post.excerpt,   // 自动生成 <meta name="description">
  };
}

// 页面组件（不需要再写 Head）
export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);
  return <article>{post.content}</article>;
}
```

### 3.4 错误处理与加载状态

这是 App Router 最省心的改进之一。在 Pages Router 中，你需要手动处理加载状态和错误；而在 App Router 中，**只需要创建特定名字的文件**，Next.js 就会自动处理。

| 功能 | Pages Router | App Router |
| :--- | :--- | :--- |
| **加载状态** | 手动写 `if (loading) return ...` | 创建 `loading.tsx`，自动显示 |
| **错误处理** | 手动包裹错误边界组件 | 创建 `error.tsx`，自动捕获错误 |
| **404 页面** | `pages/404.tsx` (全局) | `not-found.tsx` (可按文件夹定制) |

**App Router 示例：**

只需要在文件夹里放上这些文件：

```text
app/
├── dashboard/
│   ├── page.tsx        # 页面组件
│   ├── loading.tsx     # 👈 加载页面时自动显示这个组件
│   ├── error.tsx       # 👈 页面出错时自动显示这个组件
│   └── not-found.tsx   # 👈 找不到内容时显示
```

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div className="animate-pulse">正在加载中...</div>;
}

```

```tsx
// app/dashboard/error.tsx
'use client'; // ⚠️ 错误边界必须是客户端组件

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>出错了：{error.message}</h2>
      <button onClick={reset}>重试</button>
    </div>
  );
}
```

### 3.5 定时更新 (ISR) 的迁移

在 Pages Router 中，我们在 `getStaticProps` 里写 `revalidate: 60` 来实现每 60 秒更新一次页面。
在 App Router 中，写法更简单：

**写法 1：请求级别（推荐）**
```tsx
fetch('https://...', { next: { revalidate: 60 } })
```

**写法 2：页面级别**
如果你的数据不是通过 fetch 获取的（比如直接查数据库），可以导出配置：
```tsx
// app/blog/page.tsx
export const revalidate = 60; // 每 60 秒更新一次
export default async function Page() { ... }
```

### 3.6 Link 组件：页面导航

页面之间的跳转使用 `<Link>` 组件。好消息是，两种路由模式下用法几乎一样：

```tsx
// 两种路由模式都一样
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/about">关于</Link>
      <Link href="/posts/123">文章详情</Link>
      
      {/* 带查询参数 */}
      <Link href="/search?q=nextjs">搜索</Link>
      
      {/* 替换历史记录（不能后退） */}
      <Link href="/login" replace>登录</Link>
      
      {/* 禁用预加载（节省带宽） */}
      <Link href="/heavy-page" prefetch={false}>大页面</Link>
    </nav>
  );
}
```

**💡 小区别**：
| 特性 | Pages Router | App Router |
| :--- | :--- | :--- |
| **预加载** | 视口内链接自动预加载 | 同左，但更智能 |
| **滚动行为** | `scroll={false}` 禁用滚动到顶部 | 同左 |
| **路由事件** | `router.events.on('routeChangeStart')` | 使用 `usePathname()` + `useEffect` 监听 |

> 📂 **演示代码**：查看 `router-migration-demo/app/layout.tsx` 中的导航栏实现

### 3.7 API Routes：接口写法对比

API 路由的写法变化比较大，从导出函数变成了导出 HTTP 方法。

> 📍 **路由地址**：以下示例对应的 API 路由地址均为 `/api/user`

**Pages Router (`pages/api/user.ts`):**

```tsx
// pages/api/user.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ name: '张三', age: 25 });
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(201).json({ message: `创建用户 ${name} 成功` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

**App Router (`app/api/user/route.ts`):**

```tsx
// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/user
export async function GET() {
  return NextResponse.json({ name: '张三', age: 25 });
}

// POST /api/user
export async function POST(request: NextRequest) {
  const { name } = await request.json();
  return NextResponse.json(
    { message: `创建用户 ${name} 成功` },
    { status: 201 }
  );
}

// 还可以导出 PUT, DELETE, PATCH 等
```

**💡 主要变化**：
| 对比项 | Pages Router | App Router |
| :--- | :--- | :--- |
| **文件位置** | `pages/api/user.ts` | `app/api/user/route.ts` |
| **导出方式** | `export default handler` | `export async function GET/POST/...` |
| **请求对象** | `NextApiRequest` | `NextRequest`（标准 Web API） |
| **响应方式** | `res.json()` | `NextResponse.json()` |
| **获取请求体** | `req.body` | `await request.json()` |

> 📂 **演示代码**：
> - Pages Router 示例：`router-migration-demo/pages/api/user.ts`
> - App Router 示例：`router-migration-demo/app/api/user/route.ts`

### 3.8 样式与字体的迁移

1.  **全局 CSS**: 以前只能在 `_app.tsx` 引入。现在只能在 **Root Layout** (`app/layout.tsx`) 中引入。
2.  **Tailwind CSS**: 配置基本不变，但记得在 `tailwind.config.js` 的 `content` 数组中把 `app/**/*.{js,ts,jsx,tsx}` 加进去，否则样式不生效。
3.  **Google Fonts**: 用法一致，建议在 layout 中配置并注入到 `<body>` 标签中。

---

## 4. 常见报错速查表（初学者必看）

迁移过程中，你很可能会遇到以下报错。别慌，这里有解决方案：

| 报错信息 | 原因 | 解决方案 |
| :--- | :--- | :--- |
| `You're importing a component that needs useState...` | 在服务端组件中使用了 Hooks | 在文件顶部添加 `'use client'` |
| `useRouter only works in Client Components` | `next/navigation` 的 Hooks 需要客户端环境 | 在文件顶部添加 `'use client'` |
| `Cannot find module 'next/router'` | App Router 不支持 `next/router` | 改用 `import { useRouter } from 'next/navigation'` |
| `Error: Event handlers cannot be passed to Client Component props...` | 把 `onClick` 等事件传给了服务端组件 | 将该组件改为客户端组件（加 `'use client'`） |
| `Hydration failed...` | 服务端和客户端渲染的内容不一致 | 检查是否使用了 `Date.now()` 或随机数，确保首屏内容一致 |
| `"metadata" is not a valid export` | 在客户端组件中导出了 metadata | Metadata 只能在服务端组件中导出 |

> **💡 调试技巧**：遇到报错时，先看文件顶部有没有 `'use client'`。很多问题都是因为在错误的组件类型中使用了不兼容的功能。

---

## 5. 迁移策略：如何平滑过渡？

不要试图一次性重写整个项目！Next.js 支持 **增量迁移**。

1.  **保留 `pages/` 目录**：确保现有路由正常工作。
2.  **新建 `app/` 目录**：
    *   先创建一个简单的 `app/layout.tsx`。
    *   将新开发的页面直接放在 `app/` 下。
    *   逐步挑选简单的页面（如“关于我们”），从 `pages/` 移动到 `app/`。
3.  **解决冲突**：如果 `pages/about.tsx` 和 `app/about/page.tsx` 同时存在，**Next.js 会优先使用 app 目录下的页面**（但在构建时会报警告，建议迁移完一个就删掉旧的）。

---

## 6. 迁移检查清单 ✅

在迁移每个页面时，对照这份清单确保不遗漏：

```text
□ 创建了 app/layout.tsx（根布局）
□ 全局 CSS 已移动到 app/layout.tsx 中引入
□ 将 next/router 替换为 next/navigation
   □ useRouter → useRouter (来自 next/navigation)
   □ router.pathname → usePathname()
   □ router.query → useSearchParams() + useParams()
□ 将 <Head> 组件替换为 Metadata API
□ 将 getServerSideProps/getStaticProps 替换为 async 组件 + fetch
□ 需要交互/状态的组件添加了 'use client'
□ 创建了必要的 loading.tsx / error.tsx
□ 定时更新 (ISR) 的配置已迁移
□ 删除已迁移的 pages/ 下的旧文件（避免冲突警告）
```

---

## 7. 新项目该选哪个？

如果你正在开始一个新项目，这里有一份简单的决策指南：

### ✅ 推荐使用 App Router（大多数情况）

*   **新项目**：Next.js 官方推荐，是未来的发展方向
*   **需要复杂布局**：多层嵌套布局、并行路由等高级功能
*   **追求性能**：Server Components 带来更小的 JS 包体积
*   **团队愿意学习**：接受新的心智模型

### ⚠️ 可以继续使用 Pages Router

*   **维护老项目**：迁移成本高，暂时不迁移也没问题
*   **团队不熟悉**：团队对 App Router 不熟悉，项目时间紧
*   **依赖不兼容**：某些第三方库尚未支持 App Router

### 🔄 两者可以共存

Next.js 支持 `app/` 和 `pages/` 目录同时存在，你可以：

1.  新功能用 App Router 开发
2.  老页面保持在 Pages Router
3.  逐步迁移，无需一步到位

```text
my-project/
├── app/                 # 新功能
│   ├── layout.tsx
│   └── new-feature/
│       └── page.tsx
└── pages/               # 老页面（继续工作）
    ├── _app.tsx
    └── old-page.tsx
```

> 📂 **演示代码**：`router-migration-demo` 项目就是一个两者共存的示例

---

## 8. 总结

从 Pages Router 迁移到 App Router，本质上是一次**思维的转变**：

```text
┌─────────────────────────────────────────────────────────────────┐
│                     思维转变                                     │
├─────────────────────────────────────────────────────────────────┤
│  📄 页面思维    ──────────────────────▶    📐 布局思维           │
│     (每个文件是独立页面)                    (嵌套 Layouts 复用 UI) │
│                                                                 │
│  💻 客户端优先  ──────────────────────▶    🖥️ 服务端优先          │
│     (代码发送到浏览器执行)                  (默认 Server Component)│
│                                                                 │
│  🔧 特定 API    ──────────────────────▶    🌐 标准 Web API       │
│     (getServerSideProps...)                (fetch, Request...)  │
└─────────────────────────────────────────────────────────────────┘
```

刚开始可能会有点不习惯，但当你习惯了 App Router 的模式后，你会发现开发效率更高，用户体验也更好。

---

## 9. 动手实践：演示项目

配套演示项目 `router-migration-demo` 包含了本文所有知识点的可运行代码：

### 快速开始

```bash
cd router-migration-demo
npm install
npm run dev
# 打开 http://localhost:3000
```

### 演示内容一览

| 访问路径 | 知识点 | 对应文件 |
| :--- | :--- | :--- |
| `/` | Server Component 基础 | `app/page.tsx` |
| `/server-vs-client` | Server vs Client 组件混合使用 | `app/server-vs-client/` |
| `/data-fetching` | async 组件 + 数据获取 | `app/data-fetching/page.tsx` |
| `/posts/1` | 动态路由 + Metadata API | `app/posts/[id]/page.tsx` |
| `/posts/999` | 404 页面 (not-found.tsx) | `app/posts/[id]/not-found.tsx` |
| `/dashboard` | Loading UI + Error 处理 | `app/dashboard/` |
| `/navigation-demo` | 路由钩子迁移 | `app/navigation-demo/` |

### Pages Router 对比页面

| 访问路径 | 对比的 App Router 页面 | 说明 |
| :--- | :--- | :--- |
| `/old-home` | `/` | 传统首页 + `<Head>` |
| `/old-data-fetching` | `/data-fetching` | `getServerSideProps` 写法 |
| `/old-posts/1` | `/posts/1` | `router.query` 获取参数 |
| `/old-about` | - | 全局布局演示 (`_app.tsx`) |

> 💡 **学习建议**：先访问 Pages Router 页面了解"旧写法"，再访问对应的 App Router 页面对比"新写法"，体会两者的差异。

---

> **🎉 恭喜你完成学习！** 现在你已经掌握了 Next.js 路由迁移的核心技能。打开演示项目，动手实践是最好的学习方式！
