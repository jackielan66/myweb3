import { ModeToggle } from "@/components/ModeToggle"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">My App</h1>
      <div className="flex items-center gap-4">
        {/* 其他导航项 */}
        <ModeToggle /> {/* <--- 放置在这里 */}
      </div>
    </nav>
  )
}