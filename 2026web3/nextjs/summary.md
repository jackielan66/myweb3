# nextjs study summary

### 1. RSC 是什么意思

### 4. Next.js 三种主要渲染机制

- **SSR（Server-Side Rendering, 服务器端渲染）**，在每次请求页面的时候，在服务器端去生成 HTML，适合动态、个性化页面。
- **SSG（Static Site Generation, 静态站点生成）** 它在系统本地构建时生成静态 HTML，适合内容稳定、SEO 友好页面。
- **ISR（Incremental Static Regeneration, 增量静态再生成）**：在静态与动态之间做平衡，按失效策略后台再生成。

### 5. Next.js 的 Router 模式以及两种 Router 的差异

1. **App Router（应用路由）**是官方推荐的路由模式（Next.js 13 引入，13.4 稳定），其核心特点包括：

- 根目录位于 `app` 文件夹
- 默认采用 React Server Components（RSC, React 服务器组件），开箱即用
- 原生支持嵌套布局，可轻松实现共享 UI 与数据流
- 提供丰富的文件路由系统，支持动态路由、参数捕获、捕获所有路由等。

2. **Pages Router（页面路由）** 是Next.js 的经典方案（自 Next.js 1.0 起支持）

- 目录结构基于 `pages` 文件夹
- 默认采用 React 客户端组件（Client Components）
- 嵌套布局（layout）需要手动实现，不如 App Router 方便
- 功能虽丰富，但在灵活性与未来特性支持上已不及 App Router
- 新项目建议优先选用 App Router

### 目录结构

- `package.json`：项目配置文件，包含依赖项、脚本命令和项目元数据。其中 scripts 部分定义了常用命令：`dev、build、start、lint`。
    - `dev`：以开发模式启动 Next.js，支持热模块重载、错误报告等功能。
    - `build`：创建经过优化的生产构建，并且显示每个路由的信息。
    - `start`：在生产模式下启动 Next.js，注意我们的应用应该先使用 `next build` 进行编译。
    - `lint`：运行 `ESLint` 检查项目代码，确保符合 Next.js 的编码规范。


- `app` 目录：这是 Next.js 应用的核心目录，包含了所有的路由和页面组件。
    -  **`favicon.ico`**: 浏览器标签页的图标。
    -  **`global.css`**: 全局 CSS 样式文件，在本项目中结合 Tailwind CSS 使用，用于配置全局样式。
    -  **`layout.tsx`**: Next.js 应用的根布局组件。这是一个 React 组件，用于包裹所有页面，管理字体、元数据等。**需要注意的是，除了根布局外，Next.js 中的每个页面或路由段都可以定义自己的布局组件，实现更灵活的页面结构管理。**
    -  **`page.tsx`**: 应用的主页面，作为默认首页。它位于 `app` 目录下，并在 `layout.tsx` 组件中渲染。

- `public` 目录: 这个文件夹主要用于存放项目中的静态资源，比如我们常用的 SVG、PNG 等图片，或者一些字体文件，都可以放在 `public` 目录下。
- `.eslintrc.js`: 它是 ESLint 的配置文件。它是默认生成的，我们暂时无需修改，只需了解其用途即可。
- `next-env.d.ts`: 这是一个Next.js 项目类型声明文件，通常我们不需要去修改它。
- `next.config.ts`: 这是 Next.js 的全局配置文件。由于Next.js 提供了许多开箱即用的功能，已经内置了大量默认配置，所以我们暂时不需要修改。后续如果有更高阶的需求，可以参考官方文档去进行配置，比如自定义路由、环境变量、服务器端渲染等，这里就不展开介绍了。
- `postcss.config.js`: 这是 PostCSS 的全局配置文件。目前里面是一些默认配置，预留给我们进行自定义。
- `tsconfig.json`: 这是 TypeScript 的编译配置文件。后续我们会讲解其中一些核心的配置项以及它们的作用。


## App Router 基础与文件约定

