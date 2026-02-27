# next.js-courses

Next.js 从入门到精通实战课程

## 课程结构概览

- 第一部分：Next.js + React 开发实践
  - 目标：搭建生产级基础，完成端到端交付
  - 范围：掌握 App Router 架构与布局/路由模型；深入 RSC 与 Client 的边界与组合（拆分为两章）；对比 Pages Router 并掌握迁移路径；掌握数据获取与缓存策略、API 路由与 Server Actions 的端到端设计；TypeScript 集成、代码规范与工程化；组件拆分与状态管理；UI 库（shadcn/ui）与 CSS 方案（以 Tailwind 为主）的选型与落地。
  - 产出：架构设计与选型说明（记录路由/布局模型、RSC/Client 边界、数据/渲染策略的选型与权衡）、团队规范与类型系统（包含 TypeScript 配置、编码规范、组件/状态与样式方案的实践清单）、可上线的博客项目。

- 第二部分：前端进阶
  - 目标：优化到生产级，完善质量与运维
  - 范围：掌握 SSR/SSG/ISR/Streaming 渲染策略的选型与实现；Prefetching 行为控制与缓存交互；Core Web Vitals（LCP/INP/CLS）度量、优化与监控；建立测试体系与 CI/CD 流程；基于 next-intl 的国际化方案（Locale 检测、中间件、SEO/hreflang、消息字典管理）；Vercel 部署与生产环境优化；梳理面试重点与实战演练，沉淀迁移与复盘方法。
  - 产出：性能与质量体系文档（包含渲染策略落地、性能度量与优化方案、测试策略与覆盖目标、CI 阈值）、国际化方案与规范（产出最小可运行的中英双语实现）、部署与运维手册、面试与迁移资料、以及一个包含前后端代码、测试与部署配置的**完整可上线项目**。

- 第三部分：框架新特性解析
  - 范围：Turbopack、MCP、缓存组件（Cache Components）、Partial Pre-Rendering（PPR）、路由优化、React 编译器等。
  - 产出：新特性学习笔记与迁移参考、调试与优化清单。


## 课程目录

### 1. Next.js 基本认知和项目初始化

状态: ✅

学时: 1小时

#### 教学内容:

1.  **第一部分：** 了解 Next.js 是什么、为何使用、优缺点、使用场景以及一些核心概念（如 SSR/SSG、App Router）。
2.  **第二部分：** 从零到一初始化一个 Next.js 项目，并体验开发一个 React 组件。
3.  **第三部分：** 了解 Next.js 与 TypeScript 的深度集成，以及全局配置文件中的核心字段及其作用

#### 课程地址: 

