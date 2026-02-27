import * as React from "react"

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={`py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
