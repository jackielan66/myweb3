// components/ClientPing.tsx
"use client"
import { useState } from 'react'
 
 export default function ClientPing() {
   const [on, setOn] = useState(false)
   return (
     <button className="px-3 py-2 border rounded" onClick={() => setOn(!on)}>
       {on ? '已开启' : '已关闭'}
     </button>
  )
}