### App Router核心理念：目录即路由

在 `app` 目录里，**目录结构决定 URL，特定文件名决定页面和布局**。

- `page.tsx`：这个文件所在的目录才是可直接访问的“页面”。
- `layout.tsx`：给该目录及其子目录提供共享的页面外壳（头/侧边栏等）。
- `loading.tsx`：配合 Suspense 的自动加载占位，异步页面加载时展示。
- `error.tsx`：错误边界 UI（必须是客户端组件）。
- `not-found.tsx`：404 页面。
- `template.tsx`：类似 `layout`，但每次导航都会重新创建实例（状态不保留）。

### 路由分组与私有目录

- **路由分组 `(group)`**：用括号包起来的目录仅用于整理文件，不影响 URL。例如 `app/(marketing)/about/page.tsx` 对应的地址还是 `/about`。
- **私有目录 `_folder`**：以下划线开头的目录不会参与路由解析，适合放组件、工具函数等。

### 目录结构示例：

```bash
app/
├── layout.tsx       // 根布局
├── page.tsx         // 首页
├── posts/
│   ├── page.tsx     // 文章列表
│   └── [slug]/
│       ├── page.tsx      // 文章详情
│       ├── layout.tsx    // 博客共享布局
│       └── error.tsx     // 文章详情错误边界
└── (admin)/         // 管理后台路由分组
    ├── layout.tsx       // 后台布局
    └── dashboard/
        ├── page.tsx     // 仪表盘
        └── settings/
            └── page.tsx // 设置页
```


## 第一部分：App Router 基础与文件约定

### App Router是什么

App Router 是 Next.js 中用于构建页面的现代化路由系统。它以 `app` 目录为核心，通过文件夹的层级结构来定义网站的 URL 路径，并使用特定的文件名（如 page.tsx、layout.tsx 等）来创建每个页面的用户界面（UI）

### App Router核心理念：目录即路由

在 `app` 目录里，**目录结构决定 URL，特定文件名决定页面和布局**。

- `page.tsx`：这个文件所在的目录才是可直接访问的“页面”。
- `layout.tsx`：给该目录及其子目录提供共享的页面外壳（头/侧边栏等）。
- `loading.tsx`：配合 Suspense 的自动加载占位，异步页面加载时展示。
- `error.tsx`：错误边界 UI（必须是客户端组件）。
- `not-found.tsx`：404 页面。
- `template.tsx`：类似 `layout`，但每次导航都会重新创建实例（状态不保留）。

### 路由分组与私有目录

- **路由分组 `(group)`**：用括号包起来的目录仅用于整理文件，不影响 URL。例如 `app/(marketing)/about/page.tsx` 对应的地址还是 `/about`。
- **私有目录 `_folder`**：以下划线开头的目录不会参与路由解析，适合放组件、工具函数等。

### 目录结构示例：

```bash
app/
├── layout.tsx       // 根布局
├── page.tsx         // 首页
├── posts/
│   ├── page.tsx     // 文章列表
│   └── [slug]/
│       ├── page.tsx      // 文章详情
│       ├── layout.tsx    // 博客共享布局
│       └── error.tsx     // 文章详情错误边界
└── (admin)/         // 管理后台路由分组
    ├── layout.tsx       // 后台布局
    └── dashboard/
        ├── page.tsx     // 仪表盘
        └── settings/
            └── page.tsx // 设置页
```

## 第二部分：动态路由与导航

### 1. 动态路由 `[slug]`

当路径由数据决定（比如文章 ID、商品 ID），我们就用“动态目录名”来实现：

```tsx
// app/posts/[slug]/page.tsx

// { params }: { params: { slug: string } } 是固定写法
// Next.js 会自动把 URL 中的动态部分作为 slug 传进来
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>正在查看文章：{params.slug}</h1>
      <p>这里是文章的具体内容...</p>
    </div>
  )
}
```


## 第三部分：布局Layout与特殊文件

### 1. 嵌套布局

