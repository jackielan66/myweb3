# next.js-courses

Next.js 从入门到精通实战课程

## 课程结构概览

本课程共 20 节，分为五大模块，从零基础到生产部署全覆盖：

- **第一部分：基础入门**（第 1-5 节）
  - 内容：Next.js 核心概念与项目初始化、React 组件开发基础、App Router 与 Pages Router 路由系统、布局与页面深入实践
  - 目标：掌握 Next.js 项目搭建、路由配置与布局设计，理解文件即路由的核心理念

- **第二部分：组件与样式**（第 6-10 节）
  - 内容：Server Components（RSC）与 Client Components 的边界与组合、客户端状态管理（Context/Zustand）、Tailwind CSS 样式方案、shadcn/ui 组件库实战
  - 目标：深入理解 RSC 架构，掌握组件拆分原则与状态管理，落地现代化 UI 方案

- **第三部分：数据与渲染**（第 11-12 节）
  - 内容：SSR/SSG/ISR/Streaming 渲染机制与数据获取策略、Server Actions 与 Route Handlers 全栈数据交互
  - 目标：掌握各渲染模式的选型与实现，实现端到端的数据流设计

- **第四部分：工程化与生产部署**（第 13-16 节）
  - 内容：自动化测试与质量保障体系、next-intl 国际化方案、Core Web Vitals（LCP/INP/CLS）性能优化、Vercel 部署与生产环境优化
  - 目标：建立完整的测试体系与 CI/CD 流程，掌握性能度量与优化方法，完成生产级部署

- **第五部分：进阶、原理与新特性**（第 17-20 节）
  - 内容：Next.js 核心原理与面试通关指南、App Router 与 Pages Router 对比及迁移实战、构建体系 (Webpack/Turbopack) 深度解析、Next.js 16 全新特性实战
  - 目标：深入理解框架底层原理与构建机制，掌握面试重点与迁移能力，率先上手 Next.js 16 前沿技术

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

