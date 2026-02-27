// pages/_error.tsx
import React from "react"

export default function ErrorPage({ statusCode }: any) {
  return <div className="p-8">发生错误，状态码：{statusCode || '未知'}</div>
}