布局是可以层层嵌套的：父级 `layout` 自动包裹子路由的 `layout` 和 `page`。比如我们要给管理后台页面做个共享布局：

```tsx
// app/(admin)/layout.tsx
import Link from 'next/link'

// layout 组件的参数是一个对象，包含了被包裹的页面内容 children
// 参照官方文档 https://nextjs.org/docs/app/api-reference/file-conventions/layout#layout-props-helper
export default function AdminLayout({
  children, // `children` 代表被这个布局包裹的页面内容
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-lg mb-4">管理后台</h2>
        <ul className="flex flex-col gap-2">
          <li><Link href="/dashboard" className="hover:underline">仪表盘</Link></li>
          <li><Link href="/dashboard/settings" className="hover:underline">设置</Link></li>
        </ul>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </section>
  )
}
```

访问 `/dashboard` 或 `/dashboard/settings`，你会看到侧边栏一直在，这就是嵌套布局的效果：`AdminLayout` 为 `(admin)` 分组下的页面统一“包一层”。

### 2. 加载 UI：`loading.tsx`

页面在等待数据时，`loading.tsx` 可以给用户一个友好的占位。
比如这里我们把文章详情改成异步，为简单说明问题我们使用两秒延迟来模拟数据获取过程

```tsx
// app/posts/[slug]/page.tsx

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 将组件改为 async 函数，以便使用 await
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 模拟 2 秒的数据获取延迟
  await sleep(2000);

  return (
    <div>
      <h1>正在查看文章：{params.slug}</h1>
      <p>这里是文章的具体内容...</p>
    </div>
  )
}
```

同目录下加一个加载组件：

```tsx
// app/posts/[slug]/loading.tsx
export default function Loading() {
  // 你可以创建任何自定义的加载 UI，比如一个骨架屏
  return <p>正在加载文章内容，请稍候...</p>;
}
```

现在刷 `/posts/hello-world`，先看到加载提示，2 秒后再显示正文，全自动、无痛提升体验。

### 3. 错误处理：`error.tsx`

当某个路由段或其子段抛错，`error.tsx` 会接管渲染。它是“错误边界”的专属 UI。

```tsx
'use client' // 错误组件必须是客户端组件

import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以将错误上报给日志服务
    console.error(error)
  }, [error])
 
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">加载文章失败了！</h2>
      <button
        onClick={() => reset()} // 尝试重新渲染该路由段
        className="bg-red-500 text-white p-2 rounded-md mt-4"
      >
        再试一次
      </button>
    </div>
  )
}
```

- **示例代码** (`app/posts/[slug]/page.tsx` 中抛出错误)：

```tsx
// app/posts/[slug]/page.tsx

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 将组件改为 async 函数，以便使用 await
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 模拟 2 秒的数据获取延迟
  await sleep(2000); 

  const {slug} = await params
  
  if(slug === 'error'){
    throw new Error('this is a error')
  }

  return (
    <div>
      <h1>正在查看文章：{slug}</h1>
      <p>这里是文章的具体内容...</p>
    </div>
  )
}
```

你可以在 `page.tsx` 里人为抛错来演示，比如：当 `slug === 'error'` 就 `throw new Error('这是一个模拟的错误！')`，然后访问 `/posts/error` 看效果。

## 总结

今天我们把 App Router 的核心能力过了一遍，核心内容包括：

- 目录即路由，`page.tsx` 决定可访问页面；`layout.tsx` 提供共享布局外壳。
- 路由分组`(group)` 和私有文件夹`_folder` 帮你组织项目结构而不影响 URL。
- 动态路由可以让一个模版渲染成千上万的详情页。
- 导航组件`<Link>` 与 hooks `useRouter` 负责页面导航切换；`useRouter` 要记得必须用在客户端组件里（`'use client'`）。
- 嵌套布局让 UI 结构可复用；同时加载UI`loading.tsx` 与  错误处理 UI`error.tsx` 提升加载与失败体验。