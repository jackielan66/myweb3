// components/ThirdPartyClient.tsx
"use client"
import Script from 'next/script'

export default function ThirdPartyClient() {
  return (
    <div>
      <Script src="https://example.com/sdk.js" strategy="lazyOnload" />
      <div id="widget" />
    </div>
  )
}