[观看课程](https://appibxs98ig9955.h5.xet.citv.cn/p/course/video/v_69410fc3e4b0694c5b63cb1a?product_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&course_id=course_2xArq45EVWERVb4oHPYEmCLzHG5&sub_course_id=subcourse_35KXhy15aP68E7Btg1am2m5OVPQ)

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


### 15. Next.js 性能优化实战（LCP/INP/CLS）

状态: ✅

学时: 1小时

#### 教学内容:

- 0. 核心理念：Web Vitals 与性能监控
  - 0.1 核心指标：LCP, INP, CLS
  - 0.2 常用工具：DevTools, Lighthouse, WebPageTest
  - 0.3 对照实验设计：Baseline vs Optimized
- 1. LCP 与 CLS 优化：让首屏更快更稳
  - 1.1 字体优化 (`next/font`)：消除 FOIT 与 CLS
  - 1.2 图片优化 (`next/image`)：格式、尺寸与 Priority
- 2. 代码分割：让“重的东西”晚点来
  - 2.1 Bundle Splitting 原理
  - 2.2 实战：`next/dynamic` 实现按需加载
- 3. INP 优化：让交互不卡顿
  - 3.1 识别长任务与主线程阻塞
  - 3.2 实战：React `useTransition` 并发模式
- 4. 持续监控：防止性能回归
  - 4.1 本地对比 (Lighthouse)
  - 4.2 远程复测 (WebPageTest)
  - 4.3 线上监控 (Web Vitals Reporter)

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： [课程课件](./course15/readme.md)

* 学习资料： [课程学习资料](./course15/readme.md)

#### 代码示例: 

[course15 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course15/source-code)


### 16. Next.js Vercel 部署与生产环境优化

状态: ✅

学时: 1小时

#### 教学内容:

- 1. 前言：为什么 Vercel 是前端部署的终极方案
- 2. 零配置部署实战
- 3. 环境变量的三种使用场景
- 4. 生产环境配置：自定义域名与 HTTPS
- 5. 团队协作流：Preview Deployments
- 6. 生产环境救火：Instant Rollback
- 7. 监控与成本优化

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： [课程课件](./course16/readme.md)

* 学习资料： [课程学习资料](./course16/readme.md)

#### 代码示例: 

[course16 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course16/source-code)


### 17. Next.js 核心原理和面试通关指南

状态: ✅

学时: 1小时

#### 教学内容:

- 1. 渲染模式全解析：SSR、SSG 与 ISR
- 2. 用户体验与流式渲染：Streaming & Suspense
- 3. 路由与架构：App Router 深度解析
- 4. 难点攻克：Server Component vs Client Component
- 5. Server Actions 安全陷阱
- 6. Middleware：请求层面的守门员
- 7. 常见报错：Hydration Mismatch
- 8. 错误处理与边界情况
- 9. 性能优化：Core Web Vitals 实战
- 10. 行业应用特别篇：为什么 Web3 公司最爱 Next.js
- 11. 高频面试题快问快答

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： 

  - [课程课件](./course17/readme.md)

* 学习资料： 

  - [演示文稿 (PDF)](./course17/docs/Next.js%2016.x%20面试通关与核心原理.pdf) 
  - [思维导图](./course17/docs/Next.js%20核心原理与面试通关指南_脑图.png)

#### 代码示例: 

[course17 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course17/source-code)


### 18. Next.js 进阶指南：App Router 与 Pages Router 对比及迁移实战

状态: ✅

学时: 1小时

#### 教学内容:

- 1. 为什么会有两套路由？Pages Router vs App Router
- 2. 核心差异对比：目录结构、服务端/客户端组件、数据获取
- 3. 迁移实战：关键点全覆盖
  - 3.1 全局入口迁移：从 _app/_document 到 Root Layout
  - 3.2 路由钩子迁移：useRouter 拆分为多个 Hooks
  - 3.3 SEO 迁移：从 Head 组件到 Metadata API
  - 3.4 错误处理与加载状态：loading.tsx / error.tsx
  - 3.5 定时更新 (ISR) 的迁移
  - 3.6 Link 组件：页面导航
  - 3.7 API Routes：接口写法对比
  - 3.8 样式与字体的迁移
- 4. 常见报错速查表（初学者必看）
- 5. 迁移策略：如何平滑过渡？
- 6. 迁移检查清单
- 7. 新项目该选哪个？
- 8. 总结：思维转变
- 9. 动手实践：演示项目

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： 

  - [课程课件](./course18/readme.md)

* 学习资料： 

  - [演示文稿 (PDF)](./course18/docs/Nextjs_App_Router_Pages_Router_深度对比.pdf) 
  - [思维导图](./course18/docs/Next.js%20进阶指南：App%20Router%20vs%20Pages%20Router%20对比与迁移实战.png)

#### 代码示例: 

[course18 source](https://github.com/MetaNodeAcademy/nextjs-courses/tree/main/course18/source-code)


### 19. Next.js 内部构建体系与分层逻辑解析 (Webpack / Turbopack)

状态: ✅

学时: 1小时

#### 教学内容:

- 1. 核心架构：多重宇宙（Parallel Compilers）
  - 1.1 分层逻辑图解
  - 1.2 三大编译器层级 (Server, Client, Edge)
- 2. 边界处理与清单文件 (Manifests)
  - 2.1 模块解析过程
  - 2.2 关键 Manifest 文件
- 3. 深入解析：三大 Layer 环境的异同
  - 3.1 环境隔离与“泄漏”防范
  - 3.2 核心误区：Client Component 的“双重渲染”与 `use client`
  - 3.3 实战陷阱：Hydration Mismatch (水合不匹配)
- 4. Webpack vs. Turbopack：架构差异
- 5. 总结：一个请求的构建之旅

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： 

  - [课程课件](./course19/readme.md)

* 学习资料： 

  - [演示文稿 (PDF)](./course19/docs/Nextjs_内部构建架构内幕揭秘.pdf)
  - [思维导图](./course19/docs/Next.js%20内部构建体系与分层逻辑解析.png)

#### 代码示例: 

[course19 source]()


### 20. Next.js 16 新特性深度解析

状态: ✅

学时: 1小时

#### 教学内容:

- 1. Turbopack 默认启用：速度的飞跃
  - 启动更快、更新即时、生产构建加速
- 2. MCP 集成：AI 驱动的调试助手
  - 智能诊断、快速定位
- 3. 缓存组件 (Cache Components) 与 `use cache`
  - 什么是 `use cache`？
  - 配合 PPR (Partial Pre-Rendering)
- 4. 路由与导航优化
  - 布局去重 (Layout Deduplication)
  - 增量预取 (Incremental Prefetching)
- 5. API 进化：`proxy.ts` 与更清晰的工具链
- 6. 开发者体验 (DX) 强化
  - React Compiler 集成 (自动 Memoization)
  - TypeScript 与 Sass 增强

#### 课程地址: 

[观看课程]()

#### 文档资料: 

* 课件： 

  - [课程课件](./course20/readme.md)

* 学习资料： 

  - [演示文稿 (PDF)](./course20/docs/Next.js_16_新特性深度解析.pdf)
  - [思维导图](./course20/docs/Next.js_16_新特性深度解析.png)

#### 代码示例: 

[course20 source]()
