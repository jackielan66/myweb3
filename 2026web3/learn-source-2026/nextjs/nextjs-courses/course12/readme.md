# Next.js 全栈数据交互实战：Server Actions 与 Route Handlers

本文档深入解析 Next.js App Router 的全栈数据交互能力，从革新性的 Server Actions 到传统的 Route Handlers，帮助开发者构建类型安全、高性能的全栈应用。

**核心理念**：

1.  **Less API, More Actions**：能用 Server Actions 解决的内部交互，尽量不用 Route Handlers。
2.  **Type Safety**：利用 Zod 实现端到端的类型安全。
3.  **Progressive Enhancement**：基于 Web 标准的表单处理。

---

## 一、Server Actions：让前后端零距离

在传统的 React 开发中，我们需要定义 API、编写 fetch 请求、处理 loading 和 error 状态。Next.js Server Actions 彻底改变了这一流程，允许前端像调用本地函数一样直接调用后端逻辑。

### 1.1 定义 Server Action

Server Action 本质上是运行在服务器端的异步函数。你可以把它想象成一个自动生成的 API 接口，但你不需要关心 URL、HTTP 方法或序列化，Next.js 会在幕后自动处理这一切。

**核心要素：**

*   **`'use server'` 指令**：这是开启 Server Action 魔法的钥匙。它可以放在文件顶部（标记整个文件的导出函数均为 Server Action），也可以放在函数内部（标记该特定函数）。
*   **异步函数**：Server Action 必须是 `async` 的。
*   **序列化**：参数和返回值必须是 React Server Components 协议支持的可序列化数据（Serializable）。

**代码示例：**

我们来定义一个处理评论提交的 Server Action。为了保证健壮性，我们结合 `zod` 进行数据验证。

```ts
// 📄 文件路径：app/actions.ts
'use server'; // 👈 标记文件内所有函数在服务端运行

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// 1. Zod Schema 定义 (前后端复用)
// 这是一个良好的实践：同一套 Schema 既可以用于前端表单校验，也可以用于后端接口校验，实现 DRY (Don't Repeat Yourself)。
const CommentSchema = z.object({
  content: z.string().min(5, { message: "评论太短了，多写点吧" }),
});

// 定义 State 类型
// 显式定义返回类型有助于在组件中获得完整的 TypeScript 智能提示
export type State = {
  success: boolean;
  message: string;
  errors?: {
    content?: string[];
  };
};

// 2. 定义操作函数
// 这是一个标准的 Server Action，它接收上一次的状态 (prevState) 和表单数据 (FormData)
export async function submitComment(prevState: State, formData: FormData): Promise<State> {
  // 模拟网络延迟 (1秒)，方便观察 Pending 状态
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 从 FormData 提取数据
  const rawData = {
    content: formData.get('content'),
  };

  // 3. 服务端校验
  // 使用 safeParse 可以在校验失败时优雅地获取错误信息，而不是抛出异常
  const validated = CommentSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "校验失败",
      errors: validated.error.flatten().fieldErrors
    };
  }

  // 4. 模拟数据库操作
  // 在真实场景中，这里会调用 Prisma 或其他 ORM 写入数据库
  console.log('Saving to DB:', validated.data);

  // 5. 刷新缓存 (可选)
  // 如果评论列表显示在同一页面，这行代码会让 Next.js 重新获取数据，用户能立即看到新评论
  // revalidatePath('/comments');

  return {
    success: true,
    message: "评论发布成功！",
    errors: undefined
  };
}
```

### 1.2 实战：构建原生评论表单 (Native Form)

在 Next.js 16 中，我们不再强制依赖 `react-hook-form` 等第三方库来处理简单的表单。结合 React 19 的 `useActionState` 钩子，我们可以构建出既具备渐进增强特性，又拥有良好交互体验的原生表单。

**关键技术点：**

*   **`useActionState`**：自动管理异步操作的生命周期（Pending、Error、Success）。
*   **Client Component**：由于使用了 Hook，表单组件必须标记为 `'use client'`。
*   **分离关注点**：将交互逻辑封装在独立组件中，保持页面组件 (`page.tsx`) 纯净且作为 Server Component 运行。

**组件实现：**

