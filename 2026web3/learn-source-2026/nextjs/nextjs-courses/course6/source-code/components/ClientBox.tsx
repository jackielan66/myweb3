// components/ClientBox.tsx
"use client"
export default function ClientBox({ label }: { label: string }) {
  return <button className="px-3 py-2 border rounded">{label}</button>
}