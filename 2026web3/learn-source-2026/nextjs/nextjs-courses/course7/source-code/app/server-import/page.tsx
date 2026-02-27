// app/(demo)/server-import/page.tsx（服务器组件，误用示例）
import { showNotice } from '@/lib/client-widget'

export default function ServerImportDemo() {

    // 下面这行如果取消注释，会在构建时报错，因为被导入的模块声明了 client-only
    // showNotice('服务器组件中触发客户端提示')

    return <div className="p-8">服务器页面（不要在此导入仅客户端模块）</div>
}