```tsx
// 📄 文件路径：components/CommentForm.tsx
'use client';

import { useActionState } from 'react';
import { submitComment, State } from '@/app/actions';

const initialState: State = {
  success: false,
  message: '',
  errors: undefined
};

export function CommentForm() {
  // useActionState 自动管理生命周期
  // state: 最新状态, action: 提交动作, isPending: 加载状态
  const [state, action, isPending] = useActionState(submitComment, initialState);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">你的观点</label>
        <textarea 
          id="content" 
          name="content" 
          placeholder="写下你的想法..." 
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
            state?.errors?.content ? "border-red-500" : "border-gray-300"
          }`}
          rows={4}
          disabled={isPending}
        />
        {state?.errors?.content && (
          <p className="text-sm text-red-500">{state.errors.content[0]}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button 
          type="submit" 
          disabled={isPending}
          className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? '发布中...' : '提交评论'}
        </button>
        
        {state?.message && (
          <p className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
```

---

## 二、Route Handlers：何时还需要 API？

虽然 Server Actions 处理 UI 交互非常高效，但在以下场景我们依然需要 Route Handlers (API Routes)：

1.  **Webhook 回调** (如支付通知)
2.  **对外提供 API** (供移动端或第三方调用)
3.  **非 JSON 响应** (文件下载、流式输出)

### 2.1 标准 REST API 与动态路由

Route Handlers 定义在 `app/api/.../route.ts` 中，支持标准的 HTTP 方法（GET, POST, PUT, DELETE 等）。这让习惯了 Express 或 Spring Boot 的开发者感到非常亲切。

**代码示例：**

我们来创建一个通用的评论 API，演示如何处理动态参数 (Dynamic Segments) 和查询参数 (Query Parameters)。

```ts
// 📄 文件路径：app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 定义动态参数类型
type Params = Promise<{ id: string }>;

// GET 请求处理：获取单条评论
export async function GET(request: NextRequest, { params }: { params: Params }) {
  // 1. 获取动态路由参数 (如 /api/comments/123 中的 123)
  // 注意：在 Next.js 15+ 中，params 是异步的，必须 await
  const { id } = await params;

  // 2. 获取查询参数 (如 ?format=full)
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get('format');

  // 3. 模拟业务逻辑
  if (id === '999') {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
  }

  // 4. 返回标准 JSON 响应
  return NextResponse.json({
    id,
    content: "这是一条通过 API 获取的评论",
    createdAt: new Date().toISOString(),
    extra: format === 'full' ? "详细信息..." : undefined
  });
}

// DELETE 请求处理：删除单条评论
// 同一个文件可以导出多个 HTTP 方法的处理函数
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  console.log(`Deleting comment ${id}`);
  return NextResponse.json({ success: true, message: "删除成功" });
}
```

### 2.2 缓存控制 (Caching)

在 Next.js 16 中，Route Handlers 的缓存行为默认偏向于**动态 (Dynamic)**，特别是当你使用了 `Request` 对象或动态函数（如 `cookies()`）时。但在某些高频访问的场景下（如热门榜单），我们希望缓存 API 响应以减轻服务器压力。

我们可以通过 **Route Segment Config** 来精确控制缓存策略。

**示例 1：ISR (增量静态再生)**

适用于数据更新频率不高，且允许短时间内数据不一致的场景。

```ts
// 📄 文件路径：app/api/cached-data/route.ts
import { NextResponse } from 'next/server';

// 🟢 ISR 模式：每 60 秒更新一次缓存
// 在这 60 秒内，无论有多少请求，服务器都只返回同一个缓存结果。
export const revalidate = 60;

export async function GET() {
  const data = {
    timestamp: new Date().toISOString(),
    message: "这条数据被缓存了！刷新浏览器，时间戳在 60 秒内不会变。"
  };
  return NextResponse.json(data);
}
```

**示例 2：强制静态缓存 (Static)**

适用于数据基本不变的场景，如省市区列表、配置字典等。

```ts
// 📄 文件路径：app/api/static-data/route.ts
import { NextResponse } from 'next/server';

// 🔵 Static 模式：构建时生成，永久缓存
// 这个 API 只会在 npm run build 时执行一次，之后永远返回相同结果。
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    content: "这是一条静态数据，构建后永远不会变",
    builtAt: new Date().toISOString(),
  });
}
```

### 2.3 特殊路由处理程序 (Special Route Handlers)

Next.js 贴心地内置了一些特殊的 Route Handlers，专门用于生成 SEO 和社交分享所需的元数据文件。这些文件默认采用**静态缓存**策略，除非你显式使用了动态数据。

**场景 A：动态 Sitemap (sitemap.ts)**

当你的网站有大量动态生成的页面（如博客文章详情页）时，你需要一个动态 Sitemap 来告诉搜索引擎这些页面的存在。

```ts
// 📄 文件路径：app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 静态路由部分
  const routes = ['', '/comments'].map((route) => ({
    url: `https://example.com${route}`,
    lastModified: new Date(),
  }))
  
  // 2. 动态获取文章列表 (模拟)
  // const posts = await db.post.findMany();
  // const postRoutes = posts.map(...)

  return routes;
}
```

**场景 B：动态 Open Graph Image (opengraph-image.tsx)**

为每一篇文章自动生成带有标题的封面图，极大提升在社交媒体（Twitter, Facebook）分享时的点击率。

```tsx
// 📄 文件路径：app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
 