[观看课程](https://appibxs98ig9955.h5.xiaoeknow.com/p/course/video/v_69131c0ae4b0694c5b4e0fec?product_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&course_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&sub_course_id=subcourse_35KXhy15aP68E7Btg1am2m5OVPQ)

#### 文档资料: 

#### 课件： 

[课程课件](./course1/readme.md)

#### 学习资料： 

[课程学习资料](./course1/readme.md)

#### 代码示例: 

[course1 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course1/source-code)

### 2. React 组件开发核心知识

状态: ✅

学时: 1小时

#### 教学内容:

- 第一部分：React 核心概念快速回顾
  - JSX 语法与函数式组件
  - Props：让组件可复用
  - State（useState）：组件的内部状态
- 第二部分：Hooks 实战与核心开发模式
  - useState 实战：构建计数器
  - 条件渲染：动态显示内容
  - 列表渲染与 key 属性
- 第三部分：组件生命周期与组合
  - useEffect：处理副作用
  - 组件组合与 children props

#### 课程地址: 

[观看课程](https://appibxs98ig9955.h5.xiaoeknow.com/p/course/video/v_691428f6e4b0694ca1412cc9?product_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&course_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&sub_course_id=subcourse_35KXhy15aP68E7Btg1am2m5OVPQ)

#### 文档资料: 

* 课件： [课程课件](./course2/readme.md)

* 学习资料：  [课程学习资料](./course2/readme.md)

#### 代码示例: 

[course2 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course2/source-code)

### 3. App Router 路由与布局

状态: ✅

学时: 1小时

#### 教学内容:

- 第一部分：App Router 基础与文件约定
  - App Router 是什么
  - 目录即路由（page/layout/loading/error/not-found/template）
  - 路由分组与私有目录（(group) 与 _folder）
  - 目录结构示例
- 第二部分：动态路由与导航
  - 动态路由 `[slug]`
  - 导航：`<Link>` 组件与 `useRouter`
- 第三部分：布局 Layout 与特殊文件
  - 嵌套布局
  - 加载 UI：`loading.tsx`
  - 错误处理：`error.tsx`

#### 课程地址: 

[观看课程](https://appibxs98ig9955.h5.xiaoeknow.com/p/course/video/v_6916e244e4b0694c5b50140c?product_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&course_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&sub_course_id=subcourse_35KXhy15aP68E7Btg1am2m5OVPQ)

#### 文档资料: 

* 课件： [课程课件](./course3/readme.md)

* 学习资料：[课程学习资料](./course3/readme.md)

#### 代码示例: 

[course3 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course3/source-code)

### 4. Pages Router 路由与布局

状态: ✅

学时: 1小时

#### 教学内容:

- 第一部分：Pages Router 基础与目录约定
  - 目录即路由与文件命名
  - 全局布局 `_app.tsx`
  - 自定义文档 `_document.tsx`
  - 错误处理页面（`404.tsx` 与 `_error.tsx`）
  - App Router 与 Pages Router 的共存
- 第二部分：动态路由与导航（实操）
  - 动态路由 `[slug]`
  - 捕获所有与可选路由（`[...slug]` 与 `[[...slug]]`）
  - 导航：`Link` 与 `next/router`
- 第三部分：嵌套布局（getLayout 模式）

#### 课程地址: 

[观看课程](https://appibxs98ig9955.h5.xiaoeknow.com/p/course/video/v_691ed013e4b0694ca146fe33?product_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&course_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&sub_course_id=subcourse_35KXhy15aP68E7Btg1am2m5OVPQ)

#### 文档资料: 

* 课件： [课程课件](./course4/readme.md)

* 学习资料：[课程学习资料](./course4/readme.md)

#### 代码示例: 

[course4 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course4/source-code)

### 5. App Router 布局与页面深入

状态: ✅

学时: 1小时

#### 教学内容:

- 核心理念：组件树的洋葱模型
  - 布局共享、页面独立；`RootLayout -> SegmentLayout -> Page`
- 根布局 `app/layout.tsx`
  - 返回 `<html>` 与 `<body>`；承载全局导航、样式与 Provider
- 嵌套布局与页面 `layout.tsx` & `page.tsx`
  - 目录下可建 `layout.tsx` 作为共享外壳；有 `page.tsx` 才可访问该段
- 特殊文件 `template.tsx`
  - 每次导航重新实例化，适合入场动画与需要重置状态的场景
- 路由分组与共享布局 `(group)`
  - 括号目录不进 URL；用于多页面共享“大外壳”
- 布局中的状态与交互
  - 用 `'use client'` 将布局转为客户端组件以持久状态

#### 课程地址: 

[观看课程](https://appibxs98ig9955.h5.xiaoeknow.com/p/course/video/v_691ed43ae4b0694ca14704a6?product_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&course_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&sub_course_id=subcourse_35KXhy15aP68E7Btg1am2m5OVPQ)

#### 文档资料: 

* 课件： [课程课件](./course5/readme.md)

* 学习资料： [课程学习资料](./course5/readme.md)

#### 代码示例: 

[course5 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course5/source-code)

### 6. 服务器组件（RSC）与组合实践

状态: ✅

学时: 1小时

#### 教学内容:

1. RSC 基础与核心理念
  - RSC 是什么与优势
  - RSC Payload（特殊数据格式）
  - 能力与限制
  - 可序列化边界与常见坑

2. 数据获取与缓存
  - `fetch` 缓存与 `revalidate`
  - 关闭缓存与实时数据
  - 请求头与 Cookie

3. 客户端组件快速对比
  - 客户端组件的适用场景
  - `server-only` 保护仅服务器可用的代码

#### 课程地址: 

[观看课程](https://k22zz.xetslk.com/s/1gSatI)

#### 文档资料: 

* 课件： [课程课件](./course6/readme.md)

* 学习资料： [课程学习资料](./course6/readme.md)

#### 代码示例: 

[course6 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course6/source-code)

### 7. 客户端组件实践

状态: ✅

学时: 1小时

#### 教学内容:

 - 客户端组件是什么与边界
 - 交互与第三方库集成
 - 用 `client-only` 标记仅客户端模块
 - 从客户端调用服务器函数（Server Function）

#### 课程地址: 

[观看课程](https://k22zz.xetslk.com/s/bpz3X)

#### 文档资料: 

* 课件： [课程课件](./course7/readme.md)

* 学习资料： [课程学习资料](./course7/readme.md)

#### 代码示例: 

[course7 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course7/source-code)

### 8. 客户端组件状态管理

状态: ✅

学时: 1小时

#### 教学内容:

- Part 1: URL 作为状态源（核心必考题）
  - 1.1 为什么不用 useState？
  - 1.2 实战：URL 驱动的搜索栏
  - 1.3 服务端如何响应？
- Part 2: 局部状态与组合模式
  - 2.1 错误示范：一锅炖
  - 2.2 正确示范：状态下沉（State Colocation）
- Part 3: 全局状态 Context 与 Zustand
  - 3.1 选型指南
  - 3.2 Context 实战：主题切换
  - 3.3 Zustand 实战：购物车
- Part 4: 表单状态管理

#### 课程地址: 

[观看课程](https://appibxs98ig9955.h5.xiaoeknow.com/p/course/video/v_692fdacee4b0694c5b5be761?product_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&course_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&sub_course_id=subcourse_35KXhy15aP68E7Btg1am2m5OVPQ)

#### 文档资料: 

* 课件： [课程课件](./course8/readme.md)

* 学习资料： [课程学习资料](./course8/readme.md)

#### 代码示例: 

[course8 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course8/source-code)

### 9. Next.js 与 Tailwind CSS 样式方案实战

状态: ✅

学时: 1小时

#### 教学内容:

- 1. 为什么 Next.js 官方首推 Tailwind？
- 2. 核心概念与工作流
  - 2.1 快速上手
  - 2.2 这不就是内联样式吗？
  - 2.3 完整实战：商品卡片
- 3. 响应式与暗黑模式
  - 3.1 移动端优先 (Mobile First)
  - 3.2 暗黑模式 (Dark Mode)
- 4. 定制与配置 (v4 CSS-first)
  - 4.1 结合 CSS 变量 (最佳实践)
- 5. 最佳实践与架构
  - 5.1 避免“类名爆炸”
  - 5.2 警惕动态类名陷阱
  - 5.3 解决样式冲突：cn() 神器

#### 课程地址: 

[观看课程](TODO)

#### 文档资料: 

* 课件： [课程课件](./course9/readme.md)

* 学习资料：

 [课程学习资料](./course9/readme.md)
 [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)

#### 代码示例: 

[course9 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course9/source-code)

### 10. Next.js 实战：现代化 UI组件库 - 深入掌握 shadcn/ui

状态: ✅

学时: 1小时

#### 教学内容:

- 1. 核心理念：为什么是 shadcn/ui?
  - 1.1 它不是一个库
  - 1.2 代码所有权 (Code Ownership)
  - 1.3 Headless UI 与 Tailwind CSS 的完美结合
- 2. 初始化与配置
  - 2.1 初始化 CLI
  - 2.2 配置选项详解
  - 2.3 核心文件解析：`lib/utils.ts`
  - 2.4 配置文件解析：`components.json`
- 3. 基础组件：Button 与 Card
  - 3.1 安装与使用 Button
  - 3.2 源码级定制 (Highlight)
  - 3.3 组合模式：Card 组件
- 4. 进阶实战：表单 Form
  - 4.1 安装依赖
  - 4.2 定义 Schema 与初始化 Form
  - 4.3 提交处理与反馈 (Sonner)
  - 4.4 核心优势总结
- 5. 主题与暗黑模式
  - 5.1 安装与配置
  - 5.2 添加切换按钮
  - 5.3 核心原理解析

#### 课程地址: 

[观看课程](TODO)

#### 文档资料: 

* 课件： [课程课件](./course10/readme.md)

* 学习资料： [课程学习资料](./course10/readme.md)

#### 代码示例: 

[course10 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course10/source-code)

### 11. 深入理解 Next.js 16 渲染机制（SSR/SSG/ISR）与数据获取

状态: ✅

学时: 1小时

#### 教学内容:

- 1. 核心思维转变：数据获取决定渲染模式
- 2. Next.js 的四层缓存体系
  - 2.1 Request Memoization（请求记忆）
  - 2.2 Data Cache（数据缓存）
  - 2.3 Full Route Cache（全路由缓存）
  - 2.4 Router Cache（路由器缓存）
- 3. 默认的静态站点生成 (SSG) 与 动态参数生成
  - 3.1 默认静态渲染
  - 3.2 使用 `generateStaticParams` 预生成静态页面
- 4. 增量静态再生 (ISR)
  - 4.1 基于时间的 ISR (Time-based)
  - 4.2 按需 ISR (On-demand Revalidation)
- 5. 动态渲染 (SSR) 与 动态函数陷阱
  - 5.1 强制动态渲染 (no-store)
  - 5.2 动态函数 (Dynamic Functions)
- 6. Next.js 16 核心特性 —— use cache 与 Streaming
  - 6.1 配置与使用 `use cache`
  - 6.2 结合 Suspense 实现流式渲染
  - 6.3 并行数据获取 (Parallel Data Fetching)
- 7. 总结与决策指南

#### 课程地址: 

[观看课程](TODO)

#### 文档资料: 

* 课件： [课程课件](./course11/readme.md)

* 学习资料： 

[课程学习资料](./course11/readme.md)

[next.js 16 渲染机制](https://nextjs.org/docs/app/building-your-application/rendering)
[next.js 16 数据获取](https://nextjs.org/docs/app/building-your-application/data-fetching)
[next.js 16 缓存机制](https://nextjs.org/docs/app/building-your-application/caching)

#### 代码示例: 

[course11 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course11/source-code)

### 12. Next.js 全栈数据交互实战：Server Actions 与 Route Handlers

状态: ✅

学时: 1小时

#### 教学内容:

- 1. Server Actions：让前后端零距离
  - 1.1 定义 Server Action
  - 1.2 实战：构建原生评论表单 (Native Form)
- 2. Route Handlers：何时还需要 API？
  - 2.1 标准 REST API 与动态路由
  - 2.2 缓存控制 (Caching)
  - 2.3 特殊路由处理程序 (Special Route Handlers)
  - 2.4 TypeScript 类型助手 (Route Context Helper)
  - 2.5 非 JSON 响应 (CSV 导出)
- 3. Edge Runtime vs Node Runtime
- 4. 总结与决策指南

#### 课程地址: 

[观看课程](TODO)

#### 文档资料: 

* 课件： [课程课件](./course12/readme.md)

* 学习资料： [课程学习资料](./course12/readme.md)

#### 代码示例: 

[course12 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course12/source-code)

### 13. Next.js 自动化测试和质量保障体系搭建

状态: ✅

学时: 1小时

#### 教学内容:

- 0. 测试金字塔与核心理念
- 1. 单元测试：组件的微观验证 (Jest + React Testing Library)
  - 1.1 环境搭建
  - 1.2 实战：测试交互型客户端组件
- 2. 端到端测试：真实用户流程 (Playwright)
  - 2.1 环境安装与 Codegen 录制
  - 2.2 深入理解：手动编写 E2E 测试脚本
- 3. UI 视觉回归测试 (Visual Regression)
  - 3.1 实现视觉测试
  - 3.2 常见操作流程
- 4. CI/CD 自动化集成 (GitHub Actions)
  - 4.1 配置文件详解
- 5. 总结与最佳实践

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： [课程课件](./course13/readme.md)

* 学习资料： [课程学习资料](./course13/readme.md)

#### 代码示例: 

[course13 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course13/source-code)


### 14. Next.js 国际化多语言方案（i18n）

状态: ✅

学时: 1小时

#### 教学内容:

- 0. 核心理念：i18n 到底在解决什么
- 1. 安装与基础配置（让项目先跑起来）
  - 1.1 安装依赖
  - 1.2 准备翻译文件（messages）
  - 1.3 配置 next-intl 插件（Next.js 配置文件）
  - 1.4 可选：Next.js 的 i18n 配置（了解即可）
- 2. 路由设计：让 URL 带上语言前缀
  - 2.1 推荐目录结构（最小可运行）
  - 2.2 统一路由配置：`i18n/routing.ts`
  - 2.3 请求侧配置：`i18n/request.ts`
  - 2.4 中间件：访问 `/` 自动跳转到默认语言
- 3. 在 Layout 注入 Provider（让客户端组件也能翻译）
- 4. 翻译的两种姿势：服务端与客户端
  - 4.1 服务端页面翻译（RSC：更利于 SEO）
  - 4.2 客户端组件翻译：`useTranslations`
- 5. SEO：`hreflang` 与多语言 sitemap（最小实现）
  - 5.1 `hreflang` 是什么，为什么需要它
  - 5.2 多语言 sitemap（最小实现）
- 6. 性能：翻译文件变大后，怎么避免“越做越慢”
  - 6.1 工具函数：按命名空间挑选 messages
  - 6.2 根布局：只注入全局共享命名空间
  - 6.3 页面级 Provider：只为当前页面注入 `HomePage`
  - 6.4 官方延伸阅读（性能与最佳实践）
- 7. 开发效率：IDE i18n 插件建议
- 8. 附录：本地跑通清单与常见问题排查

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： [课程课件](./course14/readme.md)

* 学习资料： [课程学习资料](./course14/readme.md)

#### 代码示例: 

[course14 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course14/source-code)
