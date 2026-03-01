import ClientWrapper from './client-wrapper';
import MyServerComp from './server-comp';

export default function BoundaryPage() {
    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Server & Client Component 组合模式</h1>

            <div className="prose mb-8">
                <p>
                    这个页面演示了 <strong>Lift Content Up</strong> 模式：
                    虽然 Client Component 无法直接 import Server Component，
                    但我们可以将 Server Component 作为 props (children) 传递给 Client Component。
                </p>
            </div>

            {/* 
        这里在 Server Component (Page) 中将 MyServerComp 传给 ClientWrapper。
        Next.js 会先在服务端渲染 MyServerComp，然后把生成的 HTML 
        作为 children 传给 ClientWrapper。
      */}
            <ClientWrapper>
                <MyServerComp />
            </ClientWrapper>
        </div>
    );
}