// 使用 Edge Runtime 加速生成，避免 Serverless 冷启动
export const runtime = 'edge' 
 
export default async function Image({ params }: { params: { slug: string } }) {
  const slug = (await params).slug
  
  // ImageResponse 使用 HTML/CSS 语法来绘制图片，非常直观
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Next.js Course: {slug}
      </div>
    ),
    { width: 1200, height: 600 }
  )
}
```

### 2.4 TypeScript 类型助手 (Route Context Helper)

在 TypeScript 项目中，手动定义动态路由参数 `params` 的类型（如 `Promise<{ id: string }>`）可能有点繁琐。Next.js 提供了一个全局的 `RouteContext` 帮助类型，能自动推断参数类型，极大地提升了开发体验。

**代码示例：**

```ts
// 📄 文件路径：app/api/products/[slug]/route.ts
import { NextRequest, NextResponse, RouteContext } from 'next/server';

// ✅ 使用 RouteContext 自动推断
// 注意：'params' 在 Next.js 15+ 是异步的
export async function GET(
  request: NextRequest, 
  context: RouteContext
) {
  // context.params 是一个 Promise，需要 await
  // 这里的 slug 类型会自动推断为 string
  const { slug } = await context.params;

  return NextResponse.json({ 
    product: slug,
    price: 99.99
  });
}
```

### 2.5 非 JSON 响应 (CSV 导出)

Route Handlers 不仅仅是 JSON API，它能返回任何格式的数据。这使它成为实现文件下载、图片流、PDF 导出等功能的理想选择。

**实战：导出评论数据为 CSV**

```ts
// 📄 文件路径：app/api/reports/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 1. 准备数据
  const csvContent = "ID,Content\n1,Hello\n2,World";
  
  // 2. 返回响应，重点在于设置正确的 Content-Type 和 Content-Disposition
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="report.csv"',
    },
  });
}
```

---

## 三、Edge Runtime vs Node Runtime

Next.js 提供两种运行时环境：

1.  **Node.js Runtime** (默认)：拥有完整的 Node.js API 生态，适合大多数业务逻辑。
2.  **Edge Runtime**：基于 Web Standards，部署在 CDN 边缘节点。

**Edge Runtime 特点**：

*   ✅ **优势**：极低的冷启动延迟，全球分发，响应速度快。
*   ❌ **限制**：不支持所有 Node.js API (如 `fs`)。
*   🎯 **场景**：简单的 JSON 处理、请求转发、地理位置获取。

**示例：获取用户地理位置**

```ts
// 📄 文件路径：app/api/geo/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 切换到 Edge Runtime
export const runtime = 'edge'; 

export async function GET(request: NextRequest) {
  const { geo, ip } = request;
  return NextResponse.json({
    city: geo?.city || 'Unknown',
    country: geo?.country || 'Unknown',
    ip: ip || 'Unknown',
  });
}
```

📚 [官方文档：Edge and Node.js Runtimes](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)

---

## 四、总结与决策指南

| 特性 | Server Actions | Route Handlers |
| :--- | :--- | :--- |
| **主要用途** | 表单提交、数据修改 (Mutations) | Webhooks、对外 API、文件下载 |
| **调用方式** | 像函数一样直接调用 | 通过 URL (`fetch`) 调用 |
| **开发体验** | 零配置，自动类型安全 | 需要手动处理 Request/Response |
| **客户端集成** | `useActionState` / `<form>` | `useEffect` + `fetch` / SWR |

**最佳实践**：

*  如果你的操作是服务于你的 **React 组件**（登录、发帖、点赞） -> **首选 Server Actions**。
*  如果你的操作是服务于 **外部系统** 或 **非 UI 需求** -> **使用 Route Handlers**。
