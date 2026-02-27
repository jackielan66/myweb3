'use client'

import { Button } from "@/components/ui/button"
import { Mail, Trash2 } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="space-x-4">
      {/* 基础按钮 */}
      <Button>Click me</Button>
      
      {/* 带图标的按钮 - 使用 variant 属性 */}
      <Button variant="secondary">
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </Button>
      
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